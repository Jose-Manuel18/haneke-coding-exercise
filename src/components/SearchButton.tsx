import { View, Text } from "./Themed"
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  GestureResponderEvent,
} from "react-native"
import { useState } from "react"
import Colors from "../constants/Colors"
interface Props {
  onPress?(event: GestureResponderEvent): void
}
export function SearchButton({ onPress }: Props) {
  const [scaleAnimation] = useState(new Animated.Value(1))

  const handlePressIn = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0.9,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  const animatedStyles = {
    transform: [{ scale: scaleAnimation }],
  }
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Pressable
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Text style={[styles.buttonText]}>Search</Text>
      </Pressable>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.dark.searchButton,
    height: 32,
    width: 98,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
