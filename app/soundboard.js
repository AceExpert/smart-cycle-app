import { Component } from "react";
import { router, Stack } from "expo-router";

import { Text, View, StyleSheet, Animated, ScrollView } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import SoundCard from "../components/soundcard";

export default class Soundboard extends Component {
    
    constructor(props) {
        super(props)
        this.props = props
        this.state = {

        }
    }

    componentDidMount() {

    }

    render = () =>
        <View style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <Stack.Screen options={{orientation: "portrait", headerShown: false}}/>
            <View style={[styles.centerRow, {height: 70, width: "100%", position: "absolute", top: 0, backgroundColor: "white", borderBottomWidth: 0.5, borderColor: "rgba(0, 0, 0, 0.7)"}]}>
                <View style={[styles.row, {height: "100%", width: "100%", alignItems: "center", justifyContent: "center", gap: 5}]}>
                    <MaterialIcons name="multitrack-audio" size={20} color={"purple"}/>
                    <Text style={{fontSize: 24, fontWeight: 300, letterSpacing: 7}}>SOUNDBOARD</Text>
                    <MaterialIcons name="multitrack-audio" size={20} color={"magenta"}/>
                </View>
            </View>
            <ScrollView style={{display: "flex", flexDirection: "column", gap: 10, paddingTop: 50, padding: 20, width: "100%"}}>
                <View style={[styles.column, {alignSelf: "flex-start", gap: 5}]}>
                    <View style={[styles.row, {alignItems: "flex-end", gap: 5, justifyContent: "space-between"}]}>
                        <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                            <Text style={{fontSize: 25, fontWeight: 700}}>Startup Sound</Text>
                        </View>
                        <View style={[styles.row, {alignItems: "center", gap: 7}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 8, padding: 2}]}>
                                <MaterialIcons name="play-arrow" size={29} style={{color: "purple"}}/>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 8, padding: 7}]}>
                                <MaterialIcons name="power-settings-new" size={20} style={{color: "green"}}/>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8, alignSelf: "flex-start"}]}>
                            <Text style={{fontSize: 15, fontWeight: 400}}>Default</Text>
                        </View>
                    </View>
                    <View style={[styles.class1Card, {padding: 0, borderTopLeftRadius: 0, width: "100%", height: "auto"}]}>
                        <SoundCard name={"Burning Rubber"} srno={"1."} artist={"Cybertron"} duration={"0:20"} trash={false} selected={true}/>
                        <SoundCard name={"Dragon's Breadth"} srno={"2."} artist={"Cybertron"} duration={"0:10"} trash={false}/>
                        <SoundCard name={"Windows 7 startup"} srno={"3."} artist={"Microsoft Corporation"} duration={"0:07"} trash={false} style={{borderBottomWidth: 0}}/>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={[styles.centerRow, {alignItems: "flex-end", justifyContent: "space-between"}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                                <Text style={{fontSize: 15, fontWeight: 400}}>Custom</Text>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomRightRadius: 0}]}>
                                <AntDesign name="plus" size={20}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.class1Card, {padding: 0, borderTopLeftRadius: 0, width: "100%", height: "auto", borderTopRightRadius: 0}]}>
                        <SoundCard name={"Underground"} srno={"1."} artist={"Pedro Bromfman"} duration={"0:50"}/>
                        <SoundCard name={"Intel Chime"} srno={"2."} artist={"Intel Corporation"} duration={"0:07"} style={{borderBottomWidth: 0}}/>
                    </View>
                </View>

                <View style={[styles.column, {alignSelf: "flex-start", gap: 5, marginTop: 25}]}>
                    <View style={[styles.row, {alignItems: "flex-end", gap: 5, justifyContent: "space-between"}]}>
                        <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                            <Text style={{fontSize: 25, fontWeight: 700}}>Stand-by Playlist</Text>
                        </View>
                        <View style={[styles.row, {alignItems: "center", gap: 5}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 8, padding: 2}]}>
                                <MaterialIcons name="play-arrow" size={29} style={{color: "purple"}}/>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomRightRadius: 0, padding: 7}]}>
                                <MaterialIcons name="power-settings-new" size={20} style={{color: "green"}}/>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 0}}>
                        <View style={[styles.centerRow, {alignItems: "flex-end", justifyContent: "space-between"}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                                <Text style={{fontSize: 18, fontWeight: 400}}>Playlist</Text>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomRightRadius: 0, borderTopRightRadius: 0}]}>
                                <AntDesign name="plus" size={25}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.class1Card, {padding: 0, borderTopLeftRadius: 0, width: "100%", height: "auto", borderTopRightRadius: 0}]}>
                        <SoundCard name={"Hard Drivers"} srno={"1."} artist={"Ekstratic"} duration={"3:50"} check={false}/>
                        <SoundCard name={"We own it (Fast & Furious)"} srno={"2."} artist={"2 Chainz"} duration={"3:47"} check={false} style={{borderBottomWidth: 0}}/>
                    </View>
                </View>

                <View style={[styles.column, {alignSelf: "flex-start", gap: 5, marginTop: 25}]}>
                    <View style={[styles.row, {alignItems: "flex-end", gap: 5, justifyContent: "space-between"}]}>
                        <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                            <Text style={{fontSize: 25, fontWeight: 700}}>Effects</Text>
                        </View>
                        <View style={[styles.row, {alignItems: "center", gap: 7}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 8, padding: 2}]}>
                                <MaterialIcons name="play-arrow" size={29} style={{color: "purple"}}/>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 8, padding: 7}]}>
                                <MaterialIcons name="power-settings-new" size={20} style={{color: "green"}}/>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={[styles.centerRow, {alignItems: "flex-end", justifyContent: "space-between"}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                                <Text style={{fontSize: 15, fontWeight: 400}}>Horn</Text>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomRightRadius: 0}]}>
                                <AntDesign name="plus" size={20}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.class1Card, {padding: 0, borderTopLeftRadius: 0, width: "100%", height: "auto"}]}>
                        <SoundCard name={"Burning Rubber"} srno={"1."} artist={"Cybertron"} duration={"0:04"} trash={false} selected={true}/>
                        <SoundCard name={"Dragon's Breadth"} srno={"2."} artist={"Cybertron"} duration={"0:04"} trash={false}/>
                        <SoundCard name={"Scooty Horn"} srno={"3."} artist={"Cybertron"} duration={"0:04"} trash={false}/>
                        <SoundCard name={"v8 engine rev"} srno={"4."} artist={"Unknown"} duration={"0:10"} style={{borderBottomWidth: 0}}/>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={[styles.centerRow, {alignItems: "flex-end", justifyContent: "space-between"}]}>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomLeftRadius: 0, paddingRight: 8, paddingLeft: 8}]}>
                                <Text style={{fontSize: 15, fontWeight: 400}}>Rev-sound</Text>
                            </View>
                            <View style={[styles.class1Card, {padding: 5, borderRadius: 8, borderBottomRightRadius: 0}]}>
                                <AntDesign name="plus" size={20}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.class1Card, {padding: 0, borderTopLeftRadius: 0, width: "100%", height: "auto", borderTopRightRadius: 0}]}>
                        <SoundCard name={"Burning Rubber"} srno={"1."} artist={"Cybertron"} duration={"0:04"} trash={false} selected={true}/>
                        <SoundCard name={"Dragon's Breadth"} srno={"2."} artist={"Cybertron"} duration={"0:04"} trash={false}/>
                        <SoundCard name={"BMW M3 GTR Rev"} srno={"3."} artist={"Unknown"} duration={"0:10"}/>
                    </View>
                </View>

            </ScrollView>
        </View>

}

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
    },
    centerRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    column: {
        display: "flex",
        flexDirection: "column",
    },
    columnCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    class1Card: {
        backgroundColor: "white", 
        padding: 12, 
        borderRadius: 13,
        boxShadow: "0px 2px 15px -4px rgba(0, 0, 0, 0.15)",
        borderWidth: .5,
        borderColor: "rgba(0, 0, 0, 0.2)"
    }
})