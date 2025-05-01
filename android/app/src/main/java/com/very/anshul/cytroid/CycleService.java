package com.very.anshul.cytroid;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.companion.AssociationInfo;
import android.companion.AssociationRequest;
import android.companion.BluetoothLeDeviceFilter;
import android.companion.CompanionDeviceManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.IntentSender;
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
import android.os.Bundle;
import android.os.Environment;
import android.os.IBinder;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import android.bluetooth.*;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;
import java.nio.BufferUnderflowException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;
import java.util.concurrent.Executor;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class CycleService extends Service {

    static String token = "49n5pEsOUDF25rBhUFmN";
    String gpsToken = "hMrXDM0x6G";
    String address = "2C:BC:BB:0D:94:4E";
    String secAddress = "ff:bc:cd:ff:ff:aa";
    String speakerAddr = "88:13:bf:0b:94:6e";
    String serverIP = "10.145.65.124";
    int localPort = 8248;

    double lat = 0;
    double longt = 0;
    char lat_dir = 0;
    char longt_dir = 0;

    AudioManager audioManager;
    BluetoothManager manager;
    NotificationManager notificationManager;
    CompanionDeviceManager companionDeviceManager;

    BluetoothAdapter adapter;
    BluetoothGatt gattClient = null;

    AudioDeviceInfo bluetoothAudio = null;
    AudioRecord audioRecord = null;
    AudioTrack audioTrack = null;
    int audioSessionId = 0;
    boolean muted = true;
    boolean joined = false;
    boolean recording = false;
    DatagramSocket udpSocket = null;

    VoIPWebSocket vows = null;
    VoStreamTask streamTask = null;
    VoStreamPlayTask streamPlayTask = null;

    boolean volumeChange = false;
    boolean volumeUp = false;
    LocalDateTime lastVolCtrl = LocalDateTime.now();

    ArrayList<Integer> rssiRecord = new ArrayList<Integer>();

    boolean locked = true;
    LocalDateTime lockTime = null;

    SocketChannel gpsSocket = null;
    boolean gpsConnected = false;
    boolean gpsConnecting = false;
    String gpsIP = "192.168.78.101";
    GPSTask gpsTask = null;

    String[] cycleLocation = new String[] {"22.32182833", "N", "87.298741166", "E"};

    boolean callState = false;
    String callName = null;
    String callNo = null;
    boolean incoming = false;

    boolean auth = false;

    LinkedList<String> sendQueue = new LinkedList<>();
    LinkedList<String> gpsWriteQueue = new LinkedList<>();

    String[] cycleIntents = new String[] {"media_rsp", "map_update", "haptic_navigation", "CONNECT_VOIP", "DISCONNECT_VOIP", "MUTE_VOIP", "UNMUTE_VOIP", "SETUP_SPEAKER"};

    public class VoStreamTask implements Runnable {

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
                if (bluetoothAudio != null) {
                    //audioManager.setCommunicationDevice(bluetoothAudio);
                }
                try {
                    if(udpSocket == null)
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
                    if(!muted) {
                        audioRecord.startRecording();
                        recording = true;
                    }
                    byte[] audioBuf;
                    while (joined) {
                        if(muted) {
                            if(recording) {
                                audioRecord.stop();
                                recording = false;
                            }
                            continue;
                        }
                        if(!recording) {
                            audioRecord.startRecording();
                            recording = true;
                        }
                        audioBuf = new byte[512];
                        int byteRead = audioRecord.read(audioBuf, 0, 512);
                        DatagramPacket packet = new DatagramPacket(audioBuf, byteRead, InetAddress.getByName(serverIP), 3500);
                        udpSocket.send(packet);
                    }
                    if(recording) {
                        audioRecord.stop();
                        recording = false;
                    }
                    audioRecord.release();
                    audioRecord = null;
                    muted = true;
                    sendMediaControl("mute_voip");
                } catch (SecurityException e) {

                } catch (IOException e) {

                }
            }
        }
    }

    public class VoStreamPlayTask implements Runnable {

        public VoStreamPlayTask() {
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
                if (bluetoothAudio != null) {
                    //audioManager.setCommunicationDevice(bluetoothAudio);
                }
                try {
                    if(udpSocket == null)
                        udpSocket = new DatagramSocket(localPort);
                } catch (SocketException e) {
                    continue;
                }
                try {
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
                            AudioTrack.getMinBufferSize(16000, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT),
                            AudioTrack.MODE_STREAM,
                            audioSessionId
                    );
                    audioTrack.play();
                    byte[] audioBuf;
                    while (joined) {
                        audioBuf = new byte[512];
                        DatagramPacket packet = new DatagramPacket(audioBuf, 512);
                        udpSocket.receive(packet);
                        if(packet.getAddress().equals(InetAddress.getByName(serverIP)))
                            audioTrack.write(audioBuf, 0, packet.getLength());
                    }
                    audioTrack.stop();
                    audioTrack.release();
                    audioTrack = null;
                } catch (SecurityException e) {

                } catch (IOException e) {

                }
            }
        }
    }

    public class GPSTask implements Runnable {

        Pattern latPat = Pattern.compile("(\\d+)(\\d{2}\\.\\d+)");
        Selector selector = null;
        Thread hbTimer = new Thread(() -> {
            while (true) {
                if(gpsConnected && gpsSocket != null && gpsSocket.isConnected()) {
                    ByteBuffer buffer = ByteBuffer.wrap(".hb".getBytes());
                    try {
                        gpsSocket.write(buffer);
                    } catch (IOException e) {

                    }
                }
                try {
                    Thread.sleep(45000);
                } catch (InterruptedException e) {

                }
            }
        });

        String cmds = "";
        boolean cmdStart = false;
        LocalDateTime lastHb = null;

        public GPSTask() {
            hbTimer.start();
        }

        public double getRealCoords(String nmeaFormat) {
            try {
                Matcher matcher = latPat.matcher(nmeaFormat);
                matcher.find();
                return Double.parseDouble(matcher.group(1)) + Double.parseDouble(matcher.group(2)) / 60;
            } catch (IllegalStateException e) {
                return 0;
            }
        }

        public void processCommand(String cmd) {
            Log.i("sock cmd", cmd);
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
                if (parts.length > 0 && parts[0].equals("$GPGGA")) {
                    String lat = parts[2];
                    String lat_dir = parts[3];
                    String logt = parts[4];
                    String logt_dir = parts[5];
                    double res_lat = getRealCoords(lat);
                    double res_logt = getRealCoords(logt);
                    if(res_lat != 0 || res_logt != 0) {
                        cycleLocation = new String[]{String.valueOf(res_lat), lat_dir, String.valueOf(res_logt), logt_dir};
                        Intent intent = new Intent("cycle_location");
                        intent.putExtra("location", cycleLocation);
                        sendBroadcast(intent);
                    }
                };
            };
        }

        public void disconnect() {

        }

        @Override
        public void run() {
            while(true) {
                try {
                    if(!gpsConnected && !gpsConnecting) {
                        cmds = "";
                        cmdStart = false;
                        lastHb = null;

                        selector = Selector.open();
                        gpsSocket = SocketChannel.open();
                        gpsSocket.configureBlocking(false);
                        gpsSocket.connect(new InetSocketAddress("209.74.79.245", 3121));
                        gpsSocket.register(selector, SelectionKey.OP_CONNECT);
                        gpsConnecting = true;
                    } else if (gpsConnecting) {
                        if(selector.select(10000) > 0) {

                            for(SelectionKey key: selector.selectedKeys()) {
                                if(!key.isValid()) {
                                    gpsConnected = false;
                                    gpsConnecting = false;
                                    Intent intent = new Intent("gps_connect");
                                    intent.putExtra("connected", false);
                                    sendBroadcast(intent);
                                    break;
                                }
                                if(key.isConnectable()) {
                                    SocketChannel sock = (SocketChannel) key.channel();
                                    if (sock.finishConnect()) {
                                        sock.write(ByteBuffer.wrap(("$auth phone " + gpsToken + " " + secAddress).getBytes()));
                                        Intent intent = new Intent("gps_connect");
                                        intent.putExtra("connected", true);
                                        sendBroadcast(intent);
                                        gpsConnected = true;
                                        gpsConnecting = false;
                                        int keys = SelectionKey.OP_READ;
                                        if(!gpsWriteQueue.isEmpty()) keys |= SelectionKey.OP_WRITE;
                                        key.interestOps(keys);
                                        lastHb = LocalDateTime.now();
                                    } else {
                                    }
                                };
                            }
                            selector.selectedKeys().clear();
                        }
                    } else {
                        if(lastHb != null && lastHb.until(LocalDateTime.now(), ChronoUnit.SECONDS) >= 60) {
                            Log.i("socket end", "time");
                            Intent intent = new Intent("gps_connect");
                            intent.putExtra("connected", false);
                            sendBroadcast(intent);
                            gpsConnected = false;
                            gpsConnecting = false;
                            gpsSocket.close();
                            continue;
                        }
                        if(selector.select(20000) > 0) {
                            for(SelectionKey key: selector.selectedKeys()) {
                                if(!key.isValid()) {
                                    Intent intent = new Intent("gps_connect");
                                    intent.putExtra("connected", false);
                                    sendBroadcast(intent);
                                    gpsConnected = false;
                                    gpsConnecting = false;
                                    break;
                                }
                                if(key.isReadable()) {
                                    SocketChannel sock = (SocketChannel) key.channel();
                                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                                    int len = sock.read(buffer);
                                    if(len == -1) {
                                        Intent intent = new Intent("gps_connect");
                                        intent.putExtra("connected", false);
                                        sendBroadcast(intent);
                                        gpsConnected = false;
                                        gpsConnecting = false;
                                        sock.close();
                                        break;
                                    }
                                    if(len > 0) {
                                        lastHb = LocalDateTime.now();
                                    }
                                    Log.i("socket read", String.valueOf(len));
                                    for(int i = 0; i < len; i++) {
                                        byte current = buffer.get(i);
                                        if(!cmdStart && current == '.' || current == '$') {
                                            cmdStart = true;
                                            cmds = "";
                                            cmds += new String(new byte[]{current}, StandardCharsets.US_ASCII);
                                            continue;
                                        }
                                        if(cmdStart) {
                                            if(current == '\n') {
                                                Log.i("socket msg", cmds);
                                                cmdStart = false;
                                                processCommand(cmds);
                                                cmds = "";
                                            } else {
                                                cmds += new String(new byte[]{current}, StandardCharsets.US_ASCII);
                                            }
                                        }
                                    }
                                }

                                if(key.isWritable()) {
                                    SocketChannel sock = (SocketChannel) key.channel();
                                    String data = gpsWriteQueue.pop();
                                    ByteBuffer buffer = ByteBuffer.wrap(data.getBytes());
                                    sock.write(buffer);
                                }

                                int keys = SelectionKey.OP_READ;
                                if(!gpsWriteQueue.isEmpty()) keys |= SelectionKey.OP_WRITE;
                                key.interestOps(keys);
                            }
                        }
                        selector.selectedKeys().clear();
                    }
                } catch (IOException e) {
                    Log.e("Socket error", String.valueOf(e));
                    Intent intent = new Intent("gps_connect");
                    intent.putExtra("connected", false);
                    sendBroadcast(intent);
                    gpsConnected = false;
                    gpsConnecting = false;
                }
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
                volumeChange = false;
            } else if (Objects.equals(intent.getAction(), "haptic_navigation")) {
                try {
                    if (gattClient != null && manager.getConnectionState(gattClient.getDevice(), BluetoothProfile.GATT) == BluetoothProfile.STATE_CONNECTED) {
                        queueSend(token + " " + intent.getStringExtra("direction"));
                    }
                } catch (SecurityException e) {

                }
            } else if (Objects.equals(intent.getAction(), "call_state")) {
                callState = intent.getBooleanExtra("call", false);
            } else if (Objects.equals(intent.getAction(), "CONNECT_VOIP")) {
                joinVOIP();
                sendMediaControl("join_voip");
            } else if (Objects.equals(intent.getAction(), "DISCONNECT_VOIP")) {
                leaveVOIP();
                sendMediaControl("leave_voip");
            } else if (Objects.equals(intent.getAction(), "MUTE_VOIP")) {
                muted = true;
                sendMediaControl("mute_voip");
            } else if (Objects.equals(intent.getAction(), "UNMUTE_VOIP")) {
                muted = false;
                sendMediaControl("unmute_voip");
            } else if (Objects.equals(intent.getAction(), "SETUP_SPEAKER")) {

                queueSend(token + " " + "speaker_setup");
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
        companionDeviceManager = (CompanionDeviceManager) getSystemService(Context.COMPANION_DEVICE_SERVICE);
        gpsTask = new GPSTask();
        streamTask = new VoStreamTask();
        streamPlayTask = new VoStreamPlayTask();
        vows = new VoIPWebSocket("ws://" + serverIP + ":3500/bolt", localPort, "89", new VoIPWebSocket.Callback() {
            @Override
            public void onOpen() {
                sendMediaControl("voip_serv_conn");
            }

            @Override
            public void onDisconnect() {
                sendMediaControl("voip_serv_disconn");
            }

            @Override
            public void onFriendOnline(String[] userIds) {

            }

            @Override
            public void onFriendOffline(String[] userIds) {

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
        for(String filter: cycleIntents) {
            intentFilter.addAction(filter);
        }

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
        startService(new Intent(this, CallService.class));
        if(adapter.isEnabled()) connectCycle();
        (new Thread(gpsTask)).start();
        (new Thread(streamTask)).start();
        (new Thread(streamPlayTask)).start();
        vows.connect();
        return START_STICKY;
    }

    public void queueSend(String cmd) {
        sendQueue.add(cmd);
    }

    public void onCycleUnlock() {
        Intent intent = new Intent("cycle_lock");
        intent.putExtra("locked", false);
        sendBroadcast(intent);
        setCycleAudioRouting();
        vows.sendMessage("{\"type\":1, \"action\":1}");
    };

    public void onCycleLock() {
        Intent intent = new Intent("cycle_lock");
        intent.putExtra("locked", true);
        sendBroadcast(intent);
        volumeChange = false;
        leaveVOIP();
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

    public void volumeControl(boolean up) {
        volumeChange = true;
        volumeUp = up;
    }

    public void sendMediaKey(int keyCode) {
        Intent i1 = new Intent(Intent.ACTION_MEDIA_BUTTON).putExtra(Intent.EXTRA_KEY_EVENT, new KeyEvent(KeyEvent.ACTION_DOWN, keyCode));
        Intent i2 = new Intent(Intent.ACTION_MEDIA_BUTTON).putExtra(Intent.EXTRA_KEY_EVENT, new KeyEvent(KeyEvent.ACTION_UP, keyCode));
        sendOrderedBroadcast(i1, null);
        sendOrderedBroadcast(i2, null);
    }

    public void connectCycle() {

        if (companionDeviceManager.getMyAssociations().isEmpty()) {
            AssociationRequest request = new AssociationRequest.Builder()
                    .setDeviceProfile(AssociationRequest.DEVICE_PROFILE_WATCH)
                    .addDeviceFilter(
                            new BluetoothLeDeviceFilter.Builder()
                                    .setNamePattern(Pattern.compile("^[cC]ytroid.+$"))
                                    .build()
                    )
                    .build();
            Executor executor = new Executor() {
                @Override
                public void execute(Runnable command) {
                    command.run();
                }
            };
            companionDeviceManager.associate(request, executor, new CompanionDeviceManager.Callback() {
                @Override
                public void onAssociationPending(@NonNull IntentSender intentSender) {
                    try {
                        intentSender.sendIntent(CycleService.this, 1, null, new IntentSender.OnFinished() {
                            @Override
                            public void onSendFinished(IntentSender IntentSender, Intent intent, int resultCode, String resultData, Bundle resultExtras) {

                            }
                        }, null);
                    } catch (IntentSender.SendIntentException e) {
                        Log.e("CDM error", e.toString());
                    }
                }

                @Override
                public void onAssociationCreated(@NonNull AssociationInfo associationInfo) {
                    address = associationInfo.getDeviceMacAddress().toString().toUpperCase();
                    initCycle();
                }

                @Override
                public void onFailure(@Nullable CharSequence error) {

                }
            });
        } else {
            address = companionDeviceManager.getMyAssociations().get(0).getDeviceMacAddress().toString().toUpperCase();
            initCycle();
        }
    }

    public void initCycle() {
        BluetoothDevice device = adapter.getRemoteDevice(address);

        try {
            gattClient = device.connectGatt(this, false, new BluetoothGattCallback() {
                @Override
                public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
                    volumeChange = false;
                    if(newState == 2) {
                        gatt.requestMtu(200);
                    } else {
                        locked = true;
                        auth = false;
                        onCycleLock();
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
                    String cmd = "";
                    int i = 0;
                    for(; i < value.length; i++) {
                            cmd += new String(value, i, 1, StandardCharsets.US_ASCII);

                            if(cmd.equals(".sdisc")) break;
                    }
                    Log.i("ble cmd", cmd);

                    if(cmd.equals(".sdisc")){
                        if(value[i+1] == '_') {
                            String ncmd = new String(value, i + 2, value.length - i - 2, StandardCharsets.US_ASCII);
                            if(ncmd.equals("start")) {
                                Intent intent = new Intent("sdisc");
                                intent.putExtra("started", true);
                                sendBroadcast(intent);
                            } else if (ncmd.equals("end")) {
                                Intent intent = new Intent("sdisc");
                                intent.putExtra("started", false);
                                sendBroadcast(intent);
                            }
                        } else if (value[i+1] == ' ') {
                            i+=2;
                            int dev_name_len = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).put(value, i, 4).getInt(0);
                            i+=4;
                            String dev_name = new String(value, i, dev_name_len, StandardCharsets.US_ASCII);
                            i+=dev_name_len;
                            byte[] address = new byte[6];
                            for(int j = 0; j < 6; j++) {
                                address[j] = value[i + j];
                            };
                            i+=6;
                            int rssi = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).put(value, i, 1).getInt(0) - 256;
                            Intent intent = new Intent("sdisc_res");
                            intent.putExtra("name", dev_name);
                            intent.putExtra("address", address);
                            intent.putExtra("rssi", rssi);
                            sendBroadcast(intent);
                        }
                    }

                    if(cmd.equals(".play")) {
                        sendMediaControl("PLAY_PAUSE");
                        sendMediaControl("H_REJECT_CALL");
                        sendMediaKey(KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE);
                    } else if (cmd.equals(".next")) {
                        sendMediaControl("TRACK_NEXT");
                        sendMediaControl("H_ANSWER_CALL");
                        sendMediaKey(KeyEvent.KEYCODE_MEDIA_NEXT);
                    } else if (cmd.equals(".prev")) {
                        sendMediaControl("TRACK_PREV");
                        sendMediaKey(KeyEvent.KEYCODE_MEDIA_PREVIOUS);
                    } else if (cmd.equals(".vol_up")) {
                        volumeControl(true);
                    } else if (cmd.equals(".vol_down")) {
                        volumeControl(false);
                    } else if (cmd.equals(".vol_stop")) {
                        volumeChange = false;
                    }
                    else if (cmd.equals(".join")) {
                        if(joined) {
                            leaveVOIP();
                        } else {
                            joinVOIP();
                        }
                    } else if (cmd.equals(".leave")) {
                    };
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
                    if(volumeChange) {
                        if(lastVolCtrl.until(LocalDateTime.now(), ChronoUnit.MILLIS) > 490) {
                            audioManager.adjustVolume(volumeUp ? AudioManager.ADJUST_RAISE : AudioManager.ADJUST_LOWER, AudioManager.FLAG_PLAY_SOUND | AudioManager.FLAG_SHOW_UI);
                            lastVolCtrl = LocalDateTime.now();
                        }
                    }
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
                                if (!(lockTime != null && lockTime.until(LocalDateTime.now(), ChronoUnit.SECONDS) < 7)) {
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