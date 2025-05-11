{/*<View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
    <View style={{display: "flex", alignItems: "flex-start", alignSelf: "center", flexDirection: "column", gap: 5, alignSelf: "flex-start", marginLeft: 30}}>
        <View style={{display: "flex", flexDirection: "row", gap: 5, alignItems: "flex-end"}}>
        <View style={[Floral.petal1(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "dodgerblue", width: 150, height: 150, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: "rgb(0, 90, 192)", boxShadow: "-5px 5px 25px 0px rgba(0, 0, 0, 0.15)"}]}>
            <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>
            <SText style={[styles.actionCardHead, {color: "white", alignSelf: "flex-start", marginTop: -0, marginLeft: 0}]}>Speaker</SText>
                <MaterialIcons name={"bluetooth-audio"} size={52} style={[styles.mainIcon, {color: "white"}]}/>
            <SText style={[{fontSize: 13, color: "white", alignSelf: "flex-end"}]}>Connected</SText>
            </View>
        </View>
        <View style={[Floral.petal2(100, 70), {display: "flex", flexDirection: "column", backgroundColor: "white", width: 150, height: 150, borderBottomWidth: 3, borderRightWidth: 3, borderColor: this.state.voipServerConnected ? 'orange' : 'grey', boxShadow: "5px 5px 35px -4px rgba(0, 0, 0, 0.1)"}]}>
            <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 10, justifyContent: "space-between", alignItems: "center"}}>
            {this.state.voipServerConnected ? 
                <MaterialIcons name={"wifi-tethering"} size={15} style={[{color: "orange", position: "absolute", right: 3, top: 3}]}/> 
                : 
                <ActivityIndicator size={"small"} color={"purple"} style={[{position: "absolute", right: 8, top: 5}]}/>
            }
            <SText style={[styles.actionCardHead, {alignSelf: "center", paddingLeft: 50}]}>VoIP</SText>
            <View style={[styles.centerRow, {gap: 10, alignSelf: "flex-start", paddingLeft: 0, alignSelf: "center"}]}>
                <SmartView onTouchEnd={() => this.state.muted ? NativeCycleControl.VoIPUnmute() : NativeCycleControl.VoIPMute()} disabled={!this.state.voipServerConnected}>
                <MaterialIcons name={this.state.muted ? "mic-off" : "mic"} size={35} style={[styles.mainIcon, {color: this.state.voipServerConnected? (this.state.muted ? "darkred" : "purple") : 'grey'}]}/>
                </SmartView>
                <View style={[{display: "flex", flexDirection: "column", alignItems: "center"}]}>
                <SmartView onTouchEnd={() => this.state.voipConnected? NativeCycleControl.disconnectVoIP() : NativeCycleControl.connectVoIP()} disabled={!this.state.voipServerConnected}>
                    <MaterialIcons name={this.state.voipConnected ? "wifi-calling-3" : "call-end"} size={35} style={[styles.mainIcon, {color: this.state.voipConnected ? "yellowgreen" : "grey"}]}/>
                </SmartView>
                <SText style={[{fontSize: 10, color: "grey", position: "absolute", bottom: -10}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Leave' : 'Join') : ''}</SText>
                </View>
            </View>
            <SText style={[{fontSize: 13, color: "rgb(180, 180, 180)", alignSelf: "flex-start"}]}>{this.state.voipServerConnected? (this.state.voipConnected? 'Connected' : 'Idle') : 'Connecting'}</SText>
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
            <SText style={[styles.actionCardHead, {alignSelf: "flex-start", paddingLeft: 0, paddingTop: 0}]}>Sound</SText>
            <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", padding: 0, alignItems: "center", paddingRight: 40, alignSelf: "flex-start"}]}>
                <SText style={[{paddingLeft: 0, paddingTop: 0, color: "grey", fontWeight: 500}]}>Startup</SText>
                <Switch />
            </View>
            
            <View style={[styles.centerRow, {justifyContent: "space-between", width: "100%", padding: 0, flexWrap: "wrap", paddingRight: 20}]}>
                <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"library-music"} name={"Default"} iconStyle={{color: "purple", padding: 0}}/>
                <LauncherIcon style={[styles.transparent, styles.actionIcon]} icon={"add"} name={"Custom"} iconStyle={{color: "grey", padding: 0}}/>
            </View>

            <View style={[styles.centerRow, {justifyContent: 'space-between', width: "100%", paddingLeft: 20}]}>
                <SText style={[{paddingLeft: 9, paddingTop: 5, color: "grey", fontWeight: 500}]}>Stand-by</SText>
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

{/*<View style={{display: "flex", flexDirection: "row", gap: 3}}>
<View style={{display: "flex", flexDirection: "column", gap: 3, paddingLeft: 3, alignSelf: "flex-end", alignItems: "flex-end"}}>
    <View style={[Floral.petal1(15), {backgroundColor: "white", width: 24, height: 24, boxShadow: "-0px -0px 10px 0px rgba(20, 20, 20, 0.1)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}></View>
    <View style={[Floral.petal2(15), {backgroundColor: "white", width: 28, height: 28, boxShadow: "-0px 5px 20px -2px rgba(20, 20, 20, 0.2)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}>
    </View>
</View>
<View style={{display: "flex", flexDirection: "column", gap: 3, paddingLeft: 0}}>
    <View style={[Floral.petal3(18, 20), {backgroundColor: "white", padding: 5, boxShadow: "0px 0px 10px 0px rgba(20, 20, 20, 0.1)", elevation: 0, shadowColor: "rgba(0, 0, 0, 0.3)", borderWidth: 0.0, borderColor: "rgba(58, 58, 58, 0.2)"}]}>
    <SText style={{fontSize: 23, fontWeight: 600, paddingRight: 3, paddingLeft: 3}}>Cytroid</SText>
    </View>
    <View style={[Floral.petal4(15), {backgroundColor: "white", width: 24, height: 24, boxShadow: "0px 5px 20px -2px rgba(20, 20, 20, 0.2)", elevation: 0, shadowColor: "rgba(100, 100, 100, 0.3)", borderWidth: 0.0, borderColor: "rgba(0, 0, 0, 0.2)"}]}>
    </View>
</View>
</View>*/}

//Entire layout using flex box before making everything absolute
{/*
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
                <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"location-on"} name={"Location"} iconStyle={{color: "maroon"}} onClick={() => NativeCycleControl.openMap()}/>
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
                    width: settings.navi_active? "100%" : "45%", borderWidth: 0.3, aspectRatio: settings.navi_active? 2 : 1}, 
                    styles.cassette, 
                    {backgroundColor: "white", borderTopLeftRadius: 0, opacity: this.state.cycleLocked? 0.6 : 1}
                    ]
                    }
            >

            {
                this.state.navigation
            }
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                    <MaterialIcons name={"power-settings-new"} size={35} style={[styles.mainIcon, {color: settings.navi? "green" : "grey"}]}/>
                </View>
                <View style={[styles.centerRow, {justifyContent: "space-around", width: "100%"}]}>
                    <SText style={[{fontSize: 13, color: "rgb(180, 180, 180)"}]}>{settings.navi? 'ON' : 'OFF'}</SText>
                </View>
            </ActionCard>

        </View>
        </Animated.View>

    </View>
    <View style={[{paddingTop: 20, width: "0%", alignItems: "flex-end", position: "absolute", paddingRight: 20}, styles.column]}>
        
    </View>

    */}