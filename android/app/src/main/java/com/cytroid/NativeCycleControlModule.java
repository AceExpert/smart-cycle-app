package com.cytroid;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.session.MediaSessionManager;
import android.os.VibrationEffect;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.very.anshul.cytroid.CycleService;
import com.very.anshul.cytroid.NotificationProcessor;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class NativeCycleControlModule extends NativeCycleControlSpec {

    ReactApplicationContext ctx;

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(Objects.equals(intent.getAction(), "media_rsp")) {
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
            } else if (Objects.equals(intent.getAction(), "map_update")) {
                WritableMap map = Arguments.createMap();
                map.putString("distance", intent.getStringExtra("distance"));
                map.putString("direction", intent.getStringExtra("direction"));
                map.putString("meta", intent.getStringExtra("meta"));
                ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("mapInfo", map);
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

    public NativeCycleControlModule(ReactApplicationContext context) {
        super(context);
        ctx = context;
        setNotificationChannels();
        context.startForegroundService(new Intent(context, CycleService.class));
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

    @Override
    @NonNull
    public String getName() {
        return "NativeCycleControl";
    }

    @Override
    public void init(Callback callback) {
        IntentFilter filter = new IntentFilter();
        filter.addAction("media_rsp");
        filter.addAction("map_update");
        ctx.getCurrentActivity().registerReceiver(broadcastReceiver, filter);
        callback.invoke();
        ctx.sendBroadcast(new Intent("media_info"));
        ctx.sendBroadcast(new Intent("media_active"));
        ctx.sendBroadcast(new Intent("navi_update"));
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
    public void mediaToggle() {
        ctx.sendBroadcast(new Intent("PLAY_PAUSE"));
    }

    @Override
    public void mediaNext() {
        ctx.sendBroadcast(new Intent("TRACK_NEXT"));
    }

    @Override
    public void mediaPrev() {
        Intent intent = new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ctx.startActivity(intent);
        ctx.sendBroadcast(new Intent("TRACK_PREV"));
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
    public void onCycleConnect(Callback callback) {

    }

    @Override
    public void onCycleDisconnect(Callback callback) {

    }

    @Override
    public void onSpeakerConnect(Callback callback) {

    }

    @Override
    public void onSpeakerDisconnect(Callback callback) {

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
    public void onVoIPConnect(Callback callback) {

    }

    @Override
    public void onVoIPDisconnect(Callback callback) {

    }

    @Override
    public void onVoIPMute(Callback callback) {

    }

    @Override
    public void onVoIPUnmute(Callback callback) {

    }

    @Override
    public boolean isVoIPactive() {
        return false;
    }

    @Override
    public void connectVoIP() {

    }

    @Override
    public void disconnectVoIP() {

    }

    @Override
    public void VoIPMute() {

    }

    @Override
    public void VoIPUnmute() {

    }

}
