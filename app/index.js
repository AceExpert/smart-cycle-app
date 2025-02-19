import { Component } from "react";
import { router, Stack } from "expo-router";

import { 
  Text, View, StyleSheet, 
  ScrollView, Switch, /*DeviceEventEmitter,*/ 
  Image, Dimensions, ActivityIndicator, 
  ImageBackground, Animated
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";

import ActionCard from "../components/actioncard";
import LauncherIcon from "../components/launchericon";
import Slider from "../components/slider";
import SmartView, {ChatView} from "../components/smartview";
import NavigationTemplate from "../components/navitemplate";
import Notification from "../components/notification";
import { ActionIconType1 } from "../components/callcard";

import NativeCycleControl from "../specs/NativeCycleControl"

import Floral from "../styles/floral";

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.naviDefault = <Text style={[styles.actionCardHead]}>Navigation</Text>;
    this.screenWidth = Dimensions.get("screen").width
    this.state = {
      music: "Music",
      artist: "Artist",
      cover: "",
      duration: 0,
      paused: true,
      seek: 0,
      seekProg: null,
      navigation: this.naviDefault,
      voipConnected: false,
      muted: true,
      voipServerConnected: false,
      mainAnim1: new Animated.Value(300),
      notifs: [],
      notifBar: false,
      secondPanelBlur: undefined
    };
  }

  componentDidMount() {
    this.setState({voipServerConnected: true})
    /*
    DeviceEventEmitter.addListener("mediaActive", evt => {
      console.log(evt)
      if(evt.active === 'false') {
        this.setState({
          music: "Music",
          artist: "Artist",
          cover: "",
          duration: 0,
          seek: 0
        })
        this.stopSeek();
      }
    })
    DeviceEventEmitter.addListener("mediaInfo", evt => {
      console.log(evt)
      this.stopSeek(() => this.setState({
        music: evt.name,
        artist: evt.artist,
        cover: evt.cover,
        duration: Number(evt.duration),
        seek: 0,
      }));
    })
    DeviceEventEmitter.addListener("mediaState", evt => {
      this.stopSeek(() => this.setState({
        paused: evt.paused === 'true',
        seek: Number(evt.seek)
      }, () => {
        if(evt.paused === 'false') {
          this.setState(
            {seekProg: setInterval(() => {
              this.setState({seek: this.state.seek + 1000})
            }, 1000)}
          )
        }
      }))
    })
    DeviceEventEmitter.addListener("mapInfo", evt => {
      console.log(evt)
      this.setState({
        navigation: <NavigationTemplate distance={evt.distance} direction={evt.direction} meta={evt.meta}/>
      })
    })
    DeviceEventEmitter.addListener("mapActive", evt => {
      if(evt.active === 'false') {

      }
    })
    DeviceEventEmitter.addListener("cycleLocation", evt => {
      
    })
    DeviceEventEmitter.addListener("VOIPOpen", evt => {
      this.setState({voipServerConnected: true, voipConnected: false, muted: true})
    })
    DeviceEventEmitter.addListener("VOIPDisconnect", evt => {
      this.setState({voipServerConnected: false, voipConnected: false, muted: true})
    })
    DeviceEventEmitter.addListener("joinVOIP", evt => {
      this.setState({voipConnected: true})
    })
    DeviceEventEmitter.addListener("leaveVOIP", evt => {
      this.setState({voipConnected: false})
    })
    DeviceEventEmitter.addListener("muteVOIP", evt => {
      this.setState({muted: true})
    })
    DeviceEventEmitter.addListener("unmuteVOIP", evt => {
      this.setState({muted: false})
    })*/
    NativeCycleControl.init(() => {})
    setTimeout(() => {
      Animated.timing(this.state.mainAnim1, {
        toValue: 0,
        duration: 600,
      }).start();
    }, 1000)
    this.pushNotification({
      notification: <Notification content={<Text>Incoming call from <Text style={{fontWeight: 700}}>Sayu</Text></Text>} key={`notif-${Math.random()}`} iconName={"info"} IconClass={Fontisto} iconSize={15} iconColor={null} title = {"Incoming call"} type={'call'}/>,
      delay: 3000,
      duration: 10000
    })
  }

  stopSeek(callb) {
    if(this.state.seekProg) {
      clearInterval(this.state.seekProg);
      this.setState({seekProg: null}, callb)
    } else {
      callb?.()
    }
  }

  componentWillUnmount() {
    //DeviceEventEmitter.removeAllListeners();
  }

  pushNotification({
    notification, delay = 0, duration = 4000, popOnEnd = false,
  }) {
    this.state[`notifAnim${notification.key}`] = new Animated.Value(-400);

    setTimeout(() => {
      let notifs = [...this.state.notifs, notification]
      this.setState({
        notifs
      }, () => {
        Animated.timing(this.state[`notifAnim${notification.key}`], {
          toValue: 0,
          duration: 500,
        }).start(() => setTimeout(() =>
          Animated.timing(this.state[`notifAnim${notification.key}`], {
            toValue: -400,
            duration: 500
          }).start(() => {
            if(popOnEnd) {
              notifs = this.state.notifs.filter(elem => elem.key !== notification.key)
              this.setState({notifs})
            }
          }), duration))
      })
    }, delay)
  }

  toggleNotificationBar() {
    if(!this.state.notifs.length) return
    this.state.notifBar = !this.state.notifBar
    let timeout = -200
    this.setState({secondPanelBlur: this.state.notifBar? "blur(5px)" : undefined}, () =>
      Object.keys(this.state).filter(key => key.startsWith("notifAnim")).forEach(k => {
        setTimeout(() => 
          Animated.timing(this.state[k], {
            toValue: this.state.notifBar? 0 : -400,
            duration: 500,
          }).start(), timeout += 200)
    }))
  }

  render = () => 
    <ScrollView style={[{width: "100%", height: "100%", padding: 0, margin: 0, marginTop: 0}, styles.column]}>
      <Stack.Screen options={{headerTitle: "Cytroid", headerShown: false}}/>
      <View style={{width: "100%", height: 60}}>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: 5}}>
          <View style={{display: "flex", flexDirection: "row", gap: 3}}>
            <View style={{display: "flex", flexDirection: "column", gap: 3, paddingLeft: 3, alignSelf: "flex-end", alignItems: "flex-end"}}>
              <View style={[Floral.petal1(15), {backgroundColor: "white", width: 24, height: 24, boxShadow: "-0px -0px 10px 0px rgba(20, 20, 20, 0.1)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}></View>
              <View style={[Floral.petal2(15), {backgroundColor: "white", width: 28, height: 28, boxShadow: "-0px 5px 20px -2px rgba(20, 20, 20, 0.2)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}>
              </View>
            </View>
            <View style={{display: "flex", flexDirection: "column", gap: 3, paddingLeft: 0}}>
              <View style={[Floral.petal3(18, 20), {backgroundColor: "white", padding: 5, boxShadow: "0px 0px 10px 0px rgba(20, 20, 20, 0.1)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}>
                <Text style={{fontSize: 23, fontWeight: 600, paddingRight: 3, paddingLeft: 3}}>Cytroid</Text>
              </View>
              <View style={[Floral.petal4(15), {backgroundColor: "white", width: 24, height: 24, boxShadow: "0px 5px 20px -2px rgba(20, 20, 20, 0.2)", elevation: 0, shadowColor: "rgba(100, 100, 100, 0.3)", borderWidth: 0.0, borderColor: "rgba(0, 0, 0, 0.2)"}]}>
              </View>
            </View>
          </View>
          <View style={{alignItems: "center", display: "flex", flexDirection: "row-reverse"}}>
            <SmartView touchFeedback = {false} onTouchEnd = {() => {
              this.toggleNotificationBar()
            }}>
              <View style={{borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: "rgb(34, 0, 54)", padding: 8, alignItems: "center", paddingRight: 10}}>
                <Entypo size={30} style={{color: "white"}} name={"notification"}/>
              </View>
            </SmartView>
          </View>
        </View>
      </View>
      <View style={[{position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: 70, justifyContent: "flex-start"}]}>
        <View style={{display: "flex", flexDirection: "column", gap: 4}}>
          {this.state.notifs.map((elem, ind) => {
            return (
              <Animated.View key={`anim-${elem.key}`} style={{display: "flex", position: "relative", right: this.state[`notifAnim${elem.key}`], zIndex: 5}}>
                {elem}
              </Animated.View> 
            )
          })}
          {/*<Animated.View style={{display: "flex", position: "relative", right: -400, zIndex: 5}}>
            <Notification title={"Incoming"} type={"call"} content={<Text>Incoming call from <Text style={{fontWeight: 500}}>Sayu</Text> yes hi lorem ipsum sdudso osjckj sdkj dsjkc ksjdjksd dsjk sdkfkjck skdj dskjck sdj cksdjcksd js kjkdsjdkcj jsdk csdkcj sjkc jk</Text>}/>
          </Animated.View>*/}
        </View>
      </View>
      <View style={[styles.column, {paddingTop: 20, height: "100%" || Dimensions.get("screen").height - 250, width: "100%", justifyContent: "flex-start", alignItems: "center"}]}>
        {/*<View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
            <View style={{display: "flex", alignItems: "flex-start", alignSelf: "center", flexDirection: "column", gap: 5, alignSelf: "flex-start", marginLeft: 30}}>
              <View style={{display: "flex", flexDirection: "row", gap: 5, alignItems: "flex-end"}}>
                <View style={[Floral.petal1(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "dodgerblue", width: 150, height: 150, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: "rgb(0, 90, 192)", boxShadow: "-5px 5px 25px 0px rgba(0, 0, 0, 0.15)"}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={[styles.actionCardHead, {color: "white", alignSelf: "flex-start", marginTop: -0, marginLeft: 0}]}>Speaker</Text>
                      <MaterialIcons name={"bluetooth-audio"} size={52} style={[styles.mainIcon, {color: "white"}]}/>
                    <Text style={[{fontSize: 13, color: "white", alignSelf: "flex-end"}]}>Connected</Text>
                  </View>
                </View>
                <View style={[Floral.petal2(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 150, height: 150, borderBottomWidth: 3, borderRightWidth: 3, borderColor: this.state.voipServerConnected ? 'orange' : 'grey', boxShadow: "5px 5px 35px -4px rgba(0, 0, 0, 0.1)"}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>
                    {this.state.voipServerConnected ? 
                      <MaterialIcons name={"wifi-tethering"} size={15} style={[{color: "orange", position: "absolute", right: 3, top: 3}]}/> 
                        : 
                      <ActivityIndicator size={"small"} color={"purple"} style={[{position: "absolute", right: 8, top: 5}]}/>
                    }
                    <Text style={[styles.actionCardHead, {alignSelf: "center", paddingLeft: 50}]}>VoIP</Text>
                    <View style={[styles.centerRow, {gap: 10, alignSelf: "flex-start", paddingLeft: 0, alignSelf: "center"}]}>
                      <SmartView onTouchEnd={() => this.state.muted ? NativeCycleControl.VoIPUnmute() : NativeCycleControl.VoIPMute()} disabled={!this.state.voipServerConnected}>
                        <MaterialIcons name={this.state.muted ? "mic-off" : "mic"} size={35} style={[styles.mainIcon, {color: this.state.voipServerConnected? (this.state.muted ? "darkred" : "purple") : 'grey'}]}/>
                      </SmartView>
                      <View style={[{display: "flex", flexDirection: "column", alignItems: "center"}]}>
                        <SmartView onTouchEnd={() => this.state.voipConnected? NativeCycleControl.disconnectVoIP() : NativeCycleControl.connectVoIP()} disabled={!this.state.voipServerConnected}>
                          <MaterialIcons name={this.state.voipConnected ? "wifi-calling-3" : "call-end"} size={35} style={[styles.mainIcon, {color: this.state.voipConnected ? "yellowgreen" : "grey"}]}/>
                        </SmartView>
                        <Text style={[{fontSize: 10, color: "grey", position: "absolute", bottom: -10}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Leave' : 'Join') : ''}</Text>
                      </View>
                    </View>
                    <Text style={[{fontSize: 13, color: "rgb(180, 180, 180)", alignSelf: "flex-start"}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Connected' : 'Idle') : 'Connecting'}</Text>
                  </View>
                </View>
              </View>
              <View style={{display: "flex", flexDirection: "row", gap: 5}}>
                <View style={[Floral.petal3(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 150, height: 150}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>

                  </View>
                </View>
                <View style={[Floral.petal4(150, 150), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 230, alignSelf: "flex-start"}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", padding: 10, justifyContent: "space-between", alignItems: "center", gap: 3}}>
                    <Text style={[styles.actionCardHead, {alignSelf: "flex-start", paddingLeft: 0, paddingTop: 0}]}>Sound</Text>
                    <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", padding: 0, alignItems: "center", paddingRight: 40, alignSelf: "flex-start"}]}>
                      <Text style={[{paddingLeft: 0, paddingTop: 0, color: "grey", fontWeight: 500}]}>Startup</Text>
                      <Switch />
                    </View>
                    
                    <View style={[styles.centerRow, {justifyContent: "space-between", width: "100%", padding: 0, flexWrap: "wrap", paddingRight: 20}]}>
                      <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"library-music"} name={"Default"} iconStyle={{color: "purple", padding: 0}}/>
                      <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"add"} name={"Custom"} iconStyle={{color: "grey", padding: 0}}/>
                    </View>

                    <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", paddingLeft: 20}]}>
                      <Text style={[{paddingLeft: 9, paddingTop: 5, color: "grey", fontWeight: 500}]}>Stand-by</Text>
                      <Switch />
                    </View>
                    
                    <View style={[styles.centerRow, {justifyContent: "space-between", width: "100%", padding: 0, flexWrap: "wrap", paddingLeft: 40}]}>
                      <LauncherIcon rStyle={[{transform: [{translateY: -10}, {translateX: 10}]}]} style={[styles.transparent, styles.actionIcon]} icon={"library-music"} name={"Default"} iconStyle={{color: "grey", padding: 0}}/>
                      <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"add"} name={"Custom"} iconStyle={{color: "rebeccapurple", padding: 0}}/>
                    </View>
                  </View>
                </View>
                <View style={[Floral.petal2(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 180, height: 180, alignSelf: "flex-end"}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>

                  </View>
                </View>
              </View>
              <View style={{display: "flex", flexDirection: "row-reverse", gap: 5, alignSelf: "flex-end", position: "relative", right: 30}}>
                <View style={[Floral.petal4(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 150, height: 150}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>

                  </View>
                </View>
                <View style={[Floral.petal3(130, 130), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 250, height: 250, alignSelf: "flex-end"}]}>
                  <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>

                  </View>
                </View>
              </View>
            </View>
        </View>*/}
        <Animated.View style={[styles.row, {width: "100%", padding: 20, paddingTop: 0, justifyContent: "space-between", position: "relative", right: this.state.mainAnim1}]}>
          <View style={[{paddingTop: 0, gap: 10, width: 240}, styles.column]}>
            <ActionCard style={[styles.actionCard, {backgroundColor: "#ff2982", borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 50, borderBottomRightRadius: 60}]}>
              <Text style={[styles.actionCardHead, {color: "white", alignSelf: "flex-end", paddingRight: 10}]}>Cycle</Text>
              <SmartView onLongPress={() => this.pushNotification({
                notification: <Notification content={"Connect / Disconnect with your cycle"} key={`notif-${Math.random()}`} iconName={"info"} IconClass={Fontisto} iconSize={15} type={'info'}/>,
                delay: 0,
                duration: 4000, //4000
                popOnEnd: true
              })}>
                <MaterialIcons name="power-settings-new" size={52} style={[styles.mainIcon, {color: "white"}]}/>
              </SmartView>
              <Text style={[{fontSize: 13, color: "white", alignSelf: "flex-start", paddingLeft: 10}]}>Connected</Text>
            </ActionCard>
            <ActionCard style={[styles.actionCard, {backgroundColor: "dodgerblue", borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 60, borderBottomLeftRadius: 50}]}>
              <Text style={[styles.actionCardHead, {color: "white", alignSelf: "flex-start", paddingLeft: 10}]}>Speaker</Text>
              <MaterialIcons name={"bluetooth-audio"} size={52} style={[styles.mainIcon, {color: "white"}]}/>
              <Text style={[{fontSize: 13, color: "white", alignSelf: "flex-end", paddingRight: 10}]}>Connected</Text>
            </ActionCard>
            <ActionCard style={[styles.actionCard, {borderWidth: 0.0, borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: this.state.voipServerConnected ? 'orange' : 'grey', borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 65, borderBottomRightRadius: 70}]}>
              {this.state.voipServerConnected ? 
                <MaterialIcons name={"wifi-tethering"} size={15} style={[{color: "orange", position: "absolute", right: 8, top: 5}]}/> 
                  : 
                <ActivityIndicator size={"small"} color={"purple"} style={[{position: "absolute", right: 8, top: 5}]}/>
              }
              <Text style={[styles.actionCardHead]}>VoIP</Text>
              <View style={[styles.centerRow, {gap: 10, alignSelf: "flex-start", paddingLeft: 10}]}>
                <SmartView onTouchEnd={() => this.state.muted ? NativeCycleControl.VoIPUnmute() : NativeCycleControl.VoIPMute()} disabled={!this.state.voipServerConnected}>
                  <MaterialIcons name={this.state.muted ? "mic-off" : "mic"} size={35} style={[styles.mainIcon, {color: this.state.voipServerConnected? (this.state.muted ? "darkred" : "purple") : 'grey'}]}/>
                </SmartView>
                <View style={[{display: "flex", flexDirection: "column", alignItems: "center"}]}>
                  <SmartView onTouchEnd={() => this.state.voipConnected? NativeCycleControl.disconnectVoIP() : NativeCycleControl.connectVoIP()} disabled={!this.state.voipServerConnected}>
                    <MaterialIcons name={this.state.voipConnected ? "wifi-calling-3" : "call-end"} size={35} style={[styles.mainIcon, {color: this.state.voipConnected ? "yellowgreen" : "grey"}]}/>
                  </SmartView>
                  <Text style={[{fontSize: 10, color: "grey", position: "absolute", bottom: -10}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Leave' : 'Join') : ''}</Text>
                </View>
              </View>
              <Text style={[{fontSize: 13, color: "rgb(180, 180, 180)", alignSelf: "flex-start", paddingLeft: 10}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Connected' : 'Idle') : 'Connecting'}</Text>
            </ActionCard>
            <ActionCard style={[styles.actionCard, {width: 240, borderWidth: 0., marginTop: 8, height: "auto", gap: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 3, borderColor: "dodgerblue", borderBottomRightRadius: 0}]}>
                <Text style={[styles.actionCardHead, {alignSelf: "flex-start", paddingLeft: 9, paddingTop: 5}]}>Sound</Text>
                <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%"}]}>
                  <Text style={[{paddingLeft: 9, paddingTop: 5, color: "grey", fontWeight: 500}]}>Startup</Text>
                  <Switch />
                </View>
                
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%", padding: 0, flexWrap: "wrap"}]}>
                  <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"library-music"} name={"Default"} iconStyle={{color: "purple", padding: 0}}/>
                  <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"add"} name={"Custom"} iconStyle={{color: "grey", padding: 0}}/>
                </View>

                <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%"}]}>
                  <Text style={[{paddingLeft: 9, paddingTop: 5, color: "grey", fontWeight: 500}]}>Stand-by</Text>
                  <Switch />
                </View>
                
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%", padding: 0, flexWrap: "wrap"}]}>
                  <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"library-music"} name={"Default"} iconStyle={{color: "grey", padding: 0}}/>
                  <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"add"} name={"Custom"} iconStyle={{color: "rebeccapurple", padding: 0}}/>
                </View>
              </ActionCard>
          </View>
        </Animated.View>

        <View style={[{paddingTop: 20, width: "100%", alignItems: "flex-end", position: "absolute", paddingRight: 20}, styles.column]}>
          <Animated.View style={[styles.column, {width: this.screenWidth - 40 - 240 + 70, paddingTop: 0, position: "relative", right: Animated.multiply(-1, this.state.mainAnim1), filter: this.state.secondPanelBlur}]}>
            <View style={[{justifyContent: "space-between", width: "100%"}, styles.centerRow]}>
              <View style={[styles.centerRow, {gap: 0, marginLeft: 0}]}>
                <MaterialIcons name={"speaker"} size={17} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "0deg"}]}]}/>
                <MaterialIcons name={"battery-4-bar"} size={25} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "90deg"}]}]}/>
                <Text style={[{fontSize: 12, fontWeight: 700, color: "rgb(100 100 100)", position: "relative", left: 0, zIndex: 0, paddingLeft: 4}]}>60</Text>
              </View>          
              <View style={[styles.centerRow, {gap: 6}]}>
                <Text style={[{fontSize: 12, fontWeight: 700, color: "rgb(100 100 100)", position: "relative", left: 0, zIndex: 0}]}>80</Text>
                <MaterialIcons name={"battery-5-bar"} size={25} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "-90deg"}]}]}/>
              </View>
            </View>
            <View style={[{gap: 0, width: "100%", alignItems: "flex-end", paddingTop: 10}, styles.column]}>
              <ActionCard style={[styles.actionCard, {width: "100%", minHeight: 150}, styles.cassette, {borderColor: "#c065fc", borderBottomLeftRadius: 0, borderTopLeftRadius: 17}]}>
                <Image style={{position: "absolute", width: 150, height: 150, borderRadius: 20, alignSelf: "flex-end"}} source={{uri: this.state.cover}}/>
                <View style={[styles.column, {width: "100%", gap: 3}]}>  
                  <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", paddingTop: 5, paddingLeft: 5, paddingRight: 20}]}>
                    <Text style={[styles.actionCardHead, {fontWeight: 600, fontSize: 15}]}>{this.state.music}</Text>
                  </View>
                  <View>
                    <Text style={[{fontWeight: 400, color: "grey", fontSize: 9, paddingLeft: 5}]}>{this.state.artist}</Text>
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
                  <View style={[styles.centerRow, {gap: 0, width: "80%", alignSelf: "flex-end", paddingRight: 15}]}>
                    <MaterialIcons name={"volume-up"} size={17} style={[styles.mainIcon, styles.lightBorder, {color: "purple", padding: 0, transform: [{rotate: "0deg"}]}]}/>
                    <Slider style={{width: "100%"}}/>
                  </View>
                </View>
              </ActionCard>
              <View style={[styles.row, {gap: 20, height: "auto", flexWrap: "wrap", justifyContent: "flex-end", paddingLeft: 0, paddingTop: 20, paddingBottom: 20, width: "100%", borderLeftWidth: 2, borderColor: "rgba(0, 0, 0, 0.32)", borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: "transparent", elevation: 0}]}>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}]} icon={"search"} name={"Find cycle"} iconStyle={{color: "purple"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}]} icon={"location-on"} name={"Location"} iconStyle={{color: "maroon"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}]} icon={"phonelink-ring"} name={"Ring Cycle"} iconStyle={{color: "coral"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}]} icon={"groups-2"} name={"Group Call"} iconStyle={{color: "navy"}} link={'/call'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}]} icon={"settings"} name={"Settings"} iconStyle={{color: "rgb(120, 120, 120)"}}/>
              </View>

              <ActionCard style={[styles.actionCard, {width: "100%", borderWidth: 0.3}, styles.cassette, {backgroundColor: "white", borderTopLeftRadius: 0}]}>

                {
                  this.state.navigation
                }
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                  <MaterialIcons name={"power-settings-new"} size={35} style={[styles.mainIcon, {color: "green"}]}/>
                  <MaterialIcons name={"navigation"} size={35} style={[styles.mainIcon, {color: "dodgerblue"}]}/>
                </View>
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                  <Text style={[{fontSize: 13, color: "rgb(180, 180, 180)"}]}>ON</Text>
                  <Text style={[{fontSize: 13, color: "rgb(180, 180, 180)"}]}>ACTIVE</Text>

                </View>
              </ActionCard>

            </View>
          </Animated.View>
        </View>
      </View>



    </ScrollView>

}

const styles = StyleSheet.create({
  cassette: {
    borderRadius: 17, //5
    borderWidth: 0.0,
    borderBottomWidth: 0.0, //.6
    borderColor: 'rgba(100, 100, 100, 0.4)',
    borderBottomColor: 'rgb(0, 0, 0)',
    backgroundColor: "white",
    borderColor: 'rgba(20, 20, 20, 0.85)',
    borderBottomRightRadius: 0, 
    borderBottomLeftRadius: 15, //0
    borderTopRightRadius: 0,
    borderRightWidth: 3,
    borderColor: "green"
  },
  transparent: {
    backgroundColor: "rgb(0, 0, 0, 0)",
    elevation: 0,
    zIndex: 4
  },
  actionCard: {
    padding: 5, 
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainIcon: {
    borderRadius: 100, 
    padding: 4
  },
  lightBorder: {
    borderWidth: 0.0, 
    borderColor: "grey", 
  },
  actionIcon: {
    width: 60, 
    height: 60, 
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  actionCardHead: {
    fontSize: 16, 
    paddingTop: 0, 
    fontWeight: 700
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  centerRow: {
    display: "row",
    flexDirection: "row",
    alignItems: "center"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  }
})