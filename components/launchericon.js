import { Component } from "react";

import { Text, View, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActionCard from "./actioncard";
import SmartView from "./smartview";

export default class LauncherIcon extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        touch: false
      }
    }
  
    render = () =>
        <View style={[styles.column, {alignItems: "center", gap: 3}]}> 
            <SmartView 
                touchFeedback={false} 
                link={this.props.link}
                onTouchStart={() => {
                    this.setState({touch: true})
                }}
                onTouchEnd={() => {
                    this.setState({touch: false})
                }}
            >
                <ActionCard style={[this.props.style, {backgroundColor: this.state.touch? 'rgb(200, 200, 200)': 'white'}]}>
                    <MaterialIcons name={this.props.icon} size={35} style={[styles.mainIcon, styles.lightBorder, this.props.iconStyle]}/>
                </ActionCard>
            </SmartView>
            <Text style={[styles.iconText]}>{this.props.name}</Text>
        </View>
  
}
  
const styles = StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
    },
    iconText: {
        fontSize: 10,
        color: "grey"
    },  
    lightBorder: {
        borderWidth: 0.0, 
        borderColor: "grey", 
    },
    mainIcon: {
        borderRadius: 100, 
        padding: 4
    },
})