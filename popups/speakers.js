import { useState, useEffect } from "react";

import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import SText from "../components/texts";
import SmartView from "../components/smartview";

export default function SpeakerChooser({speakerInfo, complete, onResult, retry, ...props}) {

    let [speakerChooserInfo, setSpeakerInfo] = useState(speakerInfo? speakerInfo?.map?.((v, i) => [...v, false]) : []);
    let [discComplete, setComplete] = useState(complete);

    useEffect(() => {
        setSpeakerInfo(speakerInfo? speakerInfo?.map?.((v, i) => [...v, false]) : [])
    }, [speakerInfo]);

    useEffect(() => {
        setComplete(complete)
    }, [complete]);

    return (
        <View style={[styles.column, styles.mainWindow, {width: "100%", backgroundColor: "white", gap: 5}]}>
            <View style={[{position: "absolute", top: 10, right: 10, borderRadius: "50%", padding: 5, backgroundColor: "purple", justifyContent: "center"}, styles.columnCenter, {display: discComplete? "flex" : "none"}]}>
                <SmartView onTouchEnd={() => retry?.()}>
                    <MaterialIcons name="refresh" size={20} color={"white"}/>
                </SmartView>
            </View>
            <SText style={{alignSelf: 'center', fontSize: 19}}>Speaker Discovery</SText>
            <View style={[styles.rowCenter, {width: "100%", gap: 5, justifyContent: "flex-start", paddingBottom: speakerInfo?.length? "0%" : "3%"}]}>
                <SText style={[{fontSize: 13, color: "rgba(0, 0, 0, 0.77)"}]}>{discComplete? 'Discovery Finished' : 'Discovering'}</SText>
                <ActivityIndicator size={"small"} color={"purple"} style={{display: discComplete? 'none' : undefined}}/>
            </View>
            <View style={[styles.column, {gap: 7, width: "100%", display: speakerInfo?.length? "flex" : "none"}]}>
                <SText style={{fontSize: 17}}>Select</SText>
                <ScrollView style={[styles.column, {width: "100%", maxHeight: 380}]} contentContainerStyle={{gap: 5}}>
                    {speakerChooserInfo?.sort?.((d1, d2) => d2[2] - d1[2]).map((d, i) => {
                        return (
                            <SmartView style={{width: "100%"}} onTouchEnd={() => {
                                speakerChooserInfo = speakerChooserInfo.map((v, ind) => {
                                    v[3] = (ind === i? true : false);
                                    return v;
                                });
                                setSpeakerInfo(speakerChooserInfo);
                            }} key={d[1]}> 
                                <SpeakerCard name={d[0]} address={d[1]} rssi={[d[2]]} selected={d[3]}/>
                            </SmartView>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={[styles.rowCenter, {gap: 5, paddingTop: 5}]}>
                <SmartView style={{flex: 1, display: speakerInfo?.length? "flex" : "none"}} onTouchEnd={() => {
                    let speaker = speakerChooserInfo.find(v => v[3]);
                    if(speaker)
                        onResult?.(speaker[1])
                    else {
                    }
                }}>
                    <View style={[styles.rowCenter, {flex: 1, borderRadius: 5, backgroundColor: "purple", justifyContent: "center", padding: 10}]}>
                        <SText style={{color: "white"}}>Pair</SText>
                    </View>
                </SmartView>
                
                <SmartView style={{flex: 1}} onTouchEnd={() => {
                    onResult?.(null);
                }}>
                    <View style={[styles.rowCenter, {borderRadius: 5, backgroundColor: "black", justifyContent: "center", padding: 10}]}>
                        <SText style={{color: "white"}}>Cancel</SText>
                    </View>
                </SmartView>
            </View>
        </View>
    )
}

export function SpeakerCard({name, rssi, address, selected = false}) {
    
    return (
        <View style={[styles.rowCenter, {backgroundColor: selected? "black" : "rgb(243, 236, 242)", padding: "2.3%", borderRadius: 5, justifyContent: "space-between"}]}>
            <View style={[styles.rowCenter, {gap: 7}]}>
                <MaterialIcons name="speaker" size={25} color={selected? "white" : "black"}/>
                <View style={[styles.column, {gap: 0}]}>
                    <SText style={{fontSize: 14, color: selected? "white" : "black"}}>{name}</SText>
                    <SText style={{fontSize: 11.5, color: selected? "rgba(255, 255, 255, 0.56)": "rgba(36, 36, 36, 0.33)"}}>{address}</SText>
                </View>
            </View>
            <View style={[styles.rowCenter]}>
                <MaterialIcons color={selected? "white" : "black"} name={rssi > -55 ? "network-wifi" : rssi > -75? "network-wifi-3-bar" : rssi > -85? "network-wifi-2-bar" : "network-wifi-1-bar"} size={20}/>
            </View>
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

    mainWindow: {
        padding: "3%",
        paddingBottom: "3%",
        borderRadius: 10,
        boxShadow: "0px 5px 20px 0px rgba(0,0,0,0.00)"
    }
})