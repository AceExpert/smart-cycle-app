import { Component } from "react";

import { View, StyleSheet, ImageBackground } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import SText from "./texts";

export default class CallCard extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }

    componentDidMount() {

    }

    render = () =>
        <View style={[{width: "100%", display: "flex", flexDirection: "column", elevation: 0, backgroundColor: "rgba(255, 255, 255, 0)", borderLeftColor: this.props.sideColor ?? "green", borderLeftWidth: 0 && (this.props.sideWidth ?? 5)}]}>
            <View style={[styles.card, this.props.style ?? {}]}>
                <View style={[styles.avatar]}>
                    <ImageBackground 
                        style={[{width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden"}]}
                        source={{uri: this.props?.avatar ?? 'https://cdn-icons-png.flaticon.com/512/11195/11195149.png'}}>
                        
                    </ImageBackground>
                </View>
                <View style={[{flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
                    <View style={[styles.infoSide, {justifyContent: "center"}]}>
                        <SText style={{fontSize: 14, fontWeight: 600}}>{this.props?.name ?? 'Joe Daniel'}</SText>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                            {this.props.online? 
                                <Ionicons name={'bicycle'} size={13} style={[{color: "green"}]}/> :
                                <FontAwesome name={'bicycle'} size={13} style={[{color: 'grey'}]}/>
                            }
                            <SText style={[{fontSize: 9, color: 'grey'}]}>{this.props.online? 'Cycling' : 'Offline'}</SText>
                            <View style={{height: "100%", width: 1, backgroundColor: "rgba(100, 100, 100, 0.3)"}}></View>
                            <MaterialIcons name={!this.props.online? 'call-end' : this.props.joined? 'call' : 'call-end'} size={11} style={[{color: !this.props.online? 'grey' : this.props.joined? 'green' : 'orange'}]}/>
                            <SText style={[{fontSize: 9, color: 'grey'}]}>{this.props.joined? 'In call' : 'Not in call'}</SText>
                        </View>
                    </View>
                    <View style={[{display: "flex", flexDirection: "row", gap: 18, alignItems: "center", paddingRight: 10}]}>
                        <MaterialIcons name={this.props.joined? 'wifi-calling-3' : 'add-call'} size={20} style={[{color: this.props.joined? 'green' : 'black'}]}/>
                        <MaterialIcons name={this.props.online? (this.props.muted === false? 'mic' : 'mic-off') : 'mic-off'} size={20} style={[{color: this.props.online? (this.props.muted === false? 'purple' : 'darkred') : 'grey'}]}/>
                    </View>
                </View>
            </View>
        </View>

}

export function ActionIconType1(
    {
        radius, latch, children, leftPad, mainPad, 
        iconName, IconClass, text, iconSize, iconColor, 
        height, width, style, iconStyle, ...others
    }) {
    let bRadius = radius ?? 13
    let fLatch = latch || 'center'
    return (
        <View style={[
            styles.memberCard, 
            {
                width: "auto",
                [`padding${fLatch === 'left'? 'Left' : 'Right'}`]: fLatch !== 'center'? leftPad ?? 0 : 0,
                ...(fLatch === 'right'? {
                    borderTopRightRadius: 0, 
                    borderBottomRightRadius: 0, 
                    borderBottomLeftRadius: bRadius, 
                    borderTopLeftRadius: bRadius
                    } : fLatch === 'left' ? {
                        borderTopRightRadius: bRadius, 
                        borderBottomRightRadius: bRadius, 
                        borderBottomLeftRadius: 0, 
                        borderTopLeftRadius: 0
                    } : {
                        borderTopRightRadius: bRadius, 
                        borderBottomRightRadius: bRadius, 
                        borderBottomLeftRadius: bRadius, 
                        borderTopLeftRadius: bRadius
                    }),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...(style ?? {}),
            }
        ]}>
            <View style={[{padding: mainPad ?? 7, display: "flex", alignItems: "center", width: width || 'auto', height: height || 'auto'}]}>
                {iconName? 
                  <IconClass name={iconName} size={iconSize ?? 23} style={[{color: iconColor ?? 'black'}, ...(iconStyle?.constructor === Array? iconStyle : [iconStyle])]}/>
                  : text?
                  <SText style={[{fontSize: 18, fontWeight: 500}]}>{text}</SText> : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderBottomColor: 'rgba(200, 200, 200, 0.5)',
        borderBottomWidth: 0.5, //1
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderTopColor: 'rgba(220, 220, 220, 0.4)',
        borderRightColor: 'rgba(220, 220, 220, 0.4)',
        paddingTop: 2,
        paddingBottom: 2,
    },
    avatar: {
        display: "flex",
        width: 45,
        height: 45,
        padding: 5,
        borderRadius: 30
    },
    infoSide: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    memberCard: {
        backgroundColor: "white",
        borderRadius: 17,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: "100%",
        elevation: 0,
        shadowColor: "rgba(20, 20, 20, .4)",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderColor: "grey",
        borderWidth: 0.0,
        boxShadow: "0px 3px 25px 0px rgba(0,0,0,0.05)",
    },
})