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
        <View style={[styles.row, {width: this.props?.style?.width ?? "100%", padding: 9, height: 16}]}>
            <View 
                ref={this.trackRef}
                style={[styles.row, {width: this.props?.style?.width ?? "100%", height: 2, backgroundColor: "rgba(100, 100, 100, 0.4)", borderRadius: 10}]}>
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
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(100, 100, 100, 0.4)"
    },
})