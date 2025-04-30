import { useEffect, useState } from "react";

import { View, StyleSheet, Animated, useAnimatedValue } from "react-native";

import SmartView from "./smartview";

export default function Switch({defaultValue = false, onClick, style, ...props}) {
    let [value, setValue] = useState(defaultValue);
    let translate = useAnimatedValue(value? 50 - 20.9 - 3 : 3);

    useEffect(() => {
        Animated.timing(translate, {
            toValue: value? 50 - 20.9 - 3 : 3,
            duration: 100,
            useNativeDriver: true,
        }).start()
    }, [value])

    return (
        <SmartView onTouchEnd={() => {
            onClick?.(!value);
            setValue(!value);
        }} touchFeedback={false}>
            <View style={[styles.switch, {backgroundColor: value? 'mediumpurple' : 'grey'}]}>
                <Animated.View style={[styles.thumb, {transform: [{translateX: translate}]}]}>

                </Animated.View>
            </View>
        </SmartView>
    )
}

const styles = StyleSheet.create({
    switch: {
        height: 28,
        width: 50,
        borderRadius: 10,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row'
    },
    thumb: {
        backgroundColor: 'white',
        borderRadius: 7,
        height: 20.9,
        aspectRatio: 1,
    }
})