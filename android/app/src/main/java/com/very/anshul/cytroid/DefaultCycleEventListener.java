package com.very.anshul.cytroid;

import com.cytroid.NativeCycleControlModule;

public class DefaultCycleEventListener implements NativeCycleControlModule.CycleEventListener {
    @Override
    public void onCycleLock(boolean locked) {

    }

    @Override
    public void onGPSConnect(boolean connected) {

    }

    @Override
    public void muteVOIP(boolean muted) {

    }

    @Override
    public void leaveVOIP(boolean left) {

    }

    @Override
    public void voipServerConnected(boolean connected) {

    }

    @Override
    public void mediaUpdate(String name, String cover, String artist, long duration) {

    }

    @Override
    public void speakerResult(String name, byte[] address, int rssi) {

    }

    @Override
    public void onSpeakerDiscovery(boolean started) {

    }

    @Override
    public void onSpeakerPaired(boolean paired) {

    }

    @Override
    public void getSettings(String settings) {

    }

    @Override
    public void cycleServiceActive() {

    }

    @Override
    public void mapUpdate(String distance, String direction, String meta) {

    }
}
