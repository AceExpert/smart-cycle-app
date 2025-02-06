import { Component } from "react";

import { Text, View, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActionCard from "./actioncard";

export default class LauncherIcon extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
  
      }
    }
  
    render = () => 
        <View style={[styles.column, {alignItems: "center", gap: 3}]}>
            <ActionCard style={this.props.style}>
                <MaterialIcons name={this.props.icon} size={35} style={[styles.mainIcon, styles.lightBorder, this.props.iconStyle]}/>
            </ActionCard>
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