import { useState } from "react";

import { Text, View, StyleSheet, Animated } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import SText from "./texts";

export default function SoundCard({srno, name, artist, duration, trash, check, style, selected, playing, ...props}) {

    return (
        <View style={[styles.centerRow, {height: "auto", width: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, justifyContent: "space-between", borderBottomWidth: 0.5, borderBottomColor: "rgba(0, 0, 0, 0.6)", borderStyle: "dotted"}, style]}>
            <View style={{display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
                <SText style={{fontSize: 15, fontWeight: 300}}>{srno}</SText>
                <View style={[styles.column, {height: "auto", justifyContent: "space-evenly", paddingTop: 0, paddingBottom: 0}]}>
                    <SText style={{fontSize: 14, fontWeight: 600}}>{name}</SText>
                    <View style={{display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <SText style={{fontSize: 12, fontWeight: 400, color: "grey"}}>{artist}</SText>
                        <View style={{width: 0.5, backgroundColor: "rgba(80, 80, 80, 0.5)", height: "100%"}}></View>
                        <View style={{display: "flex", flexDirection: "row", gap: 2, alignItems: "center"}}>
                            <Ionicons name={"timer-sharp"} size={12}/>
                            <SText style={{fontSize: 12, fontWeight: 600, color: "rgba(0, 0, 0, 0.8)"}}>{duration}</SText>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: 5, gap: 20}}>
                {trash === false? null : <FontAwesome name="trash" size={18} style={{color: "darkred"}}/>}
                {check === false? null : <FontAwesome name="check" size={18} style={{color: selected? "purple" : "rgba(140, 140, 140, 0.5)"}}/>}
                <AntDesign name={playing? "pause" : "play"} size={18}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    centerRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})