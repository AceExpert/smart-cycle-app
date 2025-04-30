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