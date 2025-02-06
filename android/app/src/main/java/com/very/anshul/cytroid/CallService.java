package com.very.anshul.cytroid;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;
import android.telecom.Call;
import android.telecom.InCallService;
import android.telecom.VideoProfile;
import android.util.Log;

import java.util.Objects;

public class CallService extends InCallService {

    Call ongoingCall = null;

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(Objects.equals(intent.getAction(), "H_ANSWER_CALL")) {
                if(ongoingCall != null && ongoingCall.getDetails().getState() == Call.STATE_RINGING) {
                    ongoingCall.answer(VideoProfile.STATE_AUDIO_ONLY);
                };
            } else if (Objects.equals(intent.getAction(), "H_REJECT_CALL")) {
                if(ongoingCall != null && ongoingCall.getDetails().getState() == Call.STATE_RINGING) {
                    ongoingCall.reject(Call.REJECT_REASON_DECLINED);
                } else if (ongoingCall != null && ongoingCall.getDetails().getState() == Call.STATE_ACTIVE) {
                    ongoingCall.disconnect();
                }
            }
        }
    };

    public void sendCallInfo(boolean inCall) {
        Intent intent = new Intent("call_state");
        intent.putExtra("call", inCall);
        sendBroadcast(intent);
    };

    Call.Callback callCallback = new Call.Callback() {
        @Override
        public void onStateChanged(Call call, int state) {
            super.onStateChanged(call, state);
            if(state == Call.STATE_DISCONNECTED) {
                sendCallInfo(false);
                ongoingCall.unregisterCallback(callCallback);
                ongoingCall = null;
            }
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("H_ANSWER_CALL");
        intentFilter.addAction("H_REJECT_CALL");
        registerReceiver(broadcastReceiver, intentFilter, RECEIVER_EXPORTED);
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        return super.onBind(intent);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("call service", "started");
        return START_STICKY;
    }

    @Override
    public void onCallAdded(Call call) {
        super.onCallAdded(call);
        ongoingCall = call;
        call.registerCallback(callCallback);
        sendCallInfo(true);
        Log.i("in call", String.valueOf(call.getDetails().getContactDisplayName()));
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(broadcastReceiver);
        if(ongoingCall != null) {
            ongoingCall.unregisterCallback(callCallback);
        }
    }
}