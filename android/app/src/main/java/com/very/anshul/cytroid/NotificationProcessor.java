package com.very.anshul.cytroid;

import android.app.Notification;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Icon;
import android.media.Image;
import android.media.MediaMetadata;
import android.media.session.MediaSession;
import android.media.session.PlaybackState;
import android.os.Environment;
import android.os.IBinder;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.text.SpannableString;
import android.util.Log;

import android.media.session.MediaSessionManager;
import android.media.session.MediaController;
import android.view.KeyEvent;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.cytroid.NativeCycleControlModule;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

public class NotificationProcessor extends NotificationListenerService {

    MediaSessionManager mediaSessionManager;
    MediaController mediaController = null;
    MediaSession.Token mediaToken = null;

    Notification mapNotification = null;

    static String mapsPackage = "com.google.android.apps.maps";

    String lastMediaID = null;

    Float leftDistance = null;

    MediaController.Callback mediaCallback = new MediaController.Callback() {
        @Override
        public void onPlaybackStateChanged(@Nullable PlaybackState state) {
            super.onPlaybackStateChanged(state);
            sendPlaybackState();
        }

        @Override
        public void onSessionDestroyed() {
            super.onSessionDestroyed();
            mediaToken = null;
            mediaController.unregisterCallback(mediaCallback);
            mediaController = null;
            sendMediaActive(false);
        }

        @Override
        public void onMetadataChanged(@Nullable MediaMetadata metadata) {
            super.onMetadataChanged(metadata);
            sendMediaInfo();
        }
    };

