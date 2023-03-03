import { ITheme } from "./theme"

declare module "styled-components/native" {
  export interface DefaultTheme extends ITheme {}
}
