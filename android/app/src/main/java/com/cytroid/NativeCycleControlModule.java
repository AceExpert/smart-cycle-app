package com.cytroid;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.media.session.MediaSessionManager;
import android.os.IBinder;
import android.os.VibrationEffect;
import android.util.Log;
import android.view.KeyEvent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.very.anshul.cytroid.CycleService;
import com.very.anshul.cytroid.NotificationProcessor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Objects;

public class NativeCycleControlModule extends NativeCycleControlSpec {

    ReactApplicationContext ctx;
    DeviceEventManagerModule.RCTDeviceEventEmitter emitter;
    CycleService cycleService = null;
    CycleService.CycleServiceBinder cycleServiceBinder = null;

    String[] filters = new String[]{"join_voip", "mute_voip", "leave_voip", "unmute_voip", "media_rsp",
                                     "map_update", "voip_serv_conn", "voip_serv_disconn", "sdisc", "sdisc_res",
                                     "gps_connect", "cycle_lock", "sdisc_pair", "cycle_state", "cycle_settings", "cycle_service_active"};

    LinkedList<String> pendingActions = new LinkedList<>();
    boolean serviceActive = false;

    public interface CycleEventListener {
        void onCycleLock(boolean locked);
        void onGPSConnect(boolean connected);
        void muteVOIP(boolean muted);
        void leaveVOIP(boolean left);
        void voipServerConnected(boolean connected);
        void mediaUpdate(String name, String cover, String artist, long duration);
        void speakerResult(String name, byte[] address, int rssi);
        void onSpeakerDiscovery(boolean started);
        void onSpeakerPaired(boolean paired);
        void getSettings(String settings);
        void cycleServiceActive();
        void mapUpdate(String distance, String direction, String meta);
    }

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (Objects.equals(intent.getAction(), "cycle_service_active")) {
                serviceActive = true;
                while (!pendingActions.isEmpty()) {
                    sendBroadcast(pendingActions.pop());
                }
            } else if(Objects.equals(intent.getAction(), "media_rsp")) {
                if(Objects.equals(intent.getStringExtra("type"), "media_active")) {
                    WritableMap map = Arguments.createMap();
                    map.putString("active", String.valueOf(intent.getBooleanExtra("active", false)));
                    ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("mediaActive", map);
                } else if (Objects.equals(intent.getStringExtra("type"), "media_info")) {
                    HashMap<String, String> map = new HashMap<>();
                    map.put("name", intent.getStringExtra("title"));
                    map.put("cover", intent.getStringExtra("cover"));
                    map.put("artist", intent.getStringExtra("artist"));
                    map.put("duration", String.valueOf(intent.getLongExtra("duration", 0)));
                    WritableMap writableMap = new WritableNativeMap();
                    for(Map.Entry<String, String> entry: map.entrySet()) {
                        writableMap.putString(entry.getKey(), entry.getValue());
                    }
                    ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("mediaInfo", writableMap);
                } else if (Objects.equals(intent.getStringExtra("type"), "playback")) {
                    WritableMap map = Arguments.createMap();
                    map.putString("paused", String.valueOf(intent.getBooleanExtra("paused", true)));
                    map.putString("seek", String.valueOf(intent.getLongExtra("seek", 0)));
                    ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("mediaState", map);
                }
            } else if(Objects.equals(intent.getAction(), "cycle_location")) {
                String[] location = intent.getStringArrayExtra("location");
                WritableMap map = Arguments.createMap();
                map.putString("lat", location[0]);
                map.putString("lat_dir", location[1]);
                map.putString("logt", location[2]);
                map.putString("logt_dir", location[3]);
                ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("cycleLocation", map);
            }
        }
    };

    CycleEventListener cycleEventListener = new CycleEventListener() {
        @Override
        public void onCycleLock(boolean locked) {
            WritableMap map = Arguments.createMap();
            map.putBoolean("data", locked);
            emitter.emit("cycleLock", map);
        }

        @Override
        public void onGPSConnect(boolean connected) {
            WritableMap map = Arguments.createMap();
            map.putBoolean("data", connected);
            emitter.emit("cycleConnect", map);
        }

        @Override
        public void muteVOIP(boolean muted) {
            emitter.emit("muteVOIP", muted);
        }

        @Override
        public void leaveVOIP(boolean left) {
            emitter.emit("joinVOIP", !left);
        }

        @Override
        public void voipServerConnected(boolean connected) {
            emitter.emit("voipOPEN", connected);
        }

        @Override
        public void mediaUpdate(String name, String cover, String artist, long duration) {
            WritableMap map = Arguments.createMap();
            map.putString("name", name);
            map.putString("cover", cover);
            map.putString("artist", artist);
            map.putString("duration", String.valueOf(duration));
            emitter.emit("mediaInfo", map);
        }

        @Override
        public void speakerResult(String name, byte[] address, int rssi) {
            WritableMap map = Arguments.createMap();
            map.putString("name", name);
            WritableArray array = Arguments.createArray();
            for(int i = 0; i < 6; i++) {
                array.pushInt(address[i]);
            }
            map.putArray("address", array);
            map.putInt("rssi", rssi);
            emitter.emit("speakerDiscoveryResult", map);
        };

        @Override
        public void onSpeakerDiscovery(boolean started) {
            WritableMap map = Arguments.createMap();
            map.putBoolean("data", started);
            emitter.emit("speakerDiscovery", map);
        }

        @Override
        public void onSpeakerPaired(boolean paired) {
            WritableMap map = Arguments.createMap();
            map.putBoolean("data", paired);
            emitter.emit("speakerPair", map);
        }

        @Override
        public void getSettings(String settings) {
            emitter.emit("cycleSettings", settings);
        }

        @Override
        public void cycleServiceActive() {

        }

        @Override
        public void mapUpdate(String distance, String direction, String meta) {
            WritableMap map = Arguments.createMap();
            map.putString("distance", distance);
            map.putString("direction", direction);
            map.putString("meta", meta);
            emitter.emit("mapInfo", map);
        }

    };

    public NativeCycleControlModule(ReactApplicationContext context) {
        super(context);
        ctx = context;
        emitter = ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        setNotificationChannels();
        context.startService(new Intent(context, CycleService.class));
        context.bindService(new Intent(context, CycleService.class), new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                cycleServiceBinder = (CycleService.CycleServiceBinder) service;
                cycleService = cycleServiceBinder.getService();
                cycleServiceBinder.setEventListener(cycleEventListener);
                cycleServiceBinder.setEmitter(emitter);
                emitter.emit("serviceConnected", null);
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                cycleServiceBinder = null;
                cycleService = null;
            }
        }, Context.BIND_AUTO_CREATE);
    }

    public void setNotificationChannels() {
        NotificationManager notificationManager = ctx.getSystemService(NotificationManager.class);
        NotificationChannel channel = new NotificationChannel("cycle_service", "Cycle Service", NotificationManager.IMPORTANCE_MIN);
        channel.setAllowBubbles(false);
        channel.setShowBadge(false);
        channel.setDescription("Indicates the cycle is monitored and safe.");
        notificationManager.createNotificationChannel(channel);
        channel = new NotificationChannel("cycle_alarm", "Cycle Alarm", NotificationManager.IMPORTANCE_HIGH);
        channel.setAllowBubbles(true);
        channel.setShowBadge(true);
        channel.setBypassDnd(true);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableLights(true);
        channel.enableVibration(true);
        channel.setDescription("Alerts regarding suspicious activity around cycle or theft.");
        notificationManager.createNotificationChannel(channel);
        channel = new NotificationChannel("cycle_battery", "Cycle Battery", NotificationManager.IMPORTANCE_HIGH);
        channel.setAllowBubbles(true);
        channel.setShowBadge(true);
        channel.setBypassDnd(true);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableLights(true);
        channel.enableVibration(true);
        channel.setDescription("Alerts regarding cycle and speaker battery.");
        notificationManager.createNotificationChannel(channel);
        channel = new NotificationChannel("cycle_network", "Cycle Network", NotificationManager.IMPORTANCE_DEFAULT);
        channel.setAllowBubbles(true);
        channel.setShowBadge(true);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableLights(true);
        channel.setDescription("When your friends go for cycling, this will inform you.");
        notificationManager.createNotificationChannel(channel);
    }

    public void sendBroadcast(String action) {
        Intent intent = new Intent(action);
        ctx.sendBroadcast(intent);
    }

    @Override
    @NonNull
    public String getName() {
        return "NativeCycleControl";
    }

    @Override
    public void init(Callback callback) {
        IntentFilter filter = new IntentFilter();
        for(String filt: filters) {
            filter.addAction(filt);
        }
        ctx.getCurrentActivity().registerReceiver(broadcastReceiver, filter, Context.RECEIVER_EXPORTED);
        callback.invoke();
        String[] reqs = {"media_info", "media_active", "navi_update", "GET_SETTINGS"};
        for(String req: reqs) {
            if(serviceActive) {
                ctx.sendBroadcast(new Intent(req));
            } else {
                pendingActions.push(req);
            }
        }
    }

    @Override
    public void openMap() {
        if(cycleServiceBinder != null) cycleServiceBinder.openMap();
    }

    @Override
    public void isMediaActive(Callback callback) {

    }

    @Override
    public void mediaPlay() {

    }

    @Override
    public void mediaPause() {

    }

    @Override
    public void getCycleState() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.getLocked();
            cycleServiceBinder.gpsConnected();
        };
    }

    @Override
    public void setupSpeaker() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.setupSpeaker();
        } else {

        };
    }

    @Override
    public void connectSpeaker(ReadableArray address) {
        byte[] dev_address = new byte[6];
        for(int i = 0; i < address.size(); i++) {
            dev_address[i] = (byte) address.getInt(i);
        }
        if(cycleServiceBinder != null) {
            cycleServiceBinder.connectSpeaker(dev_address);
        }
    }

    @Override
    public void setSettings(String data) {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.setSettings(data);
        }
    }

    @Override
    public void getSettings(String filename) {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.getSettings();
        }
    }

    public void sendMediaKey(int keyCode) {
        Intent i1 = new Intent(Intent.ACTION_MEDIA_BUTTON).putExtra(Intent.EXTRA_KEY_EVENT, new KeyEvent(KeyEvent.ACTION_DOWN, keyCode));
        Intent i2 = new Intent(Intent.ACTION_MEDIA_BUTTON).putExtra(Intent.EXTRA_KEY_EVENT, new KeyEvent(KeyEvent.ACTION_UP, keyCode));
        ctx.sendOrderedBroadcast(i1, null);
        ctx.sendOrderedBroadcast(i2, null);
    }

    @Override
    public void mediaToggle() {
        this.sendBroadcast("PLAY_PAUSE");
        this.sendMediaKey(KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE);
    }

    @Override
    public void mediaNext() {
        sendBroadcast("TRACK_NEXT");
        this.sendMediaKey(KeyEvent.KEYCODE_MEDIA_NEXT);
    }

    @Override
    public void mediaPrev() {
        this.sendBroadcast("TRACK_PREV");
        this.sendMediaKey(KeyEvent.KEYCODE_MEDIA_PREVIOUS);
    }

    @Override
    public void openNotificationAccess() {
        Intent intent = new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ctx.startActivity(intent);
    }

    @Override
    public void getMediaInfo(Callback callback) {
    }

    @Override
    public void setVolume(double vol) {

    }

    @Override
    public double getVolume() {
        return 0;
    }

    @Override
    public double getSeek() {
        return 0;
    }

    @Override
    public void setSeek(double seek) {

    }

    @Override
    public String getSpeakerName() {
        return "";
    }

    @Override
    public void connectCycleSpeaker() {

    }

    @Override
    public boolean isCycleSpeakerConnected() {
        return false;
    }

    @Override
    public boolean isVoIPactive() {
        return false;
    }

    @Override
    public void connectVoIP() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.connectVOIP(true);
        }
    }

    @Override
    public void disconnectVoIP() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.connectVOIP(false);
        }
    }

    @Override
    public void VoIPMute() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.muteVOIP(true);
        }
    }

    @Override
    public void VoIPUnmute() {
        if(cycleServiceBinder != null) {
            cycleServiceBinder.muteVOIP(false);
        }
    }

}
