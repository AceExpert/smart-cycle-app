import { Component } from "react";
import { router, Stack } from "expo-router";

import { 
  Text, View, StyleSheet, 
  ScrollView, Switch, DeviceEventEmitter,
  Image, Dimensions, ActivityIndicator, 
  ImageBackground, Animated, 
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient"

import ActionCard from "../components/actioncard";
import LauncherIcon from "../components/launchericon";
import Slider from "../components/slider";
import SmartView, {ChatView} from "../components/smartview";
import NavigationTemplate from "../components/navitemplate";
import Notification from "../components/notification";
import { ActionIconType1 } from "../components/callcard";
import SText from "../components/texts";

import { settings } from "../globalstates";

import NativeCycleControl from "../specs/NativeCycleControl"

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.naviDefault = <SText style={[styles.actionCardHead]}>Navigation</SText>;
    this.screenWidth = Dimensions.get("screen").width
    this.fontScale = Dimensions.get('screen').fontScale;
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
      mainAnim1: new Animated.Value(0), //300
      notifs: [],
      notifBar: false,
      secondPanelBlur: undefined,
      cycleConnected: false,
      cycleLocked: true,
      speakerSetup: settings.speakerAddr,
    };
  }

  componentDidMount() {
    this.setState({voipServerConnected: true})
    
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
    })
    DeviceEventEmitter.addListener("cycleConnect", evt => {
      this.setState({cycleConnected: evt.data});
    })
    DeviceEventEmitter.addListener("cycleLock", evt => {
      this.setState({cycleLocked: evt.data});
    })
    NativeCycleControl.init(() => {})
    setTimeout(() => {
      Animated.timing(this.state.mainAnim1, {
        toValue: 0,
        duration: 600,
      }).start();
    }, 1000)
    /*this.pushNotification({
      notification: <Notification content={<SText>Incoming call from <SText style={{fontWeight: 700}}>Sayu</SText></SText>} key={`notif-${Math.random()}`} iconName={"info"} IconClass={Fontisto} iconSize={15} iconColor={null} title = {"Incoming call"} type={'call'}/>,
      delay: 3000,
      duration: 10000
    })*/
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
    <ScrollView style={[{width: "100%", height: "100%", padding: 0, margin: 0, marginTop: 0}, styles.column]} contentContainerStyle={{paddingBottom: 50}}>
      <LinearGradient 
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: Dimensions.get("window").height}}
        colors={['rgb(252, 243, 255)', 'rgba(254, 242, 255, 0.58)', 'rgba(218, 245, 255, 0.45)', 'rgb(255, 251, 240)', 'rgb(255, 255, 255)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <Stack.Screen options={{headerTitle: "Cytroid", headerShown: false, orientation: "portrait"}}/>
      <View style={{width: "100%", height: 60}}>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: 0}}>

          <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", paddingTop: 0, paddingLeft: 0, width: "100%", justifyContent: "space-between"}}>
            <View style={{direction: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 5}}>
              <FontAwesome6 size={20} name={"dragon"}/>
              <SText style={{fontSize: 25, fontWeight: 600, letterSpacing: 0, color: "rgba(0, 0, 0, 1)", fontFamily: "SamsungSharpSans-Bold", paddingLeft: 5}}>C</SText>
              <SText style={{fontSize: 25, fontWeight: 300, letterSpacing: 7, color: "rgba(0, 0, 0, 0.6)", fontFamily: "SamsungSharpSans-Bold"}}>YTROID</SText>
              <SText style={{fontSize: 15, fontWeight: 300, letterSpacing: 0, color: "rgb(33, 0, 71)", fontFamily: "SamsungSharpSans-Bold", position: "absolute", bottom: "-40%", right: "-10%"}}>Dragon's Breathe</SText>
            </View>
          
            <View style={{alignItems: "center", display: "flex", flexDirection: "row-reverse", gap: "6%"}}>
              <SmartView touchFeedback = {false} onTouchEnd = {() => {
                this.toggleNotificationBar()
              }}>
                <View style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 5, backgroundColor: "rgb(153, 0, 89)", padding: 5, alignItems: "center", paddingRight: 5, alignSelf: "flex-start"}}>
                  <Entypo size={20} style={{color: "white"}} name={"notification"}/>
                </View>
              </SmartView>
              <SmartView touchFeedback = {false} onTouchEnd = {() => {
                router.navigate("settings")
              }}>
                <View style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 15, backgroundColor: "transparent", padding: 0, alignItems: "center", paddingRight: 0, alignSelf: "flex-start"}}>
                  <MaterialIcons size={20} style={{color: "grey"}} name={"settings"}/>
                </View>
              </SmartView>
              <SmartView touchFeedback = {false} onTouchEnd = {() => {
                NativeCycleControl.openNotificationAccess()
              }}>
                <View style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 15, backgroundColor: "transparent", padding: 0, alignItems: "center", paddingRight: 0, alignSelf: "flex-start"}}>
                  <MaterialIcons size={20} style={{color: "rgb(117, 107, 255)"}} name={"notification-important"}/>
                </View>
              </SmartView>
              <SmartView touchFeedback = {false} onTouchEnd = {() => {
              }}>
                <View style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 15, backgroundColor: "transparent", padding: 0, alignItems: "center", paddingRight: 0, alignSelf: "flex-start"}}>
                  <MaterialCommunityIcons size={20} style={{color: "rgb(171, 107, 255)"}} name={"flower"}/>
                </View>
              </SmartView>
            </View>
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
            <Notification title={"Incoming"} type={"call"} content={<SText>Incoming call from <SText style={{fontWeight: 500}}>Sayu</SText> yes hi lorem ipsum sdudso osjckj sdkj dsjkc ksjdjksd dsjk sdkfkjck skdj dskjck sdj cksdjcksd js kjkdsjdkcj jsdk csdkcj sjkc jk</SText>}/>
          </Animated.View>*/}
        </View>
      </View>
      <View style={[styles.column, {paddingTop: "0%", width: "100%", justifyContent: "flex-start", alignItems: "center"}]}>
        
        <View style={[{justifyContent: "space-between", width: "100%", paddingLeft: "2%", paddingRight: "2%"}, styles.centerRow]}>
          <View style={[styles.centerRow, {gap: 0, marginLeft: 0}]}>
            <MaterialIcons name={"speaker"} size={17} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "0deg"}]}]}/>
            <MaterialIcons name={"battery-4-bar"} size={25} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "90deg"}]}]}/>
            <SText style={[{fontSize: 12, fontWeight: 600, color: "rgb(100 100 100)", position: "relative", left: 0, zIndex: 0, paddingLeft: 4}]}>60</SText>
          </View>          
          <View style={[styles.centerRow, {gap: 6}]}>
            <SText style={[{fontSize: 12, fontWeight: 600, color: "rgb(100 100 100)", position: "relative", left: 0, zIndex: 0}]}>80</SText>
            <MaterialIcons name={"battery-5-bar"} size={25} style={[styles.mainIcon, styles.lightBorder, {color: "grey", padding: 0, transform: [{rotate: "-90deg"}]}]}/>
          </View>
        </View>
        <View style={[styles.row, {width: "100%", padding: "2%", paddingTop: 0, justifyContent: "space-between", flexWrap: "wrap"}]}>
          <Animated.View style={[styles.row, {flex: 35, position: "relative", right: this.state.mainAnim1, justifyContent: "space-evenly"}]}>
            <View style={[{gap: 20, width: "100%", paddingRight: "8%", flexWrap: "wrap", justifyContent: "space-evenly"}, styles.row]}>
              <ActionCard style={[styles.actionCard, {backgroundColor: 'black' || "#ff2982", aspectRatio: 1, borderRadius: 12, borderTopRightRadius: 12, borderTopLeftRadius: 12, borderBottomRightRadius: 12}]}>
                <SText style={[styles.actionCardHead, {color: "white", alignSelf: "flex-end", paddingRight: "2%", fontFamily: "SamsungSharpSans-Bold"}]}>Cycle</SText>
                <SmartView onLongPress={() => this.pushNotification({
                  notification: <Notification content={"Connect / Disconnect with your cycle"} key={`notif-${Math.random()}`} iconName={"info"} IconClass={Fontisto} iconSize={15} type={'info'}/>,
                  delay: 0,
                  duration: 4000,
                  popOnEnd: true
                })}>
                  {this.state.cycleConnected?
                  (this.state.cycleLocked?
                  <Fontisto name="locked" size={40} style={[styles.mainIcon, {color: "white", filter: [{dropShadow: "0px 0px 7px rgba(255, 255, 255, 0.57)"}]}]}/>
                    :
                  <MaterialIcons name="power-settings-new" size={40} style={[styles.mainIcon, {color: "white", filter: [{dropShadow: "0px 0px 7px rgb(255, 255, 255)"}]}]}/>
                  )
                  :
                  <ActivityIndicator size={"large"} color={"white"} style={[{}]}/>
                  } 
                </SmartView>  
                <SText style={[{fontSize: 13, color: "white", paddingLeft: "2%", alignSelf: "flex-start", fontFamily: "SamsungSharpSans-Bold"}]}>{this.state.cycleConnected? (this.state.cycleLocked? 'Locked' : 'Unlocked') : 'Connecting'}</SText>
              </ActionCard>
              
              <ActionCard style={[styles.actionCard, {
                                        backgroundColor: "dodgerblue", 
                                        aspectRatio: 1, borderRadius: 0, borderBottomRightRadius: 0, 
                                        borderTopRightRadius: 50, borderBottomLeftRadius: 30,
                                        opacity: this.state.cycleLocked? 0.6 : 1
                                  }]}>
                <SText style={[styles.actionCardHead, {color: "white", alignSelf: "flex-start", paddingLeft: "2%", fontFamily: "SamsungSharpSans-Bold"}]}>Speaker</SText>
                <SmartView onLongPress={() => this.pushNotification({
                  notification: <Notification content={"Connect / Disconnect with your cycle speaker"} key={`notif-${Math.random()}`} iconName={"info"} IconClass={Fontisto} iconSize={15} type={'info'}/>,
                  delay: 0,
                  duration: 4000,
                  popOnEnd: true
                })}>
                  {this.state.speakerSetup?
                  <MaterialIcons name={"bluetooth-audio"} size={35} style={[styles.mainIcon, {color: "white", filter: [{dropShadow: "0px 0px 7px rgb(255, 255, 255)"}]}]}/>
                  :
                  <SText style={[{color: "white", fontSize: 20, position: "relative", top: -4, filter: [{dropShadow: "0px 0px 7px rgb(255, 255, 255)"}]}]}>Setup</SText>
                  }
                </SmartView>
                <View style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", alignSelf: "flex-end"}}>
                  <SText style={[{fontSize: 13, color: "white", alignSelf: "flex-end", paddingRight: "2%", 
                                  fontFamily: "SamsungSharpSans-Bold", display: this.state.speakerSetup? 'flex' : 'none'}]}>
                    Connected
                  </SText>
                </View>
                <View style={{position: "absolute", display: "flex", alignItems: "center", right: 0, borderRadius: "50%", backgroundColor: "rgb(119, 184, 0)", boxShadow: "0px 0px 10px -2px rgba(0, 0, 0, 0.3)"}}>
                  <SmartView onTouchEnd={() => router.navigate('settings/sound')}>
                    <MaterialIcons name={"settings"} size={20} style={{color: "white", padding: 7}}/>
                  </SmartView>
                </View>
              </ActionCard>
              <ActionCard style={[styles.actionCard, 
                                  {borderWidth: 0.0, aspectRatio: 1, borderBottomWidth: 2, 
                                    borderRightWidth: 2, borderLeftWidth: 0, borderTopWidth: 0, 
                                    borderColor: this.state.voipServerConnected ? 'orange' : 'grey', borderRadius: 0, 
                                    borderTopRightRadius: 0, borderTopLeftRadius: 40, borderBottomRightRadius: 35,
                                    opacity: this.state.cycleLocked? 0.6 : 1}]}>
                {this.state.voipServerConnected ? 
                  <MaterialIcons name={"wifi-tethering"} size={15} style={[{color: "orange", position: "absolute", right: 8, top: 5}]}/> 
                    : 
                  <ActivityIndicator size={"small"} color={"purple"} style={[{position: "absolute", right: 8, top: 5}]}/>
                }
                <SText style={[styles.actionCardHead]}>VoIP</SText>
                <View style={[styles.centerRow, {gap: "4%", alignSelf: "center", paddingLeft: 0}]}>
                  <SmartView onTouchEnd={() => this.state.muted ? NativeCycleControl.VoIPUnmute() : NativeCycleControl.VoIPMute()} disabled={!this.state.voipServerConnected}>
                    <MaterialIcons name={this.state.muted ? "mic-off" : "mic"} size={30} style={[styles.mainIcon, {color: this.state.voipServerConnected? (this.state.muted ? "darkred" : "purple") : 'grey'}]}/>
                  </SmartView>
                  <View style={[{display: "flex", flexDirection: "column", alignItems: "center"}]}>
                    <SmartView onTouchEnd={() => this.state.voipConnected? NativeCycleControl.disconnectVoIP() : NativeCycleControl.connectVoIP()} disabled={!this.state.voipServerConnected}>
                      <MaterialIcons name={this.state.voipConnected ? "wifi-calling-3" : "call-end"} size={30} style={[styles.mainIcon, {color: this.state.voipConnected ? "yellowgreen" : "grey"}]}/>
                    </SmartView>
                    <SText style={[{fontSize: 10, color: "grey", position: "absolute", bottom: -10}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Leave' : 'Join') : ''}</SText>
                  </View>
                </View>
                <SText style={[{fontSize: 13, color: "rgb(180, 180, 180)", alignSelf: "flex-start", paddingLeft: "2%"}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Connected' : 'Idle') : 'Connecting'}</SText>
              </ActionCard>
            </View>
          </Animated.View>

          <Animated.View style={[styles.row, {flex: 65, paddingTop: 0, position: "relative", flexWrap: "wrap", right: Animated.multiply(-1, this.state.mainAnim1), filter: this.state.secondPanelBlur}]}>
            <View style={[{gap: 0, width: "100%", alignItems: "flex-end", paddingTop: 0}, styles.column]}>
              <ActionCard style={[styles.actionCard, {width: "100%", aspectRatio: 2}, styles.cassette, {borderColor: "#c065fc", borderBottomLeftRadius: 0, borderTopLeftRadius: 10}]}>
                <Image style={{position: "absolute", width: 150, height: 150, borderRadius: 20, alignSelf: "flex-end"}} source={{uri: this.state.cover}}/>
                <View style={[styles.column, {width: "100%", gap: 3}]}>  
                  <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", paddingTop: 5, paddingLeft: 5, paddingRight: 20}]}>
                    <SText style={[styles.actionCardHead, {fontWeight: 600, fontSize: 15}]}>{this.state.music}</SText>
                  </View>
                  <View>
                    <SText style={[{fontWeight: 400, color: "grey", fontSize: 9, paddingLeft: 5}]}>{this.state.artist}</SText>
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
                  <View style={[styles.centerRow, {gap: 0, width: "80%", alignSelf: "flex-end", paddingRight: 15, display: "none"}]}>
                    <MaterialIcons name={"volume-up"} size={17} style={[styles.mainIcon, styles.lightBorder, {color: "purple", padding: 0, transform: [{rotate: "0deg"}]}]}/>
                    <Slider style={{width: "100%"}}/>
                  </View>
                </View>
              </ActionCard>
              <View style={[styles.row, {gap: "5%", height: "auto", flexWrap: "wrap", justifyContent: "flex-end", paddingRight: 0, paddingLeft: 0, paddingTop: 20, paddingBottom: 0, width: "100%", borderLeftWidth: 0, borderRightWidth: 0, borderColor: "rgba(0, 0, 0, 0.32)", borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: "transparent", elevation: 0}]}>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"search"} name={"Find cycle"} iconStyle={{color: "purple"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"location-on"} name={"Location"} iconStyle={{color: "maroon"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"phonelink-ring"} name={"Ring Cycle"} iconStyle={{color: "coral"}}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"groups-2"} name={"Group Call"} iconStyle={{color: "navy"}} link={'/call'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"settings"} name={"Settings"} iconStyle={{color: "rgb(120, 120, 120)"}} link={'/settings'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"satellite-uplink"} name={"Voice-link"} IconClass={MaterialCommunityIcons} iconStyle={{color: "green"}} link={'/call'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"soundbar"} name={"Soundboard"} IconClass={MaterialCommunityIcons} iconStyle={{color: "rgb(255, 76, 100)"}} link={'/soundboard'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"dashboard"} name={"Dashboard"} iconStyle={{color: "rgb(255, 107, 198)"}} link={'/dashboard'}/>
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"flower"} name={"Setup"} IconClass={MaterialCommunityIcons} iconStyle={{color: "rgb(171, 107, 255)"}} link={'/setup'}/>
              </View>

              
              <ActionCard 
                style={[styles.actionCard, {
                        width: settings.navigationActive? "100%" : "45%", borderWidth: 0.3, aspectRatio: settings.navigationActive? 2 : 1}, 
                        styles.cassette, 
                        {backgroundColor: "white", borderTopLeftRadius: 0, opacity: this.state.cycleLocked? 0.6 : 1}
                        ]
                        }
              >

                {
                  this.state.navigation
                }
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                  <MaterialIcons name={"power-settings-new"} size={35} style={[styles.mainIcon, {color: settings.navigationOn? "green" : "grey"}]}/>
                </View>
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                  <SText style={[{fontSize: 13, color: "rgb(180, 180, 180)"}]}>{settings.navigationOn? 'ON' : 'OFF'}</SText>
                </View>
              </ActionCard>

            </View>
          </Animated.View>

        </View>
        <View style={[{paddingTop: 20, width: "0%", alignItems: "flex-end", position: "absolute", paddingRight: 20}, styles.column]}>
          
        </View>
      </View>



    </ScrollView>

}

const styles = StyleSheet.create({
  cassette: {
    borderRadius: 17, //5
    borderWidth: 0.0,
    borderBottomWidth: 0, //.6
    borderColor: 'rgba(100, 100, 100, 0.4)',
    borderBottomColor: 'rgb(0, 0, 0)',
    backgroundColor: "white",
    borderColor: 'rgba(20, 20, 20, 0.85)',
    borderBottomRightRadius: 0, 
    borderBottomLeftRadius: 15, //0
    borderTopRightRadius: 0,
    borderRightWidth: 3,
    borderColor: "green",
    elevation: 0,
    boxShadow: "0px 4px 25px 0px rgba(30, 30, 30, 0.13)",
    boxShadow: "none",
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
    width: 50, 
    height: 50, 
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  actionCardHead: {
    fontSize: 16, 
    paddingTop: 0, 
    fontWeight: 600
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