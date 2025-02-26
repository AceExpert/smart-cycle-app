import { View, StyleSheet } from "react-native";

import SText from "./texts";

export default function NavigationTemplate({distance, direction, meta}) {
    return (
        <View style={[styles.column, {width: "100%", gap: 1, padding: 2}]}>
            <View style={[styles.row, {width: "100%", justifyContent: "space-between"}]}>
                <SText style={[{fontSize: 19, fontWeight: "bold"}]}>{distance}</SText>
                <SText style={{color: "grey", fontSize: 10}}>{meta}</SText>
            </View>
            <SText style={{color: "rgb(110, 110, 110)", fontSize: 13}}>{direction}</SText>
        </View>
    )
};

const styles = StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    }
})