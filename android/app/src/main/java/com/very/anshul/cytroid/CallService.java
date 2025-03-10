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
    String callName = null;
    String callNo = null;

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
                } else if (ongoingCall != null && ongoingCall.getDetails().getState() != Call.STATE_DISCONNECTED) {
                    ongoingCall.disconnect();
                }
            }
        }
    };

    public void sendCallInfo(boolean inCall, String no) {
        Intent intent = new Intent("call_state");
        intent.putExtra("call", inCall);
        intent.putExtra("phone", no);
        sendBroadcast(intent);
    };

    public void sendCallInfo(boolean inCall, String no, String name) {
        Intent intent = new Intent("call_state");
        intent.putExtra("call", inCall);
        intent.putExtra("name", name);
        intent.putExtra("phone", no);
        sendBroadcast(intent);
    };

    Call.Callback callCallback = new Call.Callback() {
        @Override
        public void onStateChanged(Call call, int state) {
            super.onStateChanged(call, state);
            if(state == Call.STATE_DISCONNECTED) {
                sendCallInfo(false, "", "");
                ongoingCall.unregisterCallback(callCallback);
                ongoingCall = null;
                callName = null;
                callNo = null;
            }
        }

        @Override
        public void onDetailsChanged(Call call, Call.Details details) {
            if(ongoingCall != null && (details.getState() != Call.STATE_DISCONNECTED || details.getState() != Call.STATE_DISCONNECTING)) {
                if(details.getContactDisplayName() != null) {
                    callName = details.getContactDisplayName();
                    callNo = details.getHandle().getSchemeSpecificPart();
                    sendCallInfo(true, callNo == null? "" : callNo, callName);
                }
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
        callNo = call.getDetails().getHandle().getSchemeSpecificPart();
        call.registerCallback(callCallback);
        sendCallInfo(true, callNo == null? "" : callNo);
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