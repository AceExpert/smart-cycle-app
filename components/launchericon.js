import { Component, useState } from "react";

import { View, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActionCard from "./actioncard";
import SmartView from "./smartview";

import SText from "./texts";

export default function LauncherIcon({IconClass = MaterialIcons, ...props}) {

    let [touch, setTouch] = useState(false);
  
    return (
        <View style={[styles.column, {alignItems: "center", gap: 3, justifyContent: "center"}, props.rStyle]}> 
            <SmartView 
                touchFeedback={false} 
                link={props.link}
                onTouchStart={() => {
                    setTouch(true)
                }}
                onTouchEnd={() => {
                    setTouch(false)
                }}
            >
                <ActionCard style={[props.style, {backgroundColor: touch? 'rgb(200, 200, 200)': props.style?.backgroundColor ?? 'white', display: "flex", alignItems: "center", justifyContent: "center"}]}>
                    <IconClass name={props.icon} size={35} style={[styles.mainIcon, styles.lightBorder, props.iconStyle]}/>
                </ActionCard>
            </SmartView>
            <SText style={[styles.iconText]}>{props.name}</SText>
        </View>
    )
}
  
const styles = StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
    },
    iconText: {
        fontSize: 10,
        color: "grey"
    },  
    lightBorder: {
        borderWidth: 0.0, 
        borderColor: "grey", 
    },
    mainIcon: {
        borderRadius: 100, 
        padding: 4
    },
})