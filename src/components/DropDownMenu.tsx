import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native"
import React, { useEffect, useState } from "react"
import { View } from "./Themed"
import Colors from "../constants/Colors"
import styled from "styled-components/native"
import { ParameterStateProps } from "../../app/(spaceTour)"
import { Block } from "./Block"
interface DropDownMenuProps {
  toggleClose: (value: boolean) => void
  setParameter: (value: ParameterStateProps) => void
  selectedParameter?: string
  dropDownState: boolean
}

export function DropDownMenu({
  toggleClose,
  setParameter,
  selectedParameter,
  dropDownState,
}: DropDownMenuProps) {
  const scaleValue = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: dropDownState ? 1 : 0.1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [toggleClose])
  const options = [
    { name: "ROCKET NAME", parameter: "rockets" },
    { name: "MISSION NAME", parameter: "missions" },
    { name: "LAUNCH YEAR", parameter: "launches" },
    { name: "ROCKET TYPE", parameter: "rockets" },
  ]
  const filteredOptions = options.filter(
    (option) => option.name !== selectedParameter,
  )

  return (
    <Container>
      {dropDownState && (
        <Animated.View
          style={{
            flex: 1,
            width: 216,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: Colors.dark.blueBackground,
            opacity: scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: scaleValue.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [0.5, 1.2],
                }),
              },
            ],
          }}
        >
          <FlatList
            data={filteredOptions}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <Block size={8} />}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <InnerContainer
                  onPress={() => {
                    setParameter(item)
                    toggleClose(false)
                  }}
                >
                  <Text
                    style={{
                      color: Colors.dark.blueBackground,
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                </InnerContainer>
              )
            }}
          />
        </Animated.View>
      )}
    </Container>
  )
}
const Container = styled.View`
  flex: 1;
  left: 21px;
  top: 43px;
  position: absolute;
`
const InnerContainer = styled.Pressable`
  max-width: 195px;
  max-height: 53px;
  min-height: 53px;
  min-width: 195px;
  background-color: #fdf2dd;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
`
const Text = styled.Text`
  color: #000;
`
