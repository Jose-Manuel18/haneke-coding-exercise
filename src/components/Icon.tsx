import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ComponentProps } from "react"
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native"
interface IconProps {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"]
  size: number
  color: string
  disabled?: boolean
  onPress?(event: GestureResponderEvent): void
  style?: StyleProp<ViewStyle>
}
export function Icon({
  name,
  size,
  color,
  disabled,
  onPress,
  style,
}: IconProps) {
  return (
    <MaterialCommunityIcons
      style={style}
      name={name}
      size={size}
      color={color}
      disabled={disabled}
      onPress={onPress}
    />
  )
}
