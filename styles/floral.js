import { StyleSheet } from "react-native";

const Floral = {
    petal1: function(r1 = 25, r2 = 15){
        return {
            borderRadius: r1,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: r2
        }
    },
    petal2: function(r1 = 25, r2 = 15){
        return {
            borderRadius: r1,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: r2
        }
    },
    petal3: function(r1 = 25, r2 = 15){
        return {
            borderRadius: r1,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: r2
        }
    },
    petal4: function(r1 = 25, r2 = 15){
        return {
            borderRadius: r1,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: r2
        }
    },
}

export default Floral;