import { Component } from "react";
import { router, Stack } from "expo-router";

import { Text, View, StyleSheet, Animated } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import SmartView from "../components/smartview";
import Slider from "../components/slider";
import CallCard from "../components/callcard";

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            music: "Music",
            artist: "Artist"
        }
    }

    componentDidMount() {

    }

    render = () =>
        <View style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <Stack.Screen options={{orientation: "landscape", headerShown: false}}/>
            <View style={[styles.centerRow, {height: 35, width: "100%", position: "absolute", top: 0, backgroundColor: "transparent", borderBottomWidth: 0.0, borderColor: "rgba(0, 0, 0, 0.7)"}]}>
                <View style={[styles.row, {height: "100%", width: "100%", alignItems: "center", gap: 5, paddingRight: 10, paddingTop: 5, justifyContent: "flex-end"}]}>
                    <View style={[{display: "flex", flexDirection: "row", gap: 5}]}>
                        <Text style={{fontSize: 22, fontWeight: 600, letterSpacing: .5, color: "rgba(0, 0, 0, 0.5)"}}>Cruise Mode</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.row, {width: "100%", height: "100%", padding: 0, justifyContent: "space-between", paddingRight: 10}]}>
                <View style={[styles.column, {gap: 5, justifyContent: "space-between", height: "100%", paddingTop: 0, width: 150}]}>
                    <View style={[styles.column, {alignItems: "center", justifyContent: "center", backgroundColor: 'white' || "rgba(255, 72, 200, 0.53)", height: 160, width: 160, borderRadius: "50%", borderBottomRightRadius: "50%", position: "relative", left: -40, top: -40, borderColor: "rgba(207, 105, 255, 0.66)", borderWidth: 0, boxShadow: "-0px 0px 15px 2px rgba(203, 72, 255, 0.29)"}]}>
                        <View style={[styles.row, {position: "absolute", height: 190, width: 190, alignItems: "center", justifyContent: "center", borderColor: "rgb(255, 255, 255)", borderWidth: 5, borderRadius: "50%", borderBottomRightRadius: "50%", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"}]}>
                            <View style={[styles.column, {position: "relative", left: 12, top: 15}]}>
                                <Text style={{fontSize: 40, fontWeight: 500, color: 'rgba(50, 0, 70, 0.73)' || "rgb(255, 255, 255)", filter: [{dropShadow: "0px 0px 7px rgba(255, 43, 227, 0.0)"}]}}>0</Text>
                                <Text style={{fontSize: 20, fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' && "rgba(100, 100, 100, 0.8)", position: "relative", left: 25, bottom: 7}}>km/hr</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.column, {alignItems: "center", justifyContent: "center", backgroundColor: 'white' || "rgba(255, 72, 200, 0.53)", height: 160, width: 160, borderRadius: "50%", position: "relative", left: -40, bottom: -40, borderColor: "rgba(207, 105, 255, 0.66)", borderWidth: 0, boxShadow: "-0px 0px 15px 2px rgba(87, 15, 255, 0.29)"}]}>
                        <View style={[styles.row, {position: "absolute", height: 190, width: 190, alignItems: "center", justifyContent: "center", borderColor: "rgb(255, 255, 255)", borderWidth: 5, borderRadius: "50%", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"}]}>
                            <View style={[styles.column, {position: "relative", left: 18, bottom: 25}]}>
                                <Text style={{fontSize: 20, fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' && "rgba(100, 100, 100, 0.8)", position: "relative", left: 17, top: 7}}>km/hr²</Text>
                                <Text style={{fontSize: 40, fontWeight: 500, color: 'rgba(50, 0, 70, 0.73)' || "rgb(255, 255, 255)", filter: [{dropShadow: "0px 0px 7px rgba(255, 43, 227, 0.0)"}]}}>0</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View style={[styles.column, styles.class1Card, {backgroundColor: 'transparent' || "rgb(110, 0, 61)", overflow: "hidden", borderRadius: 0 //25, borderTopRightRadius: 0, borderBottomRightRadius: 25, boxShadow: "-5px 3px 10px 0px rgba(0, 0, 0, .0)", borderWidth: .0, borderColor: "black", justifyContent: "space-evenly"}]}>
                        <View style={{position: "absolute", bottom: -40, left: -40, zIndex: 5}}>
                            <SimpleLineIcons name="speedometer" size={100} style={{color: "rgba(100, 100, 100, 0.4)" || "rgba(255, 255, 255, 0.3)", transform: [{rotateZ: "45deg"}]}}/>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Text style={{fontSize: 17, fontWeight: 300, color: 'white' && "rgba(0, 0, 0, 0.7)"}}>Speed</Text>
                            <MaterialIcons name="edit" size={14} style={{color: 'grey' || "purple"}}/>
                        </View>
                        <View style={[styles.class1Card, styles.centerRow, {alignSelf: "flex-end", width: "auto", height: "auto", padding: 7, gap: 8}]}>
                            <Text style={{fontSize: 40, fontWeight: 500, color: "white" && 'black'}}>0</Text>
                            <Text style={{fontSize: 25, fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' && "rgba(100, 100, 100, 0.8)"}}>km/hr</Text>
                        </View>
                        <View style={[styles.centerRow, {alignSelf: "flex-end", gap: 7, width: "100%", justifyContent: "flex-end", display: "none"}]}>
                            <MaterialIcons name="edit" size={14} style={{color: 'grey' || "purple"}}/>
                        </View>
                    </View>
                    <View style={[styles.column, styles.class1Card, {backgroundColor: 'transparent' || "rgba(78, 0, 131, 0.93)", overflow: "hidden", borderRadius: 0 //25, borderBottomRightRadius: 0, boxShadow: "-5px 3px 10px 0px rgba(0, 0, 0, .0)", borderWidth: 0.0, borderColor: "black", justifyContent: "space-evenly"}]}>
                        <View style={{position: "absolute", bottom: -40, left: -40, zIndex: 5}}>
                            <SimpleLineIcons name="speedometer" size={100} style={{color: "rgba(100, 100, 100, 0.4)" || "rgba(255, 255, 255, 0.3)", transform: [{rotateZ: "45deg"}]}}/>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Text style={{fontSize: 14, fontWeight: 300, color: "rgba(0, 0, 0, 0.7)"}}>Acceleration</Text>
                            <MaterialIcons name="edit" size={14} style={{color: 'grey' || "purple"}}/>
                        </View>
                        <View style={[styles.class1Card, styles.centerRow, {alignSelf: "flex-end", width: "auto", height: "auto", padding: 7, gap: 8}]}>
                            <Text style={{fontSize: 40, fontWeight: 500, color: "black"}}>0</Text>
                            <Text style={{fontSize: 25, fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' && "rgba(100, 100, 100, 0.8)"}}>km/hr²</Text>
                        </View>
                        <View style={[styles.centerRow, {alignSelf: "flex-end", gap: 7, width: "100%", justifyContent: "flex-end", display: "none"}]}>
                            <MaterialIcons name="edit" size={14} style={{color: 'grey' || "purple"}}/>
                        </View>
                    </View>*/}
                </View>
                <View style={[styles.column, {gap: 15, justifyContent: "space-evenly", height: "100%"}]}>
                    <View style={[styles.column, {gap: 5}]}>
                        <View style={[styles.row, {alignItems: "flex-end", justifyContent: "space-between", paddingRight: 40}]}>
                            <View style={[styles.row, {alignItems: "flex-end", gap: 5}]}>
                                <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8,  borderBottomLeftRadius: 0, backgroundColor: "dodgerblue", boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                    <MaterialIcons name="bluetooth-audio" size={17} style={{color: "white"}}/>
                                </View>
                                <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 7, borderRadius: 8, borderBottomLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", alignSelf: "", alignItems: "center", justifyContent: "center"}]}>
                                    <Text style={{fontWeight: 600, fontSize: 13}}>Cytroid Speaker</Text>
                                </View>
                            </View>
                            <View style={[styles.row, {alignItems: "flex-end", gap: 5}]}>
                                <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8,  borderBottomRightRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)"}]}>
                                    <FontAwesome name="refresh" size={17} style={{color: "black"}}/>
                                </View>
                                <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8,  borderBottomRightRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)"}]}>
                                    <MaterialIcons name="settings" size={17} style={{color: "black"}}/>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, {gap: 10}]}>
                            <View style={[styles.column, {gap: 7, height: 180}]}>
                                <View style={[styles.column, styles.class1Card, {padding: 5, width: 400, height: 210, paddingBottom: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderWidth: 0.0, borderColor: "black", boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                    <View style={[styles.column, {width: "100%", gap: 3}]}>  
                                        <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", paddingTop: 5, paddingLeft: 5, paddingRight: 20}]}>
                                            <Text style={[{fontWeight: 600, fontSize: 20}]}>{this.state.music}</Text>
                                        </View>
                                        <View>
                                            <Text style={[{fontWeight: 400, color: "grey", fontSize: 14, paddingLeft: 5}]}>{this.state.artist}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                                        <SmartView onTouchEnd={() => NativeCycleControl.mediaPrev()}>
                                            <MaterialIcons name={"skip-previous"} size={35} style={[styles.mainIcon, styles.lightBorder, {color: "rgb(100, 100, 100)"}]}/>
                                        </SmartView>
                                        
                                        <SmartView onTouchEnd={() => NativeCycleControl.mediaToggle()}>
                                            <MaterialIcons name={this.state.paused ? 'play-arrow' : 'pause'} size={35} style={[styles.mainIcon, styles.lightBorder, {color: "rgb(100, 100, 100)"}]}/>
                                        </SmartView>
                                        
                                        <SmartView onTouchEnd={() => NativeCycleControl.mediaNext()}>
                                            <MaterialIcons name={"skip-next"} size={35} style={[styles.mainIcon, styles.lightBorder, {color: "rgb(100, 100, 100)"}]}/>
                                        </SmartView>
                                    
                                    </View>
                                    <View style={[styles.column, {width: "100%", alignItems: "center", gap: 3}]}>
                                        <Slider pos={this.state.duration ? this.state.seek * 100 / this.state.duration : 0}/>
                                    </View>
                                </View>
                                <View style={[styles.row, {justifyContent: "space-between"}]}>
                                    <View style={[styles.row, {gap: 5}]}>
                                        <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 3, borderRadius: 8,  borderTopLeftRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                            <MaterialIcons name="play-arrow" size={30} style={{color: "black"}}/>
                                        </View>
                                        <View style={[{width: "auto", height: "auto", padding: 0, borderRadius: 8,  borderTopLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", position: "absolute", bottom: -17, left: 2.5, alignSelf: "center", }]}>
                                            <Text style={{fontWeight: 400, fontSize: 11, color: "rgba(0, 0, 0, 0.5)"}}>Startup</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, {gap: 5}]}>
                                        <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 3, borderRadius: 8,  borderTopLeftRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                            <MaterialIcons name="play-arrow" size={30} style={{color: "black"}}/>
                                        </View>
                                        <View style={[{width: "auto", height: "auto", padding: 0, borderRadius: 8,  borderTopLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", position: "absolute", bottom: -17, left: 2.5, alignSelf: "center", }]}>
                                            <Text style={{fontWeight: 400, fontSize: 11, color: "rgba(0, 0, 0, 0.5)"}}>Standby</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, {gap: 5}]}>
                                        <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 6, borderRadius: 8,  borderTopLeftRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                            <FontAwesome name="bullhorn" size={26} style={{color: "black"}}/>
                                        </View>
                                        <View style={[{width: "auto", height: "auto", padding: 0, borderRadius: 8,  borderTopLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", position: "absolute", bottom: -17, left: 10, alignSelf: "center", }]}>
                                            <Text style={{fontWeight: 400, fontSize: 11, color: "rgba(0, 0, 0, 0.5)"}}>Horn</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, {gap: 5}]}>
                                        <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 3, borderRadius: 8,  borderTopLeftRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                            <MaterialIcons name="sports-motorsports" size={30} style={{color: "black"}}/>
                                        </View>
                                        <View style={[{width: "auto", height: "auto", padding: 0, borderRadius: 8,  borderTopLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", position: "absolute", bottom: -17, left: 2.5, alignSelf: "center", }]}>
                                            <Text style={{fontWeight: 400, fontSize: 11, color: "rgba(0, 0, 0, 0.5)"}}>Revving</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, {gap: 5}]}>
                                        <View style={[styles.class1Card, {width: "auto", height: "auto", padding: 3, borderRadius: 8,  borderTopRightRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)", alignItems: "center", justifyContent: "center"}]}>
                                            <MaterialIcons name="multitrack-audio" size={30} style={{color: "black"}}/>
                                        </View>
                                        <View style={[{width: "auto", height: "auto", padding: 0, borderRadius: 8,  borderTopLeftRadius: 8, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.0)", position: "absolute", bottom: -17, left: -5, alignSelf: "center", }]}>
                                            <Text style={{fontWeight: 400, fontSize: 11, color: "rgba(0, 0, 0, 0.5)"}}>Soundboard</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.column, {padding: 0, width: 30, height: "100%", paddingBottom: 10, gap: 8}]}>
                                <View style={[styles.column, styles.class1Card, {width: "100%", height: 180, backgroundColor: "rgba(170, 170, 170, 0.3)", borderBottomLeftRadius: 0, alignItems: "center", justifyContent: "flex-end", padding: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)", borderWidth: 0.0, borderColor: "black"}]}>
                                    <View style={[styles.column, {width: "100%", height: "40%", backgroundColor: "white", borderRadius: 13, borderBottomLeftRadius: 0, padding: 0, borderTopWidth: 0}]}>
                                        <View></View>
                                    </View>
                                </View>
                                <View style={[styles.column, styles.class1Card, {width: "auto", height: 40, padding: 5, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 0, boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.1)"}]}>
                                    <MaterialIcons name="volume-up" size={20}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.centerRow, {width: 410}]}>
                        <View style={[styles.centerRow, {paddingTop: 0, paddingLeft: 0, width: "100%", justifyContent: "center"}]}>
                            <View style={[styles.centerRow, {gap: 3, width: "100%", justifyContent: "space-between"}]}>
                                <View style={[styles.row, styles.class1Card, {width: 90, height: "auto", padding: 15, borderRadius: 25, borderBottomLeftRadius: 0, backgroundColor: "rgb(219, 121, 40)", justifyContent: "center", boxShadow: "0px 4px 10px -2px rgba(0, 0, 0, 0.15)"}]}>
                                    <MaterialIcons name="call-end" size={30} style={{color: "white"}}/>
                                </View>
                                <View style={[styles.row, styles.class1Card, {width: 90, height: "auto", padding: 15, borderRadius: 15, borderBottomRightRadius: 15, justifyContent: "center", boxShadow: "0px 4px 10px -5px rgba(0, 0, 0, 0.10)"}]}>
                                    <MaterialIcons name="mic-off" size={30} style={{color: "darkred"}}/>
                                </View>
                                <View style={[styles.row, styles.class1Card, {width: 90, height: "auto", padding: 15, borderRadius: 25, borderBottomRightRadius: 0, justifyContent: "center", boxShadow: "0px 4px 10px -5px rgba(0, 0, 0, 0.10)"}]}>
                                    <MaterialIcons name="pause" size={30}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.column, {gap: 15, justifyContent: "space-around", height: "100%", width: 370}]}>
                    <View style={[styles.row, {gap: 10}]}>
                        <View style={[styles.column, {padding: 0, width: "100%", height: "auto", paddingBottom: 0, justifyContent: "flex-start", gap: 5, borderBottomLeftRadius: 0}]}>
                            <View style={[styles.centerRow, {paddingTop: 0, paddingLeft: 0, width: "100%", justifyContent: "space-between", alignItems: "flex-end"}]}>
                                <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, paddingLeft: 6, alignSelf: "flex-start", borderRadius: 8, borderBottomLeftRadius: 0}]}>
                                    <Text style={{fontSize: 15, fontWeight: 600}}>VoIP</Text>
                                </View>
                                <View style={[styles.centerRow, {height: "100%", gap: 3}]}>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8, borderBottomRightRadius: 8}]}>
                                        <MaterialIcons name="settings" size={15}/>
                                    </View>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8, borderBottomRightRadius: 0}]}>
                                        <MaterialIcons name="edit" size={15}/>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.column, {backgroundColor: "white", borderBottomRightRadius: 13}]}>
                                <CallCard 
                                    name = {"Anshul"} 
                                    avatar = {'https://cdn-icons-png.flaticon.com/512/6997/6997662.png'} 
                                    sideColor = {'purple'}
                                    online = {true}
                                    sideWidth = {3}
                                />
                                <CallCard 
                                    name = {"Sayu"} 
                                    avatar = {'https://cdn-icons-png.freepik.com/512/168/168720.png'} 
                                    sideColor = {'dodgerblue'}
                                    online = {true}
                                    muted = {false}
                                    joined = {true}
                                    sideWidth = {3}
                                    style = {{borderBottomWidth: 0}}
                                />
                            </View>
                        </View>
                        <View style={[styles.column, {padding: 0, width: 0, height: "0%", paddingBottom: 0, gap: 8}]}>

                        </View>
                    </View>
                    <View style={[styles.row, {gap: 10}]}>
                        <View style={[styles.column, {width: "100%", gap: 5}]}>
                            <View style={[styles.centerRow, {paddingTop: 0, paddingLeft: 0, width: "100%", justifyContent: "space-between", alignItems: "flex-end"}]}>
                                <View style={[styles.row, {alignItems: "flex-end", gap: 5}]}>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, paddingLeft: 5, alignSelf: "flex-end", borderRadius: 8, borderBottomLeftRadius: 0}]}>
                                        <Text style={{fontSize: 16, fontWeight: 500}}>Navigation</Text>
                                    </View>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8, borderBottomRightRadius: 8}]}>
                                        <MaterialIcons name="power-settings-new" size={20} style={{color: "green"}}/>
                                    </View>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8, borderBottomRightRadius: 8, gap: 5, alignItems: "center"}]}>
                                        <FontAwesome6 name="location-arrow" size={20} style={{color: "dodgerblue"}}/>
                                        <Text style={{fontWeight: 600, letterSpacing: 2}}>START</Text>
                                    </View>
                                </View>
                                <View style={[styles.centerRow, {height: "100%", gap: 3, alignItems: "flex-end"}]}>
                                    <View style={[styles.row, styles.class1Card, {width: "auto", height: "auto", padding: 5, borderRadius: 8, borderBottomRightRadius: 0}]}>
                                        <MaterialIcons name="settings" size={15}/>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.column, styles.class1Card, {padding: 5, width: "100%", height: "auto", paddingBottom: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                                <View style={[styles.column, {width: "100%", justifyContent: "flex-start", gap: 0, padding: 6}]}>
                                    <Text style={{fontSize: 20, fontWeight: 800, paddingTop: 2, color: "rgba(0, 0, 0, 0.5)"}}>Inactive</Text>
                                    <Text style={{fontSize: 13, fontWeight: 400, paddingTop: 2, alignSelf: "flex-end", color: "rgba(0, 0, 0, 0.5)"}}>Casual Cruising</Text>
                                </View>
                            </View>
                            <View style={[styles.column, {padding: 0, width: 0, height: "0%", paddingBottom: 0, gap: 8}]}>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
        width: 160, height: 150, 
        backgroundColor: "white", 
        padding: 12, 
        borderRadius: 13,
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.0)", 
        justifyContent: "space-between"
    }
})