import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";

import { View, StyleSheet, ScrollView, Text, Image, TextInput, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SText from "../components/texts";

import { account } from "../globalstates";

import Icon from "../assets/images/icon.png";

export default function LoginPage({...props}) {
    return (
        <View style={[styles.columnCenter, {width: "100%", height: "100%"}]}>
            <Stack.Screen options={{headerShown: false}}/>
            <LinearGradient 
                style={{position: "absolute", top: 0, left: 0, width: "100%", height: Dimensions.get("window").height}}
                colors={['rgb(252, 243, 255)', 'rgba(254, 242, 255, 0.58)', 'rgba(218, 245, 255, 0.45)', 'rgb(255, 251, 240)', 'rgb(255, 255, 255)']}
                /*colors={['rgb(245, 245, 245)', 'rgb(245, 245, 245)']}*/
                /*colors={['rgb(255, 255, 255)', 'rgb(255, 255, 255)']}*/
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            />
            <View style={[styles.column, {width: "100%", height: "100%"}]}>
                <View style={[styles.column, {width: "100%", padding: "3%", height: "100%"}]}>
                    <View style={[styles.columnCenter, styles.logoView, {position: "absolute", alignSelf: "center", top: 10}]}>
                        <View style={[styles.columnCenter, {gap: 5}]}>
                            <Image source={Icon} style={[{aspectRatio: 1, alignSelf: "center", height: 100}]}/>
                            <View style={[styles.columnCenter, {gap: 0}]}>
                                <View style={[styles.rowCenter, {gap: 2}]}>
                                    <SText style={{fontSize: 25, paddingLeft: 0, color: "purple"}}>S</SText>
                                    <SText style={[{letterSpacing: 3, fontSize: 25, color: "purple"}]}>ayutel</SText>
                                </View>
                                <View style={[styles.rowCenter, {gap: 10}]}>
                                    <SText style={{fontSize: 50, paddingLeft: 10}}>C</SText>
                                    <SText style={[{letterSpacing: 20, fontSize: 50, color: "grey"}]}>YTROID</SText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.column, {width: "100%", height: "100%", justifyContent: "center"}]}>
                        <View style={[styles.column, {gap: 5, paddingTop: "0%", paddingBottom: "0%"}]}>
                            <View style={[styles.column, styles.inputHolder, {borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}>
                                <SText>Email or username</SText>
                                <View style={[styles.inputCon]}>
                                    <TextInput style={[styles.input]} />
                                </View>
                            </View>

                            <View style={[styles.column, styles.inputHolder, {borderTopLeftRadius: 5, borderTopRightRadius: 5}]}>
                                <SText style={{display: "flex"}}>Password</SText>
                                <View style={[styles.inputCon]}>
                                    <TextInput style={[styles.input]} secureTextEntry={true}/>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.column, {gap: 10, paddingTop: 20}]}>
                            <View style={[styles.loginButton, styles.rowCenter]}>
                                <SText style={{color: "white"}}>Login</SText>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.columnCenter, {position: "absolute", alignSelf: "center", bottom: 0}]}>
                        <View style={[styles.columnCenter, {gap: 0}]}>
                            <SText style={{fontSize: 15, paddingLeft: 0, color: "grey"}}>from</SText>
                            <View style={[styles.rowCenter, {gap: 2}]}>
                                <SText style={{fontSize: 25, paddingLeft: 0, color: "purple"}}>S</SText>
                                <SText style={[{letterSpacing: 3, fontSize: 25, color: "purple"}]}>ayutel</SText>
                            </View>
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
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        borderRadius: 10,
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.0)",
        borderWidth: 0.,
    },

    input: {
        fontSize: 17,
        width: "100%",
        fontFamily: "SamsungSharpSans-Bold",
    },

    inputCon: {
        backgroundColor: 'rgb(230, 230, 230)',
        borderRadius: 5,
        padding: 15,
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.0)",
        borderWidth: 0.,
        borderColor: "rgba(77, 77, 77, 0.62)",

    },
    loginButton: {
        padding: 10,
        backgroundColor: "rgb(0, 0, 0)",
        justifyContent: "center",
        borderRadius: 5,
    },
    inputHolder: {
        gap: 5, 
        backgroundColor: "rgba(255, 255, 255, 0.87)", 
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5, 
        boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.)", 
        borderWidth: 0., 
        borderColor: "rgba(128, 128, 128, 0.49)"
    }
})