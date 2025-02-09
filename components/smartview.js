import React, { Component } from "react";

import { Text, View, StyleSheet, ImageBackground } from "react-native";

export default class SmartView extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.view = React.createRef()
      this.state = {
        display: "none",
        timer: null,
        touch: false
      }
    }
  
    render = () => 
        <View 
            style={[this.props?.style, {padding: 1, backgroundColor: this.state.touch ? "rgba(107, 107, 107, 0.2)" : "rgba(0, 0, 0, 0)", borderRadius: "50%"}]}
            ref={this.view}
            onStartShouldSetResponder={evt => true}
            onResponderGrant={evt => {
                this.props?.onTouchStart?.(evt);
                this.setState({touch: true})
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
                    this.setState({touch: false})
                    if(this.state.timer) {
                        clearTimeout(this.state.timer);
                        this.setState({timer: null, display: "none", touch: false});
                    }
                }
            }
        >
            {this.props?.tooltip ?
            <View style={[styles.row, {position: "absolute", display: this.state.display, zIndex: 10, left: 20, bottom: 70}]}>
                <View style={[{padding: 4, filter: "blur(0px)", borderWidth: 0, borderColor: "black", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 3}]}>
                    <Text style={[{fontSize: 12, color: 'white'}]}>{this.props.tooltip}</Text>
                </View>
            </View> : null}
            {this.props.children}
        </View>
  
}

export class ChatView extends Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render = () => 
        <View style={[this.props.style]}>
            {this.props.children.map((elem, ind, {length}) => {
                {
                    elem.props.style.push({...(ind < length - 1 ? {borderBottomLeftRadius: 0} : {}), ...(ind > 0 ? {borderTopLeftRadius: 0} : {})})
                    return elem
                }
            })}
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