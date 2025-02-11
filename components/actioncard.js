import { Component } from "react";

import { Text, View, StyleSheet } from "react-native";

export default class ActionCard extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
  
      }
    }
  
    render = () => 
      <View style={[styles.column, styles.actionCard, ...(this.props?.style?.constructor === Array? this.props.style : [this.props.style])]}>
        {this.props.children}
      </View>
  
  }
  
  const styles = StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
    },
    actionCard: {
        height: 150,
        width: 150,
        backgroundColor: "white",
        borderRadius: 25,
        elevation: 30,
        shadowColor: "rgba(00, 00, 00, 0.4)",
        borderWidth: 0.0,
        borderBottomWidth: 0.0,
        borderColor: "rgba(90, 90, 90, .4)"
    }
  })