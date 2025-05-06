import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";

import { View, StyleSheet, ScrollView, Text, Image, TextInput } from "react-native";

import SText from "../components/texts";

import { account } from "../globalstates";

import Icon from "../assets/images/icon.png";

export default function LoginPage({...props}) {
    return (
        <View style={[styles.columnCenter, {width: "100%"}]}>
            <Stack.Screen options={{headerShown: false}}/>
            <View style={[styles.column, {width: "100%"}]}>
                <View style={[styles.column, {width: "100%", padding: "3%"}]}>
                    <View style={[styles.columnCenter, styles.logoView]}>
                        <View style={[styles.rowCenter, {gap: 5}]}>
                            <Image source={Icon} style={[{width: 50, aspectRatio: 1}]}/>
                            <SText style={{fontSize: 40, paddingLeft: 10}}>C</SText>
                            <SText style={[{letterSpacing: 15, fontSize: 40, color: "grey"}]}>YTROID</SText>
                        </View>
                    </View>

                    <View style={[styles.column, {gap: 10, paddingTop: "10%", paddingBottom: "0%"}]}>
                        <View style={[styles.column, {gap: 5, backgroundColor: "transparent", padding: 0, borderRadius: 5, boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.0)", borderWidth: 0, borderColor: "black"}]}>
                            <SText>Email or username</SText>
                            <View style={[styles.inputCon]}>
                                <TextInput style={[styles.input]} placeholder="you@sayutel.com"/>
                            </View>
                        </View>

                        <View style={[styles.column, {gap: 5, backgroundColor: "transparent", padding: 0, borderRadius: 5, boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.0)", borderWidth: 0, borderColor: "black"}]}>
                            <SText>Password</SText>
                            <View style={[styles.inputCon]}>
                                <TextInput style={[styles.input]} placeholder="Password"/>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.column, {gap: 10, paddingTop: 20}]}>
                        <View style={[styles.loginButton, styles.rowCenter]}>
                            <SText style={{color: "white"}}>Login</SText>
                        </View>
                    </View>
                </View>
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

    logoView: {
        width: "100%",
        justifyContent: "center",
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 10,
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.0)",
        borderWidth: 0,
    },

    input: {
        fontSize: 17,
        width: "100%",
        fontFamily: "SamsungSharpSans-Bold"
    },

    inputCon: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 5,
        padding: 15,
        boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0)",
        borderWidth: 0,
        borderColor: "rgba(0, 0, 0, 0.35)",

    },
    loginButton: {
        padding: 10,
        backgroundColor: "purple",
        justifyContent: "center",
        borderRadius: 5
    }
})