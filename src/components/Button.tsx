import { View, Text } from "./Themed"
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  GestureResponderEvent,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
  Easing,
} from "react-native"
import { useState } from "react"
import Colors from "../constants/Colors"
import styled from "styled-components/native"

interface Props {
  onPress?(event: GestureResponderEvent): void
  children: React.ReactNode
  disabled?: boolean
  width: number
  height: number
  isLoading?: boolean
  style?: TextStyle
}

export function Button({
  onPress,
  children,
  disabled,
  height,
  width,
  isLoading = false,
  style,
}: Props) {
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
    <Animated.View style={[{ flex: 1 }, animatedStyles]}>
      <Container
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || isLoading}
        width={width}
        height={height}
        style={style}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>{children}</ButtonText>
        )}
      </Container>
    </Animated.View>
  )
}

const Container = styled(Pressable)<{ width: number; height: number }>`
  background-color: ${(p) => (p.disabled ? "grey" : Colors.dark.searchButton)};
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`
