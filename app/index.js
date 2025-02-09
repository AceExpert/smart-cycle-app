import { Component } from "react";

import { Text, View, StyleSheet, NativeModules, ScrollView, Switch, DeviceEventEmitter, Image, Dimensions } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActionCard from "../components/actioncard";
import LauncherIcon from "../components/launchericon";
import Slider from "../components/slider";
import SmartView, {ChatView} from "../components/smartview";
import NavigationTemplate from "../components/navitemplate";

import NativeCycleControl from "../specs/NativeCycleControl"

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
      muted: true
    };
  }

  componentDidMount() {
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
    NativeCycleControl.init(() => {})
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
    DeviceEventEmitter.removeAllListeners();
  }

  render = () => 
    <ScrollView style={[{width: "100%", height: "100%"}, styles.column]}>
      <View style={[styles.row, {width: "100%", padding: 20, paddingTop: 10, justifyContent: "space-between", height: "100%"}]}>
        <ChatView style={[{paddingTop: 20, gap: 20, width: 240}, styles.column]}>
          <ActionCard style={[styles.actionCard, {backgroundColor: "#ff2982"}]}>
            <Text style={[styles.actionCardHead, {color: "white"}]}>Cycle</Text>
            <SmartView tooltip={"Connect to cycle"}>
              <MaterialIcons name="power-settings-new" size={52} style={[styles.mainIcon, {color: "white"}]}/>
            </SmartView>
            <Text style={[{fontSize: 13, color: "white"}]}>Connected</Text>
          </ActionCard>
          <ActionCard style={[styles.actionCard, {backgroundColor: "dodgerblue"}]}>
            <Text style={[styles.actionCardHead, {color: "white"}]}>Speaker</Text>
            <MaterialIcons name={"bluetooth-audio"} size={52} style={[styles.mainIcon, {color: "white"}]}/>
            <Text style={[{fontSize: 13, color: "white"}]}>Connected</Text>
          </ActionCard>
          <ActionCard style={[styles.actionCard, {borderWidth: 0.0, borderLeftWidth: 3, borderColor: 'orange'}]}>
            <Text style={[styles.actionCardHead]}>VoIP</Text>
            <View style={[styles.centerRow, {gap: 10, alignSelf: "flex-start", paddingLeft: 10}]}>
              <SmartView onTouchEnd={() => this.state.muted ? NativeCycleControl.VoIPUnmute() : NativeCycleControl.VoIPMute()}>
                <MaterialIcons name={this.state.muted ? "mic-off" : "mic"} size={35} style={[styles.mainIcon, {color: this.state.muted ? "darkred" : "purple"}]}/>
              </SmartView>
              <SmartView onTouchEnd={() => this.state.voipConnected? NativeCycleControl.disconnectVoIP() : NativeCycleControl.connectVoIP()}>
                <MaterialIcons name={this.state.voipConnected ? "wifi-calling-3" : "call-end"} size={35} style={[styles.mainIcon, {color: this.state.voipConnected ? "yellowgreen" : "grey"}]}/>
              </SmartView>
            </View>
            <Text style={[{fontSize: 13, color: "rgb(180, 180, 180)"}]}>{this.state.voipConnected? 'Connected' : 'Disconnected'}</Text>
          </ActionCard>
          <ActionCard style={[styles.actionCard, {width: 240, borderWidth: 0., marginTop: 8, height: "auto", gap: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 3, borderColor: "dodgerblue"}]}>
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
        </ChatView>
      </View>

      <View style={[{paddingTop: 20, width: "100%", alignItems: "flex-end", position: "absolute", paddingRight: 20}, styles.column]}>
        <View style={[styles.column, {width: this.screenWidth - 40 - 240 + 70, paddingTop: 10}]}>
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
          <View style={[{gap: 20, width: "100%", alignItems: "flex-end", paddingTop: 10}, styles.column]}>
            <ActionCard style={[styles.actionCard, {width: "100%", minHeight: 150}, styles.cassette, {borderColor: "#c065fc"}]}>
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
            <View style={[styles.row, {gap: 20, height: "auto", flexWrap: "wrap", justifyContent: "flex-end", paddingLeft: 0}]}>
              <LauncherIcon style={[styles.actionCard, styles.actionIcon]} icon={"search"} name={"Find cycle"} iconStyle={{color: "purple"}}/>
              <LauncherIcon style={[styles.actionCard, styles.actionIcon]} icon={"location-on"} name={"Location"} iconStyle={{color: "maroon"}}/>
              <LauncherIcon style={[styles.actionCard, styles.actionIcon]} icon={"phonelink-ring"} name={"Ring Cycle"} iconStyle={{color: "coral"}}/>
              <LauncherIcon style={[styles.actionCard, styles.actionIcon]} icon={"settings"} name={"Settings"} iconStyle={{color: "rgb(120, 120, 120)"}}/>
            </View>

            <ActionCard style={[styles.actionCard, {width: "100%", borderWidth: 0.3}, styles.cassette, {backgroundColor: "white"}]}>

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
        </View>
      </View>

    </ScrollView>

}

const styles = StyleSheet.create({
  cassette: {
    borderRadius: 15, //5
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
    backgroundColor: "transparent",
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