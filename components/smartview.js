import { Component } from "react";

import { Text, View, StyleSheet, ImageBackground } from "react-native";

export default class SmartView extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        display: "none",
        timer: null,
      }
    }
  
    render = () => 
        <View 
            style={[this.props?.style]} 
            onStartShouldSetResponder={evt => true}
            onResponderGrant={evt => {
                this.props?.onTouchStart?.(evt);
                console.log("yes")
                if(this.props.tooltip) {
                    this.setState({
                        display: "flex",
                        timer: setTimeout(() => this.setState({display: "none", timer: null}), 5000)
                    })
                }
            }}
            onResponderRelease={
                evt => {
                    this.props?.onTouchEnd?.(evt);
                    if(this.state.timer) {
                        clearTimeout(this.state.timer);
                        this.setState({timer: null, display: "none"});
                    }
                }
            }
        >
            <View style={[styles.row, {position: "absolute", display: this.state.display, zIndex: 10, right: 0, bottom: 70}]}>
                <View style={[{padding: 4, filter: "blur(0px)", borderWidth: 0, borderColor: "black", backgroundColor: "black", borderRadius: 3}]}>
                    <Text style={[{fontSize: 12, color: 'white'}]}>{this.props.tooltip}</Text>
                </View>
            </View>
            {this.props.children}
        </View>
  
}
  
const styles = StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})