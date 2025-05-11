{
    <DragonView gapX={10} gapY={10}>
            
        <View style={[{justifyContent: "space-between", width: "100%", paddingLeft: "2%", paddingRight: "2%"}, styles.centerRow, {display: "none"}]} ddims={{width: this.screenWidth, aspectRatio: 0}}>
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
        
        <ActionCard style={[styles.actionCard, {backgroundColor: 'black' || "#ff2982", aspectRatio: 1, borderRadius: 12, borderTopRightRadius: 12, borderTopLeftRadius: 12, borderBottomRightRadius: 12}]}  
                    ddims={{width: this.screenWidth * .30, aspectRatio: 1}}>
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
                                    borderRadius: 12, borderBottomRightRadius: 12, 
                                    borderTopRightRadius: 50, borderBottomLeftRadius: 12,
                                    opacity: this.state.cycleLocked? 0.6 : 1
                            }]} ddims={{width: this.screenWidth * .30, aspectRatio: 1}}>
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
                            {borderWidth: 0.0, borderBottomWidth: 2, 
                                borderRightWidth: 2, borderLeftWidth: 0, borderTopWidth: 0, 
                                borderColor: this.state.voipServerConnected ? 'orange' : 'grey', borderRadius: 0, 
                                borderTopRightRadius: 0, borderTopLeftRadius: 40, borderBottomRightRadius: 35,
                                opacity: this.state.cycleLocked? 0.6 : 1}]} 
                    ddims={{width: this.screenWidth * .3, aspectRatio: 1}}
        >
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

        <ActionCard 
            style={[styles.actionCard, {borderWidth: 0.3, borderRadius: 12, borderColor: "black"},
                    {backgroundColor: "white", opacity: this.state.cycleLocked? 0.6 : 1}
                    ]
                    }
            ddims={{width: this.screenWidth * .3, aspectRatio: settings.navi_active? 2 : 1}}
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

        <ActionCard style={[styles.actionCard, styles.cassette, {borderColor: "#c065fc", borderBottomLeftRadius: 12, borderRadius: 12}]} 
                    ddims={{width: this.screenWidth * .80, aspectRatio: 2}}>
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

        <View style={[{width: "100%", height: "100%"}]} ddims={{width: this.screenWidth, aspectRatio: 0.5}}>
            <DragonView maxWidth={this.screenWidth * 0.9} gapX={20} gapY={30}>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"search"} name={"Find cycle"} iconStyle={{color: "purple"}} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"location-on"} name={"Location"} iconStyle={{color: "maroon"}} onClick={() => NativeCycleControl.openMap()} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"phonelink-ring"} name={"Ring Cycle"} iconStyle={{color: "coral"}} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"groups-2"} name={"Group Call"} iconStyle={{color: "navy"}} link={'/call'} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"settings"} name={"Settings"} iconStyle={{color: "rgb(120, 120, 120)"}} link={'/settings'} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopRightRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"satellite-uplink"} name={"Voice-link"} IconClass={MaterialCommunityIcons} iconStyle={{color: "green"}} link={'/call'} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"soundbar"} name={"Soundboard"} IconClass={MaterialCommunityIcons} iconStyle={{color: "rgb(255, 76, 100)"}} link={'/soundboard'} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: 30, borderBottomRightRadius: 20}].slice(0, -1)} icon={"dashboard"} name={"Dashboard"} iconStyle={{color: "rgb(255, 107, 198)"}} link={'/dashboard'} ddims={{width: 50, aspectRatio: 1}}/>
            <LauncherIcon style={[styles.actionCard, styles.actionIcon, {borderRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 20}].slice(0, -1)} icon={"flower"} name={"Setup"} IconClass={MaterialCommunityIcons} iconStyle={{color: "rgb(171, 107, 255)"}} link={'/setup'} ddims={{width: 50, aspectRatio: 1}}/>
            </DragonView>
        </View>


    </DragonView>
}