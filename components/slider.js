import { Component, createRef } from "react";

import { Text, View, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default class Slider extends Component {

    constructor(props) {
      super(props);
      this.props = props;
      this.trackRef = createRef();
      this.state = {
      }
    }
  
    componentDidMount() {
    }

    render = () => 
        <View style={[styles.row, {width: this.props?.style?.width ?? "100%", padding: 6, height: 10}]}>
            <View 
                ref={this.trackRef}
                style={[styles.row, {width: this.props?.style?.width ?? "100%", height: 1, backgroundColor: "rgba(100, 100, 100, 0.3)", borderRadius: 10}]}>
                <View style={[styles.thumb,
                    {position: "absolute"}, {left: this.props.pos ? this.props.pos + "%" : 0}
                ]}></View>
            </View>
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
    },
    thumb: {
        width: 10, 
        height: 10, 
        backgroundColor: "white", 
        borderRadius: 10,
        elevation: 0,
        borderWidth: 1.0,
        borderColor: "rgba(100, 100, 100, 0.4)"
    },
})