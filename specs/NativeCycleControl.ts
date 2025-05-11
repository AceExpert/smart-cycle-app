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
    setupSpeaker(): void;
    connectSpeaker(address: number[]): void;

    openMap(): void;

    getSpeakerName(): string;
    connectCycleSpeaker(): void;
    isCycleSpeakerConnected(): boolean;

    getCycleState(): void; 
    
    isVoIPactive(): boolean;
    connectVoIP(): void;
    disconnectVoIP(): void;
    VoIPMute(): void;
    VoIPUnmute(): void;

    openNotificationAccess(): void;

    setSettings(settings: string): void;
    getSettings(filename: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeCycleControl");