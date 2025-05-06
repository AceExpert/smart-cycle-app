import { settings } from ".";

import NativeCycleControl from "../specs/NativeCycleControl";

function saveAll() {
    NativeCycleControl.setSettings(JSON.stringify({
        force_sense: settings.force_sense.toString(),
        force: settings.force? "1" : "0",
        alarm: settings.alarm? "1" : "0",
        alarm_sense: settings.alarm_sense.toString(),
        speaker: settings.speaker? "1" : "0",
    }));
}

function setSettings(data) {
    let currentSettings = JSON.parse(data);
    console.log(currentSettings);
    if(currentSettings.force_sense)
        settings.force_sense = parseInt(currentSettings.force_sense);
    if(currentSettings.force)
        settings.force = !!parseInt(currentSettings.force);
    if(currentSettings.alarm)
        settings.alarm = !!parseInt(currentSettings.alarm);
    if(currentSettings.alarm_sense)
        settings.alarm_sense = parseInt(currentSettings.alarm_sense);
    if(currentSettings.speaker)
        settings.speaker = !!parseInt(currentSettings.speaker);
}

export {
    saveAll, setSettings
}