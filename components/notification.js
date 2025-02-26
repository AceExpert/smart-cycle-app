import React from "react";

import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import SText from "./texts";

export const defaultPad = 22.5;

export default function Notification({title, content, children, type, iconBg, iconName, IconClass, iconColor, icon, actions, avatar, iconSize, style, ...others}) {
        
    return (
        <View style={[{display: "flex", flexDirection: "column", alignSelf: "flex-end", zIndex: 10, paddingRight: 0, gap: 2.5, borderRightWidth: 0, borderColor: "purple", position: "relative"}, ...(style?.constructor === Array? style : [style])]}>
          <View style={[{display: "flex", flexDirection: "row-reverse", gap: 2.5}]}>
            <View style={{display: "flex", flexDirection: "column", gap: 2.5}}>
                <View style={{display: "flex", flexDirection: "row-reverse", gap: 2.5}}>
                    <View style={[{width: 20, height: !title? 26 : undefined, backgroundColor: "white", boxShadow: "0px 3px 15px 0px rgba(30, 30, 30, 0.1)", borderRadius: 15, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.0 /*.7*/, borderWidth: 0, borderColor: "black", backgroundColor: "white", alignItems: "center", justifyContent: "center", boxShadow: "3px -5px 30px 5px rgba(110, 6, 180, 0.44)"}]}>
                        {type === 'info'? <IconClass size={iconSize ?? 30} name={iconName} style={[{color: iconColor ?? "rgb(185, 0, 145)"}]}/> : null}
                    </View>
                    {title?
                    <View style={[styles.notif, {borderWidth: 0.0 /*.5*/, borderColor: "rgba(124, 124, 124, 0.27)", borderBottomLeftRadius: 7, borderBottomRightRadius: 0, borderRadius: 15, borderTopLeftRadius: 0, alignSelf: "flex-start", boxShadow: "-6px -5px 30px 4px rgba(180, 6, 6, 0.22)"}]}>
                        <View style={[{padding: 6, display: "flex", flexDirection: "column"}]}>
                            <SText style={[{fontSize: 16, fontWeight: 800, paddingRight: 0}]}>{title}</SText> 
                        </View>
                    </View> : 
                    <View style={[{width: 20, height: "100%", backgroundColor: "white", boxShadow: "0px 8px 20px 3px rgba(30, 30, 30, 0.2)", borderRadius: 15, borderTopLeftRadius: 0, borderBottomLeftRadius: 7, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.0 /*.7*/, alignSelf: "flex-end", borderWidth: 0, borderColor: "black", backgroundColor: "white", boxShadow: "-6px -5px 30px 4px rgba(180, 6, 6, 0.28)"}]}></View>         
                    }
                </View>
              
                <View style={{display: "flex", flexDirection: "row-reverse", gap: 2.5, alignItems: "flex-start"}}>
                    <View style={[{width: 20, height: 26, backgroundColor: "white", boxShadow: "0px 8px 20px 3px rgba(30, 30, 30, 0.2)", borderRadius: 15, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.0 /*.7*/, boxShadow: "3px 5px 30px 5px rgba(6, 38, 180, 0.44)"}]}>
                    </View>
                    {content?
                    <View style={[styles.notif, {borderWidth: 0.0 /*.5*/, borderRightWidth: 0.0 /*.5*/, borderColor: "rgba(124, 124, 124, 0.27)", borderTopLeftRadius: type === 'call'? 15 : 7, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 15, minHeight: 25, boxShadow: "-5px 6px 25px 2px rgba(150, 0, 170, 0.15)"}]}>
                        <View style={[{padding: 7, display: "flex", flexDirection: "column"}]}>    
                            <SText style={[{fontSize: 15, fontWeight: 400, paddingRight: 0}]}>{content}</SText>
                        </View>
                    </View>
                    : 
                    <View style={[{width: 20, height: 25, backgroundColor: "white", boxShadow: "0px 8px 20px 3px rgba(30, 30, 30, 0.2)", borderRadius: 11, borderTopRightRadius: 0, borderBottomLeftRadius: 7, borderBottomRightRadius: 0, borderColor: "rgba(124, 124, 124, 0.27)", borderWidth: 0.0 /*.7*/, alignSelf: "flex-end"}]}></View>         
                    
                    }
                </View>
            </View>
            {avatar || type === 'call'?
            <View style={[{boxShadow: "0px 10px 15px 3px rgba(30, 30, 30, 0.1)", borderRadius: 25, alignSelf: "flex-end", borderTopLeftRadius: 0, borderBottomLeftRadius: 13, borderBottomRightRadius: 0, overflow: "hidden"}]}>
                <ImageBackground
                    style={[{width: 55, height: 55, borderRadius: 25, overflow: "hidden", borderTopLeftRadius: 0, borderBottomLeftRadius: 13, borderBottomRightRadius: 0, overflow: "hidden"}]}
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
          <View style={[{display: "flex", flexDirection: "row-reverse", gap: 2.5, alignSelf: "flex-start", paddingRight: defaultPad}]}>
              <View style={[{boxShadow: "0px 10px 15px 2px rgba(30, 30, 30, 0.2)", backgroundColor: "rgba(185, 0, 77, 0.9)", padding: 12, borderRadius: 15, borderTopLeftRadius: 0, borderBottomRightRadius: 0}]}>
                <MaterialIcons size={30} name="call-end" style={[{color: "white"}]}/>
              </View>
              <View style={[{boxShadow: "0px 10px 15px 2px rgba(30, 30, 30, 0.2)", backgroundColor: "rgba(0, 185, 56, 0.9)", padding: 12, borderRadius: 15, borderTopRightRadius: 0, borderBottomLeftRadius: 0}]}>
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