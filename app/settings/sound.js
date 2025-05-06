import { useCallback, useEffect, useRef, useState } from "react";

import { Stack } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";

import { 
    ScrollView, View, Text, Animated, 
    StyleSheet, PanResponder, useAnimatedValue, 
    Dimensions, Easing, DeviceEventEmitter} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import SText from "../../components/texts";
import SmartView from "../../components/smartview";
import Switch from "../../components/switch";
import Slider from "../../components/slider";

import SpeakerChooser from "../../popups/speakers";

import { resolveBtAddress } from "../../utils";

import {settings} from "../../globalstates"

import NativeCycleControl from "../../specs/NativeCycleControl"

export default function SoundSettings({...props}) {

    let [active, setActive] = useState(settings.speaker);
    let [speakerName, setSpeaker] = useState(settings.speakerName);
    let [speakerAddr, setSpeakerAddr] = useState(settings.speakerAddr);

    let [speakerChooserInfo, setSpeakerInfo] = useState([]);
    let [discovering, setDisc] = useState(false);
    let [discComplete, setDiscComplete] = useState(false);

    let savePop = useAnimatedValue(0);

    let savePopShow = yes => {
        Animated.timing(savePop, {
            toValue: yes? -100 : 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    let setupSpeaker = () => {
        NativeCycleControl.setupSpeaker();
    }

    let speakerChoice = data => {
        if(!data) {
            setDisc(false);
            setSpeakerInfo([]);
        } else {
            NativeCycleControl.connectSpeaker(data.split(":").map(v => parseInt(v, 16)));
        }
    }

    useEffect(() => {
        DeviceEventEmitter.addListener("speakerDiscovery", evt => {
            if(evt.data) {
                setSpeakerInfo([]);
                setDisc(true);
                setDiscComplete(false);
            } else {
                setDiscComplete(true);
            }
        });
        DeviceEventEmitter.addListener("speakerDiscoveryResult", evt => {
            for(let speaker of speakerChooserInfo) {
                if(speaker[1] === resolveBtAddress(evt.address)) {
                    if(evt.rssi > speaker[2]) {
                        speaker[2] = evt.rssi;
                        setSpeakerInfo(speakerChooserInfo);
                    }
                    return;
                }
            }
            speakerChooserInfo = [...speakerChooserInfo, [evt.name, resolveBtAddress(evt.address), evt.rssi]]
            setSpeakerInfo(speakerChooserInfo);
        });
    }, []);

    return (
        <View style={[styles.column, {width: "100%", height: "100%"}]}>

            <Animated.View style={{position: "absolute", zIndex: 1, bottom: -100, transform: [{translateY: savePop}], alignSelf: "center", width: "100%"}}>
                <View style={[styles.rowCenter, {width: "100%", padding: "5%", gap: "1%"}]}>
                    <SmartView style={[{flex: 2}]} onTouchEnd={() => {
                        settings.speaker = active;
                        savePopShow(false)
                    }}>
                        <View style={[styles.rowCenter, {height: "100%", backgroundColor: "rgb(194, 89, 255)", justifyContent: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, boxShadow: "-0px 10px 20px 0px rgba(0,0,0,.08)"}]}>
                            <MaterialIcons name="check" style={{color: "white", fontSize: 25}}/>
                        </View>
                    </SmartView>
                    <View style={[styles.column, {flex: 5, paddingTop: "2.5%", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "2.5%", backgroundColor: "white", boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.06)", borderRadius: 0}]}>
                        <View style={[{width: "100%", justifyContent: "center"}, styles.rowCenter]}>
                            <SText style={[{fontSize: 18}]}>Save Changes</SText>
                        </View>
                    </View>
                    <SmartView style={[{flex: 2}]} onTouchEnd={() => {
                        savePopShow(false);
                        setActive(settings.speaker);
                    }}>
                    <View style={[styles.rowCenter, {flex: 2, height: "100%", backgroundColor: "rgb(167, 0, 14)", justifyContent: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10, boxShadow: "-0px 10px 20px 0px rgba(0,0,0,.08)"}]}>
                        <MaterialIcons name={"close"} style={{color: "white", fontSize: 25}}/>
                    </View>
                    </SmartView>
                </View>
            </Animated.View>
            
            <View style={[styles.columnCenter, {width: "100%", height: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "rgba(0, 0, 0, 0.23)", zIndex: 2, display: discovering? "flex" : "none"}]}>
                <View style={[styles.columnCenter, {width: "100%", padding: "5%", paddingTop: "20%"}]}>
                    <SpeakerChooser speakerInfo={speakerChooserInfo} onResult={speakerChoice} complete={discComplete} retry={setupSpeaker}/>
                </View>
            </View>

            <View style={[styles.column, {width: "100%", paddingTop: 0}]}>
                <View style={[styles.rowCenter, {width: "100%", justifyContent: "center", padding: 10, paddingTop: 20, backgroundColor: "white"}]}>
                    <SText style={[{fontSize: 20}]}>Music & Entertainment</SText>
                </View>
            </View>
            <ScrollView style={[styles.column, {width: "100%"}]}>
                <Stack.Screen options={{headerTitle: "Force Gestures", headerShown: false}}/>
                <View style={[styles.columnCenter, {width: "100%"}]}>
                    <View style={[styles.column, {width: "100%", padding: "3%"}]}>
                        
                        <View style={[styles.column, {width: "100%", gap: 5}]}>
                            <View style={[styles.rowCenter, styles.settingsChip, {justifyContent: "space-between"}]}>
                                <SText style={[styles.settingsMain]}>Active</SText>
                                <Switch defaultValue={settings.speaker} onClick={val => {
                                    setActive(val);
                                    savePopShow(true);
                                }}/>
                            </View>
                            <View style={[styles.column, {width: "100%", borderRadius: 10, gap: 2, position: "relative", boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.00)", overflow: "hidden"}]}>
                                
                                <View style={[styles.rowCenter, {width: "100%", justifyContent: "space-between", gap: 5, boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.03)"}]}>
                                    <View style={[styles.column, {gap: 0, flex: 4}]}>
                                        <View style={[{backgroundColor: "black", borderRadius: 5, padding: "5%", gap: 4, boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.05)", borderColor: "rgba(0,0,0,0.5)", borderWidth: 0., borderTopLeftRadius: 10}, styles.column]}>
                                            <SText style={{fontSize: 17, color: "white"}}>Speaker</SText>
                                            <SText style={[{color: "rgba(255, 255, 255, 0.64)", fontSize: 11, display: speakerAddr? "none" : "flex"}]}>Setup Now</SText>
                                        </View>
                                        <View style={[styles.rowCenter, {backgroundColor: "white", padding: "3%", borderRadius: 5, display: "none"}, {justifyContent: "center"}]}>
                                        </View>
                                    </View>
                                    <SmartView style={[{flex: 3, height: "100%", width: "100%"}, styles.rowCenter]} onTouchEnd={() => {
                                        setupSpeaker();
                                    }}>
                                        <View style={[{backgroundColor: "purple", height: "100%", width: "100%", justifyContent: "center", borderRadius: 5, boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)"}, styles.rowCenter]}>
                                            <SText style={{fontSize: 15, padding: "2%", color: "white"}}>{speakerAddr? "Re-setup" : "Setup"}</SText>
                                        </View>
                                    </SmartView>
                                </View>
                                <View style={{width: "100%", height: 0, backgroundColor: "rgba(61, 61, 61, 0)"}}></View>
                                <View style={[styles.column, {display: speakerAddr? "flex" : "none", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "2.5%", paddingTop: "2.5%", borderRadius: 5, width: "100%", gap: 7, backgroundColor: "white"}]}>
                                    {
                                    <View style={{width: "100%"}}>
                                        <View style={[styles.rowCenter, {justifyContent: "space-between", width: "100%"}]}>
                                            <SText style={{fontSize: 13, color: "rgb(100,100,100)"}}>Name</SText>
                                            <SText style={{fontSize: 13, color: "rgb(56, 56, 56)"}}>{speakerName}</SText>
                                        </View>
                                        <View style={[styles.rowCenter, {justifyContent: "space-between", width: "100%"}]}>
                                            <SText style={{fontSize: 13, color: "rgb(100,100,100)"}}>Address</SText>
                                            <SText style={{fontSize: 13, color: "rgb(56, 56, 56)"}}>{speakerAddr}</SText>
                                        </View>
                                    </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row"
    },
    rowCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    column: {
        display: "flex",
        flexDirection: "column"
    },
    columnCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    settingButton: {
        width: "100%",
        paddingTop: "4%",
        paddingBottom: "4%",
        paddingLeft: "3%",
        paddingRight: "3%",
        borderBottomColor: "rgba(92, 92, 92, 0.34)",
        borderBottomWidth: 0.4,
    },

    description: {
        fontWeight: 300,
        fontSize: 10,
        color: "grey",
    },

    settingsMain: {
        fontSize: 18,
    },
    
    settingsChip: {
        padding: "2%",
        width: "100%"
    },
    
    settingsLittle: {
        fontWeight: 300,
        fontSize: 17,
        color: "rgba(0, 0, 0, 0.73)",
    }
})