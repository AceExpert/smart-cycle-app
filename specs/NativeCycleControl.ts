import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
    isMediaActive(callback: (active: boolean) => void): void;
    init(callback: () => void): void;
    mediaPlay(): void;
    mediaPause(): void;
    mediaToggle(): void;
    mediaNext(): void;
    mediaPrev(): void;
    getMediaInfo(callback: (obj: {name: string, artist: string, cover: string, splash: string}) => void): void;
    setVolume(vol: number): void;
    getVolume(): number;
    getSeek(): number;
    setSeek(seek: number): void;
    
    onCycleConnect(callback: () => void): void;
    onCycleDisconnect(callback: () => void): void;
    onSpeakerConnect(callback: () => void): void;
    onSpeakerDisconnect(callback: () => void): void;

    getSpeakerName(): string;
    connectCycleSpeaker(): void;
    isCycleSpeakerConnected(): boolean;

    onVoIPConnect(callback: () => void): void;
    onVoIPDisconnect(callback: () => void): void;
    onVoIPMute(callback: () => void): void;
    onVoIPUnmute(callback: () => void): void;
    
    isVoIPactive(): boolean;
    connectVoIP(): void;
    disconnectVoIP(): void;
    VoIPMute(): void;
    VoIPUnmute(): void;

    openNotificationAccess(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeCycleControl");