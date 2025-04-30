import { router, Stack } from "expo-router";

import { View, StyleSheet, Animated, ScrollView, Text, ImageBackground } from "react-native";

import SText from "../components/texts";
import SmartView from "../components/smartview";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { settings, account } from "../globalstates";

export default function Settings({...props}){

    return (
        <ScrollView style={[styles.column, {width: "100%"}]}>
            <Stack.Screen options={{headerTitle: "Settings", headerShown: false}}/>
            <View style={[styles.column, {width: "100%"}]}>
                <SText style={{paddingTop: "5%", paddingLeft: "3%", fontSize: 20}}>Account</SText>
                <View style={[styles.column, {padding: '3%', gap: 5}]}>                    
                    <View style={[styles.column, {backgroundColor: "white", borderRadius: 10}]}>
                        <View style={[styles.rowCenter, {padding: "2%", justifyContent: "space-between"}]}>
                            <View style={[styles.rowCenter, {height: "100%"}]}>
                                <ImageBackground 
                                    style={[{width: 40, aspectRatio: 1, borderRadius: "50%", overflow: "hidden"}]}
                                    source={{uri: 'https://cdn-icons-png.flaticon.com/512/11195/11195149.png'}}>
                                </ImageBackground>
                                <View style={[{paddingLeft: "5%"}]}>
                                    <SText>{account.name}</SText>
                                    <SText style={[{color: "purple", fontSize: 10}]}>{account.email}</SText>
                                </View>
                            </View>
                            <View style={[styles.rowCenter, {gap: 5}]}>
                                <MaterialIcons name="manage-accounts" style={{fontSize: 20, backgroundColor: "rgb(150, 0, 163)", color: "white", borderRadius: 5, padding: 8}}/>
                                <MaterialIcons name="logout" style={{fontSize: 20, backgroundColor: "black", color: "white", borderRadius: 5, padding: 8}}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.column, {backgroundColor: "white", borderRadius: 10}]}>
                        <View style={[styles.rowCenter, {padding: "2%", justifyContent: "space-between"}]}>
                            <View style={[styles.rowCenter, {height: "100%"}]}>
                                <View style={[styles.column]}>
                                    <SText style={{fontSize: 13, color: "rgb(100,100,100)"}}>Username</SText>
                                    <SText style={[{color: "purple", fontSize: 15}]}>{account.user}</SText>
                                </View>
                            </View>
                            <View style={[styles.rowCenter, {gap: 5}]}>
                                <MaterialIcons name="content-copy" style={{fontSize: 20, backgroundColor: "rgb(101, 0, 216)", color: "white", borderRadius: 5, padding: 8}}/>
                            </View>
                        </View>
                    </View>
                </View>
                <SText style={{paddingTop: "3%", paddingLeft: "3%", fontSize: 20}}>Settings</SText>
                <View style={[styles.columnCenter, {width: "100%", padding: "3%"}]}>
                    <View style={[{width: "100%", backgroundColor: "white", borderRadius: 10, borderWidth: 1, borderColor: "rgba(54, 54, 54, 0.0)", borderStyle: "solid", boxShadow: "0px 0px 20px 2px rgba(0, 0, 0, 0.04)"}]}>
                        <SmartView style={[{borderRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}]}>
                            <View style={[styles.settingButton, styles.column]}>
                                <SText>Auto Lock & Unlock</SText>
                                <SText style={[styles.description]} onTouchEnd={() => router.navigate('./settings/lock')}>Configure cycle lock</SText>
                            </View>
                        </SmartView>
                        <SmartView style={[{borderRadius: 0}]} onTouchEnd={() => router.navigate('./settings/force')}>
                            <View style={[styles.settingButton, styles.column]}>
                                <SText>Force Gestures</SText>
                                <SText style={[styles.description]}>Configure force sensor activity</SText>
                            </View>
                        </SmartView>

                        <SmartView style={[{borderRadius: 0}]}>
                            <View style={[styles.settingButton, styles.column]}>
                                <SText>Haptic Navigation</SText>
                                <SText style={[styles.description]}>Configure haptic navigation settings</SText>
                            </View>
                        </SmartView>

                        <SmartView style={[{borderRadius: 0}]} onTouchEnd={() => router.navigate('./settings/motion')}>
                            <View style={[styles.settingButton, styles.column]}>
                                <SText>GPS & Intruder Detection</SText>
                                <SText style={[styles.description]}>Configure motion sensor sensitivity</SText>
                            </View>
                        </SmartView>

                        <SmartView style={[{borderRadius: 0}]} onTouchEnd={() => router.navigate('./settings/sound')}>
                            <View style={[styles.settingButton, styles.column]}>
                                <SText>Music & Entertainment</SText>
                                <SText style={[styles.description]}>Setup bluetooth speaker and Soundboard</SText>
                            </View>
                        </SmartView>

                        <SmartView style={[{borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
                            <View style={[styles.settingButton, {borderBottomWidth: 0}, styles.column]}>
                                <SText>Social Network</SText>
                                <SText style={[styles.description]}>Manage social network privacy</SText>
                            </View>
                        </SmartView>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        color: "grey"
    }
})