import { useCallback, useEffect, useRef, useState } from "react";

import { Stack } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";

import { ScrollView, View, Text, Animated, StyleSheet, PanResponder, useAnimatedValue, Dimensions, Easing} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import SText from "../../components/texts";
import SmartView from "../../components/smartview";
import Switch from "../../components/switch";
import Slider from "../../components/slider";

import {settings} from "../../globalstates"

export default function MotionSettings({...props}) {

    let sliderVal = useAnimatedValue(settings.gpsSens);
    let [value, setValue] = useState(settings.gpsSens);
    let [active, setActive] = useState(settings.gps);

    let savePop = useAnimatedValue(0);

    let savePopShow = yes => {
        Animated.timing(savePop, {
            toValue: yes? -100 : 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }
    return (
        <View style={[styles.column, {width: "100%", height: "100%"}]}>
            <Animated.View style={{position: "absolute", zIndex: 1, bottom: -100, transform: [{translateY: savePop}], alignSelf: "center", width: "100%"}}>
                <View style={[styles.rowCenter, {width: "100%", padding: "5%", gap: "1%"}]}>
                    <SmartView style={[{flex: 2}]} onTouchEnd={() => {
                        settings.gpsSens = value;
                        settings.gps = active;
                        savePopShow(false)
                    }}>
                        <View style={[styles.rowCenter, {height: "100%", backgroundColor: "rgb(194, 89, 255)", justifyContent: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, boxShadow: "-0px 10px 20px 0px rgba(0,0,0,.08)"}]}>
                            <MaterialIcons name="check" style={{color: "white", fontSize: 25}}/>
                        </View>
                    </SmartView>
                    <View style={[styles.column, {flex: 5, paddingTop: "2.5%", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "2.5%", backgroundColor: "white", boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.06)", borderRadius: 0}]}>
                        <View style={[{width: "100%", justifyContent: "center"}, styles.rowCenter]}>
                            <SText style={[{fontSize: 18}]}>Save Changes</SText>
                        </View>
                    </View>
                    <SmartView style={[{flex: 2}]} onTouchEnd={() => {
                        savePopShow(false)
                        setValue(settings.gpsSens);
                        setActive(settings.gps);
                        Animated.timing(sliderVal, {
                            toValue: settings.gpsSens,
                            useNativeDriver: false,
                            duration: 500,
                        }).start()
                    }}>
                    <View style={[styles.rowCenter, {flex: 2, height: "100%", backgroundColor: "rgb(167, 0, 14)", justifyContent: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10, boxShadow: "-0px 10px 20px 0px rgba(0,0,0,.08)"}]}>
                        <MaterialIcons name={"close"} style={{color: "white", fontSize: 25}}/>
                    </View>
                    </SmartView>
                </View>
            </Animated.View>
            
            <View style={[styles.column, {width: "100%", paddingTop: 0}]}>
                <View style={[styles.rowCenter, {width: "100%", justifyContent: "center", padding: 10, paddingTop: 20, backgroundColor: "white"}]}>
                    <SText style={[{fontSize: 20}]}>GPS & Intruder Detection</SText>
                </View>
            </View>
            <ScrollView style={[styles.column, {width: "100%"}]}>
                <Stack.Screen options={{headerTitle: "Force Gestures", headerShown: false}}/>
                <View style={[styles.columnCenter, {width: "100%"}]}>
                    <View style={[styles.column, {width: "100%", padding: "3%"}]}>
                        
                        <View style={[styles.column, {width: "100%", gap: 3}]}>
                            <View style={[styles.rowCenter, styles.settingsChip, {justifyContent: "space-between"}]}>
                                <SText style={[styles.settingsMain]}>Active</SText>
                                <Switch defaultValue={settings.gps} onClick={val => {
                                    setActive(val);
                                    savePopShow(true);
                                }}/>
                            </View>
                            <View style={[styles.column, {width: "100%", backgroundColor: "white", borderRadius: 10, gap: 0, position: "relative", boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.04)"}]}
                                {...PanResponder.create({
                                    onMoveShouldSetPanResponder: (evt, gestureState) => {
                                        return true;
                                    },
                                    onPanResponderMove: (evt, gestureState) => {
                                        let change = gestureState.dx * -100 / Dimensions.get('screen').width;
                                        let new_value = value + Math.round(change);
                                        let slider_new_val = value + change;
                                        if(new_value >= 100) {
                                            new_value = 100;
                                            slider_new_val = 100;
                                        }
                                        else if(new_value <= 0) {
                                            new_value = 0;
                                            slider_new_val = 0;
                                        }
                                        setValue(new_value);
                                        Animated.timing(sliderVal, {
                                            toValue: slider_new_val,
                                            duration: 0,
                                            easing: Easing.linear,
                                            useNativeDriver: false,
                                        }).start();
                                    },
                                    onPanResponderRelease: (evt, gestureState) => {
                                        savePopShow(true);
                                    },
                                }).panHandlers
                                }
                            >
                            <Animated.View 
                                style={[{position: "absolute", top: 0, right: 0, height: "100%", width: sliderVal.interpolate({inputRange: [0, 100], outputRange: ["0%", "100%"]})}]}
                            >
                                <LinearGradient 
                                    colors={value < 60 ? ['rgb(112, 191, 255)', 'rgb(62, 168, 255)'] : ['rgb(255, 103, 103)', 'rgb(255, 56, 56)']}
                                    style={[{position: "absolute", top: 0, right: 0, height: "100%", width: '100%', borderRadius: 10}]}
                                    start={{x: 1, y: .5}}
                                    end={{x: 0, y: .5}}
                                />
                            </Animated.View>
                            <View style={[styles.rowCenter, {justifyContent: "space-between", width: "100%"}]}>
                                <SText style={[styles.settingsLittle, {padding: "2%", color: value > 88? 'white' : 'black'}]}>Sensitivity</SText>
                                <SText style={[styles.description, {paddingRight: "3%", fontSize: 16, color: value > 5? "white" : "black"}]}>{value}</SText>
                            </View>
                            <View style={[styles.rowCenter, {width: "100%", padding: "3%", justifyContent: "space-between"}]}>
                                <SText style={[styles.description, {color: value > 95 ? "white" : "grey"}]}>High</SText>
                                <SText style={[styles.description, {color: value > 5 ? "white" : "grey"}]}>Low</SText>
                            </View>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
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
        color: "grey",
    },

    settingsMain: {
        fontSize: 18,
    },
    
    settingsChip: {
        padding: "2%",
        width: "100%"
    },
    
    settingsLittle: {
        fontWeight: 300,
        fontSize: 17,
        color: "rgba(0, 0, 0, 0.73)",
    }
})