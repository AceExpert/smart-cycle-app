import { View, Text, StyleSheet } from "react-native";

export default function NavigationTemplate({distance, direction, meta}) {
    return (
        <View style={[styles.column, {width: "100%", gap: 1, padding: 2}]}>
            <View style={[styles.row, {width: "100%", justifyContent: "space-between"}]}>
                <Text style={[{fontSize: 19, fontWeight: "bold"}]}>{distance}</Text>
                <Text style={{color: "grey", fontSize: 10}}>{meta}</Text>
            </View>
            <Text style={{color: "rgb(110, 110, 110)", fontSize: 13}}>{direction}</Text>
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