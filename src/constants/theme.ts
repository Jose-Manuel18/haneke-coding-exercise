import { ColorSchemeName } from "react-native"
import Colors from "./Colors"

export const getTheme = (colorScheme: NonNullable<ColorSchemeName>) => {
  const defaultTheme = {
    spacing: 8,
    colors: Colors.light,
  }

  if (colorScheme === "dark") {
    defaultTheme.colors = Colors.dark
  }

  return defaultTheme
}

export type ITheme = ReturnType<typeof getTheme>
