import { Component } from "react";
import { Stack } from "expo-router";

import { ScrollView, Text, View, StyleSheet, Dimensions, Animated, Easing } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import CallCard, { ActionIconType1 } from "../components/callcard";
import SText from "../components/texts";

export default class CallView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.screenWidth = Dimensions.get('screen').width
        this.state = {
            butterflyAnim1: new Animated.Value(0),
            rev: true,
            wallAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.wallAnim()
        //this.wingAnimate()
    }

    wingAnimate() {
        Animated.loop(
            Animated.timing(this.state.butterflyAnim1, {
                toValue: this.state.butterflyAnim1._value === 25? -25 : 25,
                duration: 1500,
                useNativeDriver: true,
                easing: Easing.linear
            }), {iterations: -1}
        ).start()
    }

    wallAnim() {
        Animated.loop(
            Animated.timing(this.state.wallAnim, {
                toValue: 360,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }), {
                iterations: -1
            }
        ).start()
    }

    render = () => 
        <View style={[{width: "100%", height: "100%", display: "flex", flexDirection: "column"}]}>
            <Stack.Screen options={{headerShown: false}} />
            <View style={[{width: "100%", display: "flex", flexDirection: "column", gap: 25, alignItems: "center", justifyContent: "center", paddingTop: 50}]}>
                <View style={[{width: "100%", display: "flex", flexDirection: "column-reverse", gap: 3}]}>
                    <View style={[{width: "100%", paddingRight: 85, paddingBottom: 30, direction: "flex", flexDirection: "row", alignItems: "flex-start", gap: 3}]}>
                        
                        <View style={[styles.memberCard, {borderTopRightRadius: 0, borderBottomRightRadius: 30}]}>
                            <ScrollView style={{display: "flex", width: "100%", flexDirection: "column", gap: 0, maxHeight: 300}}>
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
                                    style = {{borderBottomWidth: 0}}
                                />
                            </ScrollView>
                        </View>
                        <ActionIconType1 latch={'center'} mainPad={10} iconName={'settings'} IconClass={MaterialIcons} iconSize={25} radius={23} style={{borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 18, boxShadow: "3px 3px 25px -3px rgba(123, 0, 238, 0.22)", backgroundColor: "rgb(34, 0, 54)"}} iconColor={"white"}/>

                    </View>
                    <View style={[{width: "100%", display: "flex", flexDirection: "row-reverse", /*justifyContent: "space-between",*/ gap: 3, alignItems: "flex-end"}]}>
                        <ActionIconType1 latch={'right'} leftPad={0} mainPad={9} text={'Members'} radius={20} style={{borderBottomLeftRadius: 0}}/>
                        <ActionIconType1 latch={'center'} mainPad={9} leftPad={0} iconName={'group-add'} IconClass={MaterialIcons} radius={23} iconSize={23} iconColor={"black" || "white"} style={{borderBottomRightRadius: 0, borderTopLeftRadius: 0, backgroundColor: "rgb(0, 95, 238)", backgroundColor: "white", borderBottomLeftRadius: 15, boxShadow: "-3px -3px 15px 0px rgba(0, 95, 238, 0.22)"}}/>
                        {/*<View style={[{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}]}>
                            <ActionIconType1 latch={'left'} mainPad={10} leftPad={6} iconName={'group-add'} IconClass={MaterialIcons} iconSize={25}/>
                            <ActionIconType1 latch={'center'} mainPad={10} iconName={'settings'} IconClass={MaterialIcons} iconSize={25}/>
                        </View>*/}
                    </View>
                    <View style={[{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", marginBottom: 10, alignItems: "center"}]}>
                        <View style={[{display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 3, justifyContent: "flex-end"}]}>
                            <ActionIconType1 latch={'left'} mainPad={9} text={'Our dreams'} style={{borderTopRightRadius: 30, borderBottomRightRadius: 0}}/>
                            <ActionIconType1 mainPad={7} iconName={'exit'} IconClass={Ionicons} iconSize={23} iconColor={"darkred"} radius={30} style={{borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 17}} iconStyle={[{position: "relative", right: -3}]}/>
                            <View style={{position: "absolute", top: -43, display: "flex", flexDirection: "row", gap: 3, alignItems: "flex-end", right: -64}}>
                        
                            </View>
                            <View style={{gap: 3, display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", position: "absolute", bottom: -43}}>
                                <ActionIconType1 mainPad={7} iconName={'ellipsis-vertical'} IconClass={Ionicons} iconSize={23} style={{borderTopLeftRadius: 0, borderBottomRightRadius: 0}} radius={20}/>
                                <ActionIconType1 mainPad={5} iconName={'settings'} IconClass={MaterialIcons} iconSize={23} style={{borderTopRightRadius: 0, borderBottomLeftRadius: 0, backgroundColor: "transparent", borderWidth: 3, borderColor: "white", elevation: 0, boxShadow: "-3px 3px 30px -5px rgba(255, 123, 0, 0.3)"}} radius={20}/>
                            </View>
                        </View>
                    </View>
                    <View style={[{display: "flex", flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 0, justifyContent: "flex-end", width: "100%"}]}>
                        <View style={{display: "flex", flexDirection: "row-reverse", gap: 3, position: "relative", left: 0, bottom: -0}}>
                            <ActionIconType1 latch={'right'} mainPad={10} text={'Group'} radius={20} leftPad={5} style={{borderTopLeftRadius: 30, borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}/>
                            <ActionIconType1 mainPad={7} iconName={'ellipsis-vertical'} IconClass={Ionicons} iconSize={23} style={{transform: [{rotateZ: "-0deg"}], borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 23}} radius={30} iconStyle={{transform: [{rotateZ: "0deg"}]}}/>
                            <View style={{gap: 3, display: "flex", flexDirection: "column", alignItems: "flex-start", position: "absolute", marginRight: 130, alignItems: "center", justifyContent: "center", top: -15}}>
                                <View style={{gap: 3, display: "flex", flexDirection: "row-reverse", alignItems: "flex-start"}}>
                                    <ActionIconType1 mainPad={11} iconName={'exchange'} IconClass={FontAwesome} iconSize={32} style={{transform: [{rotateZ: "-0deg"}], borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 30}} radius={40} iconStyle={{transform: [{rotateZ: "0deg"}]}}/>
                                    <ActionIconType1 mainPad={11} iconName={'lock-open'} IconClass={MaterialIcons} iconSize={32} style={{transform: [{rotateZ: "-0deg"}], borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 30}} radius={40} iconStyle={{transform: [{rotateZ: "0deg"}]}}/>
                                </View>
                                <View style={{gap: 3, display: "flex", flexDirection: "row-reverse", alignItems: "flex-start"}}>
                                    <ActionIconType1 mainPad={11} iconName={'caretright'} IconClass={AntDesign} iconSize={32} style={{transform: [{rotateZ: "0deg"}], borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30}} iconStyle={{transform: [{rotateZ: "-0deg"}]}} radius={40}/>
                                    <ActionIconType1 mainPad={11} iconName={'caretleft'} IconClass={AntDesign} iconSize={32} style={{transform: [{rotateZ: "-0deg"}], borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: 30, backgroundColor: "white", borderWidth: 0, borderColor: "white", elevation: 0, boxShadow: "-3px 3px 20px 0px rgba(49, 49, 49, 0.1)"}} iconStyle={{transform: [{rotateZ: "0deg"}]}} radius={40}/>
                                </View>
                                {/*<View style={{display: "flex", flexDirection: "row", position: "absolute", width: "100%", alignSelf: "center", justifyContent: "center"}}>
                                    <View style={{borderRadius: "50%", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.0)", elevation: 10, shadowColor: "rgba(0, 0, 0, 0.3)"}}>
                                        <MaterialIcons name={"lock-open"} size={30} style={[{'color': "rgba(129, 129, 129, 0.42)"}]}/>
                                    </View>
                                </View>*/}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[{width: "100%", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center"}]}>
                    <ActionIconType1 latch={'left'} mainPad={10} height={30} width={220} radius={0} style={{alignSelf: "flex-start", borderTopRightRadius: 17, backgroundColor: "rgb(255, 0, 55)"}}/>
                    <ActionIconType1 latch={'right'} mainPad={10} height={30} width={130} radius={0} style={{alignSelf: "flex-end", borderTopLeftRadius: 17, backgroundColor: "lightgreen"}}/>
                    <ActionIconType1 latch={'left'} mainPad={10} height={30} width={150} radius={0} style={{alignSelf: "flex-start", borderBottomRightRadius: 17, backgroundColor: "gold"}}/>
                    <ActionIconType1 latch={'right'} mainPad={10} height={30} width={200} radius={0} style={{alignSelf: "flex-end", borderBottomLeftRadius: 17, backgroundColor: "dodgerblue"}}/>
                    <Animated.View style={[{transform: [{rotateZ: this.state.wallAnim.interpolate({inputRange: [0, 360], outputRange: ["0deg", "360deg"]})}], alignSelf: "center", position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderWidth: 0, borderColor: "rgb(34, 0, 54)", borderRadius: "50%", padding: 12}]}>
                        <View style={[{display: "flex", flexDirection: "row", gap: 2}]}>
                            <View style={[{width: 32, height: 32, backgroundColor: "rgb(34, 0, 54)" || "skyblue", borderRadius: "45%", borderBottomRightRadius: "0%", borderTopLeftRadius: "0%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderRightWidth: 0, borderColor: "dodgerblue"}]}></View>
                            <View style={[{width: 32, height: 32, backgroundColor: "rgb(34, 0, 54)", borderRadius: "45%", borderBottomLeftRadius: "0%", borderTopRightRadius: "0%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderBottomWidth: 0, borderColor: "gold"}]}></View>
                        </View>
                        <View style={[{display: "flex", flexDirection: "row", gap: 2}]}>
                            <View style={[{width: 32, height: 32, backgroundColor: "rgb(66, 0, 104)" || "rgb(132, 189, 255)", borderRadius: "45%", borderBottomLeftRadius: "0%", borderTopRightRadius: "0%", elevation: 5, shadowColor: "rgba(0, 0, 0, 0.6)", borderTopWidth: 0, borderColor: "lightgreen"}]}></View>
                            <View style={[{width: 32, height: 32, backgroundColor: "rgb(66, 0, 104)" || "skyblue", borderRadius: "45%", borderTopLeftRadius: "0%", borderBottomRightRadius: "0%", elevation: 2, shadowColor: "rgba(0, 0, 0, .6)", borderLeftWidth: 0, borderColor: "rgb(255, 0, 55)"}]}></View>
                        </View>
                    </Animated.View>
                </View>
                <View style={{width: "100%", display: "flex", flexDirection: "column", paddingTop: 0}}>
                    <View style={{width: "100%", padding: 20, display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start", transform: [{rotateZ: "-0deg"}] || [{rotateX: "30deg"}, {rotateZ: "-30deg"}]}}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 7, alignSelf: "flex-end"}}>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center", zIndex: 5}}>
                                <Animated.View style={[styles.controlButton, {transform: [{rotateY: this.state.butterflyAnim1.interpolate({inputRange: [-25, 25], outputRange: ["-35deg", "35deg"]})}, {translateX:  this.state.butterflyAnim1.interpolate({inputRange: [-25, 0, 25], outputRange: [15, 0, 15]})}], width: 180, height: 180, elevation: 0 ?? 15, shadowColor: 'rgba(132, 0, 194, 0.4)', borderWidth: 0.0, borderColor: 'rgba(100, 100, 100, 0.2)', boxShadow: "0px 0px 20px -10px rgba(0, 0, 0, 0.1)", borderRadius: "40%", borderBottomRightRadius: "0%", borderTopLeftRadius: "0%", backgroundColor: "rgb(209, 0, 105)", boxShadow: "-3px 3px 40px 0px rgba(0, 0, 0, 0.0)" /*0.2*/}]}>
                                    <MaterialIcons style={[{color: "white"}]} name={"call"} size={80}/>
                                </Animated.View>
                            </View>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center", /*position: "relative", right: 7, right: -20*/}}>
                                <Animated.View style={[styles.controlButton, {transform: [{rotateY: this.state.butterflyAnim1.interpolate({inputRange: [-25, 25], outputRange: ["35deg", "-35deg"]})}, {translateX:  this.state.butterflyAnim1.interpolate({inputRange: [-25, 0, 25], outputRange: [-15, 0, -15]})}], width: 150 || 180 || 110, height: 150 || 180 || 110, elevation: 0 ?? 7, shadowColor: 'rgba(255, 0, 255, 0.62)', borderWidth: 0, borderColor: 'rgba(100, 100, 100, 0.2)', borderColor: "white", borderWidth: 15, backgroundColor: "transparent", boxShadow: "0px 0px 2px -4px rgba(0, 0, 0, 0.1)", borderRadius: "40%", borderBottomLeftRadius: "0%", borderTopRightRadius: "0%"}]}>
                                    <MaterialIcons style={[{}]} name={"pause"} size={35}/>
                                </Animated.View>
                                {/*<SText style={[{fontSize: 15, color: "rgba(0, 0, 0, .5)"}]}>Hold</SText>*/}
                            </View>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 7, alignSelf: "flex-end", paddingRight: 20}}>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center"}}>
                                <Animated.View style={[styles.controlButton, {transform: [{rotateY: this.state.butterflyAnim1.interpolate({inputRange: [-25, 25], outputRange: ["35deg", "-35deg"]})}, {translateX: this.state.butterflyAnim1.interpolate({inputRange: [-25, 0, 25], outputRange: [15, 0, 15]})}], width: 160 || 140, height: 160 || 140, elevation: 0 ?? 10, shadowColor: 'rgba(216, 1, 144, 0.55)', borderWidth: 30, borderColor: 'rgba(100, 100, 100, 0.2)', borderColor: "rgb(108, 0, 129)", borderRadius: "50%", borderBottomLeftRadius: "0%", borderTopRightRadius: "0%", backgroundColor: "rgb(108, 0, 129)"}]}>
                                    {/*<MaterialIcons style={[{color: "white"}]} name={"mic-off"} size={50}/>*/}
                                </Animated.View>
                            </View>
                            <View style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center"}}>
                                <Animated.View style={[styles.controlButton, {transform: [{rotateY: this.state.butterflyAnim1.interpolate({inputRange: [-25, 25], outputRange: ["35deg", "-35deg"]})}, {translateX: this.state.butterflyAnim1.interpolate({inputRange: [-25, 0, 25], outputRange: [-15, 0, -15]})}], width: 130 || 140, height: 130 || 140, elevation: 0 ?? 10, shadowColor: 'rgba(216, 1, 144, 0.55)', borderWidth: 0, borderColor: 'rgba(100, 100, 100, 0.2)', backgroundColor: "rgb(34, 0, 54)", borderRadius: "50%", borderBottomRightRadius: "0%", borderTopLeftRadius: "0%"}]}>
                                    <MaterialIcons style={[{color: "white"}]} name={"mic-off"} size={50}/>
                                </Animated.View>
                            </View>
                            <View style={{position: "absolute", left: 135, top: -35, zIndex: 10}}>
                                <View style={{width: 55, height: 55, backgroundColor: "white", borderRadius: "50%", elevation: 2, backgroundColor: "rgb(255, 203, 59)"}}>
                                </View>
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