import { ReactNode } from "react"
import { ThemeProvider } from "styled-components/native"
import useColorScheme from "../hooks/useColorScheme"
import { getTheme } from "../constants/theme"
interface Props {
  children: ReactNode
}

export default function ComponentsProvider({ children }: Props) {
  const colorScheme = useColorScheme()
  return <ThemeProvider theme={getTheme(colorScheme)}>{children}</ThemeProvider>
}
