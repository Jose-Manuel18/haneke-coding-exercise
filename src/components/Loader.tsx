import { ActivityIndicator } from "react-native"
import Colors from "../constants/Colors"
import { View } from "./Themed"

export function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <ActivityIndicator size="large" color={Colors.dark.searchButton} />
    </View>
  )
}