    MediaSessionManager.OnMediaKeyEventSessionChangedListener mediaListener = (packageName, sessionToken) -> {
        if(sessionToken != null) {
            mediaToken = sessionToken;
            if(mediaController != null) mediaController.unregisterCallback(mediaCallback);
            mediaController = new MediaController(this, sessionToken);
            mediaController.registerCallback(mediaCallback);
            sendMediaActive(true);
            sendMediaInfoForce();
            sendPlaybackState();
        }
    };

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
              Intent rspIntent = new Intent("media_rsp");
              if(Objects.equals(intent.getAction(), "media_active")) {
                  rspIntent.putExtra("type", "media_active");
                  if(mediaToken != null) {
                      rspIntent.putExtra("active", true);
                      sendBroadcast(rspIntent);
                  } else {
                      rspIntent.putExtra("active", false);
                      sendBroadcast(rspIntent);
                  }
              } else if (Objects.equals(intent.getAction(), "media_info")) {
                  sendMediaInfoForce();
                  sendPlaybackState();
              } else if (Objects.equals(intent.getAction(), "navi_update")) {
                  sendMapInfo();
              }
              if(intent.getAction() != null && mediaToken != null) {
                  switch (intent.getAction()) {
                      case "PLAY_PAUSE": {
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE));
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE));
                          break;
                      }
                      case "TRACK_NEXT": {
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_NEXT));
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_NEXT));
                          break;
                      }
                      case "TRACK_PREV": {
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_PREVIOUS));
                          mediaController.dispatchMediaButtonEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_PREVIOUS));
                          break;
                      }
                  }
              }
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        IntentFilter filter = new IntentFilter();
        filter.addAction("media_active");
        filter.addAction("media_info");
        filter.addAction("PLAY_PAUSE");
        filter.addAction("TRACK_NEXT");
        filter.addAction("TRACK_PREV");
        registerReceiver(broadcastReceiver, filter, RECEIVER_EXPORTED);
        requestRebind(new ComponentName(this, CycleService.class));
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(broadcastReceiver);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    public void sendMediaActive(boolean active) {
        Intent rspIntent = new Intent("media_rsp");
        rspIntent.putExtra("type", "media_active");
        rspIntent.putExtra("active", active);
        sendBroadcast(rspIntent);
    }

    public void sendDirection(String direction) {
      Intent directionIntent = new Intent("haptic_navigation");
      directionIntent.putExtra("direction", direction);
      sendBroadcast(directionIntent);
    };

    public void sendMediaInfo() {
        if(mediaController != null) {
            ContentResolver contentResolver = getContentResolver();
            Intent rspIntent = new Intent("media_rsp");
            rspIntent.putExtra("type", "media_info");
            MediaMetadata mediaMetadata = mediaController.getMetadata();
            if(mediaMetadata != null && !Objects.equals(lastMediaID, mediaMetadata.getDescription().getMediaId())) {
                rspIntent.putExtra("title", mediaMetadata.getString(MediaMetadata.METADATA_KEY_TITLE));
                rspIntent.putExtra("artist", mediaMetadata.getString(MediaMetadata.METADATA_KEY_ARTIST));
                rspIntent.putExtra("duration", mediaMetadata.getLong(MediaMetadata.METADATA_KEY_DURATION));
                lastMediaID = mediaMetadata.getDescription().getMediaId();
                try {
                    rspIntent.putExtra("cover", Base64.getMimeEncoder().encodeToString(contentResolver.openInputStream(mediaMetadata.getDescription().getIconUri()).readAllBytes()));
                } catch (Exception e) {
                    Log.e("ERROR", e.getLocalizedMessage());
                }
                sendBroadcast(rspIntent);
            }
        }
    }

    public void sendMediaInfoForce() {
        if(mediaController != null) {
            ContentResolver contentResolver = getContentResolver();
            Intent rspIntent = new Intent("media_rsp");
            rspIntent.putExtra("type", "media_info");
            MediaMetadata mediaMetadata = mediaController.getMetadata();
            if(mediaMetadata != null) {
                rspIntent.putExtra("title", mediaMetadata.getString(MediaMetadata.METADATA_KEY_TITLE));
                rspIntent.putExtra("artist", mediaMetadata.getString(MediaMetadata.METADATA_KEY_ARTIST));
                rspIntent.putExtra("duration", mediaMetadata.getLong(MediaMetadata.METADATA_KEY_DURATION));
                lastMediaID = mediaMetadata.getDescription().getMediaId();
                try {
                    //rspIntent.putExtra("cover", Base64.getMimeEncoder().encodeToString(contentResolver.openInputStream(mediaMetadata.getDescription().getIconUri()).readAllBytes()));
                    rspIntent.putExtra("cover", mediaMetadata.getDescription().getIconUri());
                } catch (Exception e) {
                    Log.e("ERROR", e.getLocalizedMessage());
                }
                sendBroadcast(rspIntent);
            }
        }
    }

    public void sendPlaybackState() {
        if(mediaController != null && mediaController.getPlaybackState() != null) {
            PlaybackState playbackState = mediaController.getPlaybackState();
            Intent rspIntent = new Intent("media_rsp");
            rspIntent.putExtra("type", "playback");
            rspIntent.putExtra("paused", !playbackState.isActive());
            rspIntent.putExtra("seek", playbackState.getPosition());
            sendBroadcast(rspIntent);
        }
    }

    @Override
    public void onListenerConnected() {
        super.onListenerConnected();
        mediaSessionManager = (MediaSessionManager)this.getSystemService(Context.MEDIA_SESSION_SERVICE);
        mediaSessionManager.addOnMediaKeyEventSessionChangedListener(getMainExecutor(), mediaListener);
        mediaToken = mediaSessionManager.getMediaKeyEventSession();
        if(mediaToken == null && !mediaSessionManager.getActiveSessions(new ComponentName(this, NotificationProcessor.class)).isEmpty()) {
            mediaToken = mediaSessionManager.getActiveSessions(new ComponentName(this, NotificationProcessor.class)).get(0).getSessionToken();
        }
        if(mediaToken != null) {
            mediaController = new MediaController(this, mediaToken);
            mediaController.registerCallback(mediaCallback);
            sendMediaActive(true);
            sendPlaybackState();
            sendMediaInfo();
        }
        getMapInfo();
    }

    public void toastLog(String t) {
        Toast.makeText(this, t, Toast.LENGTH_SHORT).show();
    }

    public void getMapInfo() {
        StatusBarNotification[] notifications = this.getActiveNotifications();
        for(StatusBarNotification notification : notifications) {
            if(Objects.equals(notification.getPackageName(), mapsPackage)) {
                mapNotification = notification.getNotification();
                break;
            }
        }
        if(mapNotification != null) {
            for(String key: mapNotification.extras.keySet()) {
                Log.i("map info key", key);
            }

            String distance = String.valueOf(mapNotification.extras.getParcelable("android.title", SpannableString.class));

            Log.i("map info", String.valueOf(mapNotification.extras.getParcelable("android.text", SpannableString.class)));
            Log.i("map info", mapNotification.extras.getString("android.subText", "no sub text"));
            Log.i("map info", String.valueOf(mapNotification.extras.getInt("android.progress", -32)));
            Log.i("map info", String.valueOf(mapNotification.extras.getInt("android.progressMax", -42)));
            Log.i("map info", mapNotification.extras.getString("android.infoText", "NULL"));
            Log.i("map info", String.valueOf(mapNotification.extras.getBoolean("android.progressIndeterminate", false)));

            Bitmap bitmap = ((BitmapDrawable)mapNotification.extras.getParcelable("android.largeIcon", Icon.class).loadDrawable(this)).getBitmap();
            //mapImageProcess(bitmap);

            //MapDirection direction = new MapDirection(bitmap);
            //Log.i("Direction", String.valueOf(direction.getDirection()));
            //int d = direction.getFinalDirection();
            //Log.i("direction", String.valueOf(d));

            if(!distance.equals("null")) {
                try {
                    float dist = Float.parseFloat(distance);
                    if(dist > 50 && leftDistance != null) {
                        sendDirection("dir_stop");
                        leftDistance = null;
                    }
                    if (dist <= 50 && leftDistance != dist) {
                        MapDirection direction = new MapDirection(bitmap);
                        int d = direction.getFinalDirection();
                        switch (d) {
                            case 0:
                                break;
                            case 1:
                                sendDirection("u_turn");
                                break;
                            case 2:
                                sendDirection("right_turn");
                                break;
                            case 3:
                                sendDirection("left_turn");
                                break;
                            default:
                                break;
                        }
                        leftDistance = dist;
                    }
                } catch (NumberFormatException e) {};
            } else {
                if(leftDistance != -1) {
                    sendDirection("destination");
                    leftDistance = (float) -1;
                }
            }
        }
    }

    public void mapImageProcess(Bitmap bitmap) {
        String img = "";
        for(int i = 0; i < 132; i++) {
            for(int j = 0; j < 132; j++) {
                float alpha = bitmap.getColor(j, i).alpha();
                img +=  (alpha < 1 ? "   " : alpha) + " ";
            }
            img += "\n";
        }
        Log.i("imgW", img);
    }

    public void sendMapInfo() {
        if (mapNotification != null) {
            Intent intent = new Intent("map_update");
            intent.putExtra("distance", String.valueOf(mapNotification.extras.getParcelable("android.title", SpannableString.class)));
            intent.putExtra("direction", String.valueOf(mapNotification.extras.getParcelable("android.text", SpannableString.class)));
            intent.putExtra("meta", mapNotification.extras.getString("android.subText", "Meta"));
            sendBroadcast(intent);
        }
    }

    @Override
    public void onListenerDisconnected() {
        mediaSessionManager.removeOnMediaKeyEventSessionChangedListener(mediaListener);
        requestRebind(new ComponentName(this, CycleService.class));
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        super.onNotificationPosted(sbn);
        getMapInfo();
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn, RankingMap rankingMap, int reason) {
        super.onNotificationRemoved(sbn, rankingMap, reason);
    }
}