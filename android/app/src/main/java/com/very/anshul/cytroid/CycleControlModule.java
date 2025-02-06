package com.very.anshul.cytroid;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class CycleControlModule extends ReactContextBaseJavaModule {

    ReactApplicationContext ctx;

    public CycleControlModule(ReactApplicationContext context) {
        super(context);
        ctx = context;
    }

    @Override
    @NonNull
    public String getName() {
        return "CycleControl";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isMediaActive() {
        return false;
    }

    @ReactMethod
    public void mediaPlay() {

    }

    @ReactMethod
    public void mediaPause() {

    }

    @ReactMethod
    public void mediaToggle() {

    }

    @ReactMethod
    public void mediaNext() {

    }

    @ReactMethod
    public void mediaPrev() {

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getMediaInfo() {
        return null;
    }

    @ReactMethod
    public void setVolume(double vol) {

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getVolume() {
        return 0;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getSeek() {
        return 0;
    }

    @ReactMethod
    public void setSeek(double seek) {

    }

    @ReactMethod
    public void onCycleConnect(Callback callback) {

    }

    @ReactMethod
    public void onCycleDisconnect(Callback callback) {

    }

    @ReactMethod
    public void onSpeakerConnect(Callback callback) {

    }

    @ReactMethod
    public void onSpeakerDisconnect(Callback callback) {

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSpeakerName() {
        return "";
    }

    @ReactMethod
    public void connectCycleSpeaker() {

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isMute() {
        return false;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isCycleSpeakerConnected() {
        return false;
    }

    @ReactMethod
    public void onVoIPConnect(Callback callback) {

    }

    @ReactMethod
    public void onVoIPDisconnect(Callback callback) {

    }

    @ReactMethod
    public void onVoIPMute(Callback callback) {

    }

    @ReactMethod
    public void onVoIPUnmute(Callback callback) {

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isVoIPactive() {
        return false;
    }

    @ReactMethod
    public void connectVoIP() {

    }

    @ReactMethod
    public void disconnectVoIP() {

    }

    @ReactMethod
    public void VoIPMute() {

    }

    @ReactMethod
    public void VoIPUnmute() {

    }

}
