import styled from "styled-components/native"

export const Block = styled.View<{
  size?: number
  flex?: boolean
  width?: number
}>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: ${(props) => props.size || props.theme.spacing * 2}px;
  ${(props) =>
    props.flex
      ? `
    flex: 1;
  `
      : ""}
`
