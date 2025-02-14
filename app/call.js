import { Component } from "react";
import { Stack } from "expo-router";

import { ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import CallCard, { ActionIconType1 } from "../components/callcard";

export default class CallView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.screenWidth = Dimensions.get('screen').width
        this.state = {}
    }

    render = () => 
        <View style={[{width: "100%", height: "100%", display: "flex", flexDirection: "column"}]}>
            <Stack.Screen options={{headerShown: false}} />
            <View style={[{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 25, alignItems: "center", justifyContent: "center"}]}>
                <View style={[{width: "100%", display: "flex", flexDirection: "column-reverse", gap: 10}]}>
                    <View style={[{width: "100%", paddingRight: 25, paddingBottom: 30}]}>
                        
                        <View style={[styles.memberCard]}>
                            <ScrollView style={{display: "flex", width: "100%", flexDirection: "column", gap: 0, maxHeight: 300}}>
                                <CallCard online = {true} joined = {true} muted={false}/>
                                <CallCard 
                                    name = {"Anshul"} 
                                    avatar = {'https://cdn-icons-png.flaticon.com/512/6997/6997662.png'} 
                                    sideColor = {'purple'}
                                    online = {true}
                                />
                                <CallCard 
                                    name = {"Sayu"} 
                                    avatar = {'https://cdn-icons-png.freepik.com/512/168/168720.png'} 
                                    sideColor = {'dodgerblue'}
                                    online = {true}
                                    muted = {false}
                                    joined = {true}
                                />
                                <CallCard 
                                    name = {"Gabriella"} 
                                    avatar = {'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-9.png'} 
                                    sideColor = {'orange'}
                                    online = {false}
                                    muted = {false}
                                    joined = {false}
                                    style = {{borderBottomWidth: 0}}
                                />
                            </ScrollView>
                        </View>

                    </View>
                    <View style={[{width: "100%", display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center"}]}>
                        <ActionIconType1 latch={'right'} leftPad={8} mainPad={10} text={'Members'}/>
                        <View style={[{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}]}>
                            <ActionIconType1 latch={'left'} mainPad={10} leftPad={6} iconName={'group-add'} IconClass={MaterialIcons} iconSize={25}/>
                            <ActionIconType1 latch={'center'} mainPad={10} iconName={'settings'} IconClass={MaterialIcons} iconSize={25}/>
                        </View>
                    </View>
                    <View style={[{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", marginBottom: 10, alignItems: "center"}]}>
                        <View style={[{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 10}]}>
                        <ActionIconType1 latch={'right'} mainPad={10} text={'Cupertino Dreams'}/>
                            <ActionIconType1 mainPad={7} iconName={'exit'} IconClass={Ionicons} iconSize={23} iconColor={"darkred"}/>
                            <ActionIconType1 mainPad={7} iconName={'settings'} IconClass={MaterialIcons} iconSize={23}/>
                        </View>
                    </View>
                    <View style={[{display: "flex", flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10}]}>
                        <ActionIconType1 latch={'left'} mainPad={10} text={'Group'}/>
                        <ActionIconType1 mainPad={7} iconName={'caretleft'} IconClass={AntDesign} iconSize={23}/>
                        <ActionIconType1 mainPad={7} iconName={'caretright'} IconClass={AntDesign} iconSize={23}/>
                        <ActionIconType1 mainPad={7} iconName={'exchange'} IconClass={FontAwesome} iconSize={23}/>
                        <ActionIconType1 mainPad={7} iconName={'lock'} IconClass={MaterialIcons} iconSize={23}/>
                        <ActionIconType1 mainPad={7} iconName={'ellipsis-vertical'} IconClass={Ionicons} iconSize={23}/>
                    </View>
                </View>
                <View style={[{width: "100%", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center"}]}>
                    <ActionIconType1 latch={'left'} mainPad={10} height={30} width={220} radius={0} style={{alignSelf: "flex-start", borderTopRightRadius: 17, backgroundColor: "rgb(255, 0, 55)"}}/>
                    <ActionIconType1 latch={'right'} mainPad={10} height={30} width={130} radius={0} style={{alignSelf: "flex-end", borderTopLeftRadius: 17, backgroundColor: "lightgreen"}}/>
                    <ActionIconType1 latch={'left'} mainPad={10} height={30} width={150} radius={0} style={{alignSelf: "flex-start", borderBottomRightRadius: 17, backgroundColor: "gold"}}/>
                    <ActionIconType1 latch={'right'} mainPad={10} height={30} width={200} radius={0} style={{alignSelf: "flex-end", borderBottomLeftRadius: 17, backgroundColor: "dodgerblue"}}/>
                    <View style={[{width: "100%", height: 65, alignSelf: "center", position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 2}]}>
                        <View style={[{width: 65, height: "50%", display: "flex", flexDirection: "row", gap: 2}]}>
                            <View style={[{width: "50%", height: "100%", backgroundColor: "rgb(34, 0, 54)" || "skyblue", borderTopLeftRadius: "10%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderRightWidth: 0, borderColor: "dodgerblue"}]}></View>
                            <View style={[{width: "50%", height: "100%", backgroundColor: "rgb(34, 0, 54)", borderTopRightRadius: "10%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderBottomWidth: 0, borderColor: "gold"}]}></View>
                        </View>
                        <View style={[{width: 65, height: "50%", display: "flex", flexDirection: "row", gap: 2}]}>
                            <View style={[{width: "50%", height: "100%", backgroundColor: "rgb(66, 0, 104)" || "rgb(132, 189, 255)", borderBottomLeftRadius: "10%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderTopWidth: 0, borderColor: "lightgreen"}]}></View>
                            <View style={[{width: "50%", height: "100%", backgroundColor: "rgb(66, 0, 104)" || "skyblue", borderBottomRightRadius: "10%", elevation: 2, shadowColor: "rgba(0, 0, 0, .6)", borderLeftWidth: 0, borderColor: "rgb(255, 0, 55)"}]}></View>
                        </View>
                    </View>
                </View>
                <View style={{width: "100%", display: "flex", flexDirection: "column", paddingTop: 0}}>
                    <View style={{width: "100%", padding: 20, display: "flex", flexDirection: "column", gap: 10, alignItems: "center"}}>
                        <View style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 0, justifyContent: "center"}}>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center", position: "relative", left: 10, left: -20}}>
                                <View style={[styles.controlButton, {width: 180 || 140, height: 180 || 140, elevation: 0 ?? 10, shadowColor: 'rgba(216, 1, 144, 0.55)', borderWidth: 0, borderColor: 'rgba(100, 100, 100, 0.2)', backgroundColor: "rgb(34, 0, 54)"}]}>
                                    <MaterialIcons style={[{color: "white"}]} name={"mic-off"} size={50}/>
                                </View>
                                <Text style={[{fontSize: 15, color: "rgba(0, 0, 0, .5)"}]}>Unmute</Text>
                            </View>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center", zIndex: 5}}>
                                <View style={[styles.controlButton, {width: 150, height: 150, elevation: 0 ?? 15, shadowColor: 'rgba(132, 0, 194, 0.4)', borderWidth: 0.0, borderColor: 'rgba(100, 100, 100, 0.2)', boxShadow: "0px 0px 20px -10px rgba(0, 0, 0, 0.1)"}]}>
                                    <MaterialIcons style={[{}]} name={"call"} size={80}/>
                                </View>
                                <Text style={[{fontSize: 15, color: "rgba(0, 0, 0, .5)"}]}>Join</Text>
                            </View>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center", position: "relative", right: 7, right: -20}}>
                                <View style={[styles.controlButton, {width: 180 || 110, height: 180 || 110, elevation: 0 ?? 7, shadowColor: 'rgba(255, 0, 255, 0.62)', borderWidth: 0, borderColor: 'rgba(100, 100, 100, 0.2)', borderColor: "white", borderWidth: 15, backgroundColor: "transparent", boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.1)"}]}>
                                    <MaterialIcons style={[{}]} name={"pause"} size={35}/>
                                </View>
                                <Text style={[{fontSize: 15, color: "rgba(0, 0, 0, .5)"}]}>Hold</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

}

const styles = StyleSheet.create({
    memberCard: {
        backgroundColor: "white",
        borderRadius: 17,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: "100%",
        elevation: 10,
        shadowColor: "rgba(20, 20, 20, .4)",
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    controlButton: {
        width: 120,
        height: 120,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderWidth: 0,
        borderColor: 'rgba(100, 100, 100, 0.2)',
        elevation: 0,
        shadowColor: "rgba(0, 0, 0, .3)",
        borderRadius: "10%",
    }
})