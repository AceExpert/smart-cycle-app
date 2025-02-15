import React from "react";

import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const defaultPad = 26;

export default function Notification({title, content, children, type, iconBg, iconName, IconClass, iconColor, icon, actions, avatar, iconSize, style, ...others}) {
        
    return (
        <View style={[{display: "flex", flexDirection: "column", alignSelf: "flex-end", zIndex: 10, paddingRight: 0, gap: 5, borderRightWidth: 0, borderColor: "purple", position: "relative"}, ...(style?.constructor === Array? style : [style])]}>
          <View style={[{display: "flex", flexDirection: "row-reverse", gap: 3, alignItems: "center"}]}>
            <View style={{width: 20, display: "flex", flexDirection: "column", alignSelf: "flex-start", justifyContent: "space-between", gap: 2}}>
              <View style={[{width: "100%", height: 31, backgroundColor: "white", boxShadow: "0px 3px 15px 0px rgba(30, 30, 30, 0.1)", borderRadius: 11, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.7, alignItems: "center", justifyContent: "center"}]}>
                  {type === 'info'? <IconClass size={iconSize ?? 30} name={iconName} style={[{color: iconColor ?? "rgb(185, 0, 145)"}]}/> : null}
              </View>
              <View style={[{width: "100%", height: 25, backgroundColor: "white", boxShadow: "0px 8px 20px 3px rgba(30, 30, 30, 0.2)", borderRadius: 11, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.7}]}></View>
            </View>
            {title || content?
            <View style={[{display: "flex", flexDirection: "column", gap: 3, alignSelf: "center", width: "auto", alignItems: "center"}]}>
                {title?
                <View style={[styles.notif, {borderWidth: 0.5, borderRightWidth: 0.5, borderColor: "rgba(124, 124, 124, 0.27)", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, alignSelf: "flex-start"}]}>
                    <View style={[{padding: 6, display: "flex", flexDirection: "column"}]}>
                        <Text style={[{fontSize: 16, fontWeight: 800, paddingRight: 0}]}>{title}</Text> 
                    </View>
                </View> : null}
                {content?
                <View style={[styles.notif, {borderWidth: 0.5, borderRightWidth: 0.5, borderColor: "rgba(124, 124, 124, 0.27)", borderTopLeftRadius: 0, borderTopRightRadius: 0, alignSelf: "flex-start"}]}>
                    <View style={[{padding: 7, display: "flex", flexDirection: "column"}]}>    
                        <Text style={[{fontSize: 15, fontWeight: 400, paddingRight: 0}]}>{content}</Text>
                    </View>
                </View> : null}
            </View> :
            children
            }
            {avatar || type === 'call'?
            <View style={[{boxShadow: "0px 10px 15px 3px rgba(30, 30, 30, 0.1)", borderRadius: 10}]}>
                <ImageBackground
                    style={[{width: 55, height: 55, borderRadius: 10, overflow: "hidden"}]}
                    source={{uri: avatar ?? 'https://cdn-icons-png.freepik.com/512/168/168720.png'}}>
                </ImageBackground>  
            </View> : type === 'notification'?
            <View style={[{boxShadow: "0px 10px 15px 2px rgba(30, 30, 30, 0.1)", backgroundColor: iconBg ?? "white", padding: 12, borderRadius: 10}]}>
              <IconClass size={iconSize ?? 30} name={iconName} style={[{color: iconColor ?? "rgb(185, 0, 145)"}]}/>
            </View> : 
            icon
            }
          </View>
          {type === 'call' ?
          <View style={[{display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", paddingRight: defaultPad}]}>
              <View style={[{boxShadow: "0px 10px 15px 2px rgba(30, 30, 30, 0.2)", backgroundColor: "rgba(185, 0, 77, 0.9)", padding: 12, borderRadius: 10}]}>
                <MaterialIcons size={30} name="call-end" style={[{color: "white"}]}/>
              </View>
              <View style={[{boxShadow: "0px 10px 15px 2px rgba(30, 30, 30, 0.2)", backgroundColor: "rgba(0, 185, 56, 0.9)", padding: 12, borderRadius: 10}]}>
                <MaterialIcons size={30} name="call" style={[{color: "white"}]}/>
              </View>
          </View>:
          actions}
        </View>
    );
}

const styles = StyleSheet.create({
    notif: {
        backgroundColor: "white",
        borderRadius: 10, //0
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        overflow: "hidden",
        boxShadow: "3px 10px 15px 3px rgba(30, 30, 30, 0.1)", 
        borderRightWidth: 0, //4.5
        borderColor: "purple",
        maxWidth: 310,
        display: "flex",
        flexDirection: "column",
      },
})