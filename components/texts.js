import { Text } from "react-native";

export default function SText({children, style, ...props}) {
    return <Text {...props} style={[style, {fontFamily: "SamsungSharpSans-Bold"}]}>{children}</Text>
}