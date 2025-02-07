package com.very.anshul.cytroid;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ServiceInfo;
import android.media.AudioAttributes;
import android.media.AudioDeviceInfo;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.AudioTrack;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Environment;
import android.os.IBinder;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import android.bluetooth.*;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.Socket;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class CycleService extends Service {

    static String token = "49n5pEsOUDF25rBhUFmN";
    String address = "88:13:BF:0B:CB:3E";
    String speakerAddr = "88:13:bf:0b:94:6e";
    String serverIP = "";
    int localPort = 8248;

    double lat = 0;
    double longt = 0;
    char lat_dir = 0;
    char longt_dir = 0;

    AudioManager audioManager;
    BluetoothManager manager;
    NotificationManager notificationManager;

    BluetoothAdapter adapter;
    BluetoothGatt gattClient = null;

    AudioDeviceInfo bluetoothAudio = null;
    AudioRecord audioRecord = null;
    AudioTrack audioTrack = null;
    int audioSessionId = 0;
    boolean muted = false;
    boolean joined = false;

    VoIPWebSocket vows = null;

    ArrayList<Integer> rssiRecord = new ArrayList<Integer>();

    boolean locked = true;
    LocalDateTime lockTime = null;

    Socket gpsSocket = null;
    String gpsIP = "10.145.112.237";
    boolean startGPS = true;
    GPSTask gpsTask = null;

    String[] cycleLocation = new String[] {"22.32182833", "N", "87.298741166", "E"};

    boolean callState = false;
    boolean auth = false;

    LinkedList<String> sendQueue = new LinkedList<>();

    public class VoStreamTask implements Runnable {

        DatagramSocket udpSocket = null;

        public VoStreamTask() {
        }

        @Override
        public void run() {
            while(true) {
                if(!joined) continue;
                audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                bluetoothAudio = null;
                for (AudioDeviceInfo audioDevice : audioManager.getAvailableCommunicationDevices()) {
                    if (audioDevice.getType() == AudioDeviceInfo.TYPE_BLUETOOTH_SCO) {
                        bluetoothAudio = audioDevice;
                        break;
                    }
                }
                if (bluetoothAudio != null)
                    audioManager.setCommunicationDevice(bluetoothAudio);

                try {
                    udpSocket = new DatagramSocket(localPort);
                } catch (SocketException e) {
                    continue;
                }
                try {
                    audioRecord = new AudioRecord(
                            MediaRecorder.AudioSource.VOICE_COMMUNICATION,
                            16000,
                            AudioFormat.CHANNEL_IN_MONO,
                            AudioFormat.ENCODING_PCM_16BIT,
                            AudioRecord.getMinBufferSize(16000, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT)
                    );
                    audioSessionId = audioManager.generateAudioSessionId();
                    audioTrack = new AudioTrack(
                        new AudioAttributes.Builder()
                                .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
                                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                                .build(),
                        new AudioFormat.Builder()
                                .setSampleRate(16000)
                                .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                                .setChannelIndexMask(1)
                                .build(),
                        AudioTrack.getMinBufferSize(1600, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT),
                        AudioTrack.MODE_STREAM,
                        audioSessionId
                    );
                    byte[] audioBuf;
                    while (joined) {
                        if(muted) continue;
                        audioBuf = new byte[512];
                        int byteRead = audioRecord.read(audioBuf, 0, 512);
                        DatagramPacket packet = new DatagramPacket(audioBuf, byteRead, InetAddress.getByName(serverIP), 3500);
                        udpSocket.send(packet);
                    }
                } catch (SecurityException e) {

                } catch (IOException e) {

                }
            }
        }
    }

    public class GPSTask implements Runnable {

        Pattern latPat = Pattern.compile("(\\d+)(\\d{2}\\.\\d+)");

        public GPSTask() {
        }

        public double getRealCoords(String nmeaFormat) {
            Matcher matcher = latPat.matcher(nmeaFormat);
            return Double.parseDouble(matcher.group(1)) + Double.parseDouble(matcher.group(2)) / 60;
        }

        public void processCommand(String cmd) {
            if(cmd.equals("$alert")) {
                Log.w("ALERT", "cycle alert");
                Intent mapIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("google.navigation:q="+(cycleLocation[1] == "S" ? "-" : "") + cycleLocation[0] + "," + (cycleLocation[3] == "W" ? "-" : "") + cycleLocation[2] + "&mode=l"));
                mapIntent.setPackage("com.google.android.apps.maps");
                PendingIntent pendingIntent = PendingIntent.getActivity(CycleService.this, 0, mapIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

                Notification notification = new NotificationCompat.Builder(CycleService.this, "cycle_alarm")
                        .setContentTitle("Cycle Theft Alert")
                        .setShowWhen(true)
                        .setSmallIcon(R.drawable.ic_launcher_background)
                        .setContentIntent(pendingIntent)
                        .setContentText("Alert: Unusual movements of cycle have been detected in your absence. This could be a possible tampering attempt!")
                        .build();
                notificationManager.notify(66, notification);
                Uri ringtoneUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
                Ringtone ringtone = RingtoneManager.getRingtone(CycleService.this, ringtoneUri);
                ringtone.setVolume(1.0f);
                ringtone.play();
            } else {
                String[] parts = cmd.split(",");
                if (parts[0].equals("$GPGGA")) {
                    String lat = parts[2];
                    String lat_dir = parts[3];
                    String logt = parts[4];
                    String logt_dir = parts[5];
                    cycleLocation = new String[]{String.valueOf(getRealCoords(lat)), lat_dir, String.valueOf(getRealCoords(logt)), logt_dir};
                    Intent intent = new Intent("cycle_location");
                    intent.putExtra("location", cycleLocation);
                    sendBroadcast(intent);
                };
            };
        }

        public void disconnect() {

        }

        @Override
        public void run() {
            try {
                while(true) {
                    if(locked && startGPS) {
                        try {
                            gpsSocket = new Socket(gpsIP, 3000);
                            InputStream inputStream = gpsSocket.getInputStream();
                            Log.i("socket", "started");
                            String cmd = "";
                            gpsSocket.getOutputStream().write("auth 1234".getBytes());
                            gpsSocket.getOutputStream().flush();
                            while (gpsSocket != null && gpsSocket.isConnected() && locked && startGPS) {
                                byte[] b = new byte[1];
                                while (locked && startGPS && inputStream.readNBytes(b, 0, 1) == 1) {
                                    if (b[0] == '\n') {
                                        processCommand(cmd);
                                        cmd = "";
                                    } else
                                        cmd += new String(b, StandardCharsets.US_ASCII);
                                }
                            }
                            if (gpsSocket != null) gpsSocket.close();
                        } catch (IOException e) {
                        }
                    } else {
                        try {
                            if (gpsSocket != null) gpsSocket.close();
                        } catch (Exception e) {};
                        Thread.sleep(2000);
                    }
                }
            } catch (InterruptedException e) {

            }
        }
    }

    public class StreamTest implements Runnable {

        DatagramSocket udpSocket = null;

        public StreamTest() {
        }

        @Override
        public void run() {
            try {
                udpSocket = new DatagramSocket(8888);
                audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                audioRecord = new AudioRecord(
                        MediaRecorder.AudioSource.VOICE_COMMUNICATION,
                        44100,
                        AudioFormat.CHANNEL_IN_MONO,
                        AudioFormat.ENCODING_PCM_16BIT,
                        AudioRecord.getMinBufferSize(44100, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT)
                );
                audioRecord.startRecording();
                byte[] audioBuf;
                while (true) {
                    audioBuf = new byte[1024];
                    int byteRead = audioRecord.read(audioBuf, 0, 1024);
                    DatagramPacket packet = new DatagramPacket(audioBuf, byteRead, InetAddress.getByName("10.145.2.222"), 3001);
                    udpSocket.send(packet);
                }
            } catch (IOException e) {
                Log.e("IOError", String.valueOf(e));
            } catch (SecurityException e) {

            }
        }
    }

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(Objects.equals(intent.getAction(), BluetoothAdapter.ACTION_STATE_CHANGED)) {
                if(adapter.isEnabled()) {
                    connectCycle();
                } else if(gattClient != null) {
                    gattClient.close();
                    gattClient = null;
                    locked = true;
                    auth = false;
                    onCycleLock();
                }
            } else if (Objects.equals(intent.getAction(), "haptic_navigation")) {
                try {
                    if (gattClient != null && manager.getConnectionState(gattClient.getDevice(), BluetoothProfile.GATT) == BluetoothProfile.STATE_CONNECTED) {
                        queueSend(token + " " + intent.getStringExtra("direction"));
                    }
                } catch (SecurityException e) {

                }
            } else if (Objects.equals(intent.getAction(), "call_state")) {
                callState = intent.getBooleanExtra("call", false);
            };
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        return null;
    }

    public void sendMediaControl(String action) {
        Intent intent = new Intent();
        intent.setAction(action);
        sendBroadcast(intent);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        manager = getSystemService(BluetoothManager.class);
        adapter = manager.getAdapter();
        audioManager = getSystemService(AudioManager.class);
        notificationManager = getSystemService(NotificationManager.class);
        gpsTask = new GPSTask();
        vows = new VoIPWebSocket("ws://" + serverIP + ":3500/bolt", localPort, "89", new VoIPWebSocket.Callback() {
            @Override
            public void onFriendOnline(String[] userID) {

            }

            @Override
            public void onFriendOffline(String[] userID) {

            }

            @Override
            public void onFriendJoin(String userID) {

            }

            @Override
            public void onFriendLeave(String userID) {

            }
        });

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BluetoothAdapter.ACTION_STATE_CHANGED);
        intentFilter.addAction("media_rsp");
        intentFilter.addAction("haptic_navigation");
        intentFilter.addAction("map_update");

        registerReceiver(broadcastReceiver, intentFilter, Context.RECEIVER_EXPORTED);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(broadcastReceiver);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Notification notification = new NotificationCompat.Builder(this, "cycle_service")
                .setOngoing(true)
                .setContentTitle("Cycle Service")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentInfo("Your cycle is being monitored, you can relax.")
                .build();
        startForeground(4, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE);
        startService(new Intent(this, NotificationProcessor.class));
        //startService(new Intent(this, CallService.class));
        if(adapter.isEnabled()) connectCycle();
        (new Thread(gpsTask)).start();
        return START_STICKY;
    }

    public void queueSend(String cmd) {
        sendQueue.add(cmd);
    }

    public void onCycleUnlock() {
        startGPS = false;
        setCycleAudioRouting();
        vows.sendMessage("{\"type\":1, \"action\":1}");
    };

    public void onCycleLock() {
        startGPS = true;
        vows.sendMessage("{\"type\":1, \"action\":0}");
    };

    public void setCycleAudioRouting() {
        bluetoothAudio = null;
        for(AudioDeviceInfo audioDevice : audioManager.getDevices(0)) {
            if(audioDevice.getType() == AudioDeviceInfo.TYPE_BLUETOOTH_A2DP) {
                bluetoothAudio = audioDevice;
            }
        }
        if(bluetoothAudio == null) {
            try {
                BluetoothDevice speaker = adapter.getRemoteDevice(speakerAddr);
            } catch (SecurityException e) {

            } catch (Exception e) {}
        }
    }

    BluetoothGattCharacteristic getMainCharacteristic() {
        return gattClient.getServices().get(2).getCharacteristics().get(0);
    }

    public void joinVOIP() {
        vows.sendMessage("{\"type\":2, \"action\":1}");
        joined = true;
    }

    public void leaveVOIP() {
        joined = false;
        vows.sendMessage("{\"type\":2, \"action\":0}");
    }

    public void connectCycle() {
        BluetoothDevice device = adapter.getRemoteDevice(address);

        try {
            gattClient = device.connectGatt(this, false, new BluetoothGattCallback() {
                @Override
                public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
                    if(newState == 2) {
                        gatt.requestMtu(200);
                    } else {
                        locked = true;
                        auth = false;
                        if(adapter.isEnabled()) gatt.connect();
                    }
                }

                @Override
                public void onMtuChanged(BluetoothGatt gatt, int mtu, int status) {
                    gatt.discoverServices();
                }

                @Override
                public void onServicesDiscovered(BluetoothGatt gatt, int status) {
                    gatt.setCharacteristicNotification(getMainCharacteristic(), true);
                    gatt.writeDescriptor(getMainCharacteristic().getDescriptors().get(0), BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
                }

                @Override
                public void onDescriptorWrite(BluetoothGatt gatt, BluetoothGattDescriptor descriptor, int status) {
                    super.onDescriptorWrite(gatt, descriptor, status);
                    gatt.writeCharacteristic(getMainCharacteristic(), ("auth " + token).getBytes(), BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                }

                @Override
                public void onCharacteristicChanged(@NonNull BluetoothGatt gatt, @NonNull BluetoothGattCharacteristic characteristic, @NonNull byte[] value) {
                    StringBuilder builder = new StringBuilder();
                    for(byte ch: value) builder.append(ch);

                    String cmd = builder.toString();

                    if(cmd.equals(".play")) {
                        sendMediaControl("PLAY_PAUSE");
                    } else if (cmd.equals(".next")) {
                        sendMediaControl("TRACK_NEXT");
                    } else if (cmd.equals(".prev")) {
                        sendMediaControl("TRACK_PREV");
                    } else if (cmd.equals(".join")) {
                        joinVOIP();
                    } else if (cmd.equals(".leave")) {
                    }
                }

                @Override
                public void onCharacteristicWrite(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, int status) {
                    if(!auth) {
                        auth = true;
                    }
                    gatt.readRemoteRssi();
                }

                @Override
                public void onReadRemoteRssi(BluetoothGatt gatt, int rssi, int status) {
                    if(!auth) return;
                    if(rssiRecord.size() < 10) {
                        rssiRecord.add(rssi);
                    } else {
                        if (rssiRecord.stream().reduce(0, Integer::sum) / 10 < -85) {
                            if(!locked) {
                                locked = true;
                                gattClient.writeCharacteristic(getMainCharacteristic(), (token + " lock").getBytes(), BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                                lockTime = LocalDateTime.now();
                                onCycleLock();
                            }
                        } else {
                            if (locked) {
                                if (!(lockTime != null && lockTime.until(LocalDateTime.now(), ChronoUnit.SECONDS) < 4)) {
                                    queueSend(token + " unlock");
                                    locked = false;
                                    onCycleUnlock();
                                };
                            };
                        }
                        rssiRecord.clear();
                    };
                    if(!sendQueue.isEmpty()) {
                        gatt.writeCharacteristic(getMainCharacteristic(), sendQueue.pop().getBytes(), BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                    } else
                        gatt.readRemoteRssi();
                }
            });
        } catch (SecurityException e) {
        }
    }

    public class TestRecorder extends Thread {
        public TestRecorder() {

        }

        public void run() {
            audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
            bluetoothAudio = null;
            for(AudioDeviceInfo audioDevice : audioManager.getAvailableCommunicationDevices()) {
                if(audioDevice.getType() == AudioDeviceInfo.TYPE_BLUETOOTH_SCO) {
                    bluetoothAudio = audioDevice;
                    break;
                }
            }
            if(bluetoothAudio != null)
                audioManager.setCommunicationDevice(bluetoothAudio);

            try {
                audioRecord = new AudioRecord(
                        MediaRecorder.AudioSource.VOICE_COMMUNICATION,
                        44100,
                        AudioFormat.CHANNEL_IN_MONO,
                        AudioFormat.ENCODING_PCM_16BIT,
                        AudioRecord.getMinBufferSize(44100, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT)
                );
                ArrayList<Byte> buffer = new ArrayList<>();

                LocalDateTime start = LocalDateTime.now();
                audioRecord.startRecording();

                int totalRead = 0;

                while (start.until(LocalDateTime.now(), ChronoUnit.SECONDS) < 10) {
                    byte[] audioBuf = new byte[512];
                    int byteRead = audioRecord.read(audioBuf, 0, 512);
                    _addByte(buffer, audioBuf, byteRead);
                    totalRead += byteRead;
                };
                audioRecord.stop();
                audioRecord.release();

                ArrayList<Byte> header = _waveHeader(totalRead, 1, 44100);
                header.addAll(buffer);

                File internalPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC);
                File path = new File(internalPath, "test.wav");

                FileOutputStream file = new FileOutputStream(path);

                int written = 0;

                while (written < header.size()) {
                    byte[] b = new byte[] {(byte)header.get(written++)};
                    file.write(b, 0, 1);
                };

                file.close();
                //Toast.makeText(CycleService.this, "Recorded", Toast.LENGTH_LONG).show();
            } catch (SecurityException e) {

            } catch (IOException e) {
                Log.e("IOError", String.valueOf(e));
            }
        }
    }

    public ArrayList<Byte> _waveHeader(Integer dataLen, Integer dChannels, Integer sampleRate) {
        ArrayList<Byte> header = new ArrayList<>();
        _addByte(header, "RIFF".getBytes());
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(dataLen + 36).array());
        _addByte(header, "WAVEfmt ".getBytes());
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(16).array(), 4);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(1).array(), 2);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(dChannels).array(), 2);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(sampleRate).array(), 4);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(2 * dChannels * sampleRate).array(), 4);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(2 * dChannels).array(), 2);
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(16).array(), 2);
        _addByte(header, "data".getBytes());
        _addByte(header, ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(dataLen).array(), 4);
        return header;
    }

    public void _addByte(ArrayList<Byte> array, byte[] extend) {
        for(byte b: extend) array.add(b);
    }

    public void _addByte(ArrayList<Byte> array, byte[] extend, int len) {
        for(int i = 0; i < len; i++) array.add(extend[i]);
    }
}