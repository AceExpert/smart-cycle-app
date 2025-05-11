import { Component, useState } from "react";

import { View, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActionCard from "./actioncard";
import SmartView from "./smartview";

import SText from "./texts";

export default function LauncherIcon({IconClass = MaterialIcons, onClick, link, iconStyle, name, style, icon, ...props}) {

    let [touch, setTouch] = useState(false);
  
    return (
        <View style={[styles.column, {alignItems: "center", gap: 3, justifyContent: "center"}, props.rStyle]} {...props}> 
            <SmartView 
                touchFeedback={false} 
                link={link}
                onTouchStart={() => {
                    setTouch(true)
                }}
                onTouchEnd={() => {
                    setTouch(false)
                    onClick?.();
                }}
            >
                <ActionCard style={[style, {backgroundColor: touch? 'rgb(200, 200, 200)': props.style?.backgroundColor ?? 'white', display: "flex", alignItems: "center", justifyContent: "center"}]}>
                    <IconClass name={icon} size={30} style={[styles.mainIcon, styles.lightBorder, iconStyle]}/>
                </ActionCard>
            </SmartView>
            <SText style={[styles.iconText, {display: "flex", position: "absolute", bottom: -20, width: 100, textAlign: "center"}]}>{name}</SText>
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
        padding: 2
    },
})