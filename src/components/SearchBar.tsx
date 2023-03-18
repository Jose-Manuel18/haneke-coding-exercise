import { View, Text } from "./Themed"
import { FlatList, Image } from "react-native"
import styled from "styled-components/native"
import { Button } from "./Button"
import { Block } from "./Block"
import Colors from "../constants/Colors"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface ListContainerProps {
  parameter: string
  parameterName: string
  setSearch: (value: string) => void
  setShouldSearch: (value: boolean) => void
}

interface SpaceXList {
  description?: string
  mission_id?: string
  mission_name?: string
  rocket_id?: string
  rocket_name?: string
  rocket_type?: string
  launch_year?: string
}

interface TanStackProps {
  data: SpaceXList[]
}
export function SearchBar({
  parameter,
  parameterName,
  setSearch,
  setShouldSearch,
}: ListContainerProps) {
  const { data, isLoading, error } = useQuery<TanStackProps>(
    ["spaceXList", parameter],
    () => axios.get(`https://api.spacexdata.com/v3/${parameter}`),
  )

  return (
    <View style={{ flexDirection: "row" }}>
      <SearchInputContainer>
        <Block width={16} />
        <View
          style={{
            justifyContent: "center",
            backgroundColor: Colors.dark.blueBackground,
          }}
        >
          <Image
            source={require("../../assets/images/haneke-images/search-rocket-photo/drawable-xxhdpi/rocket.png")}
            style={{ width: 22, height: 25 }}
          />
        </View>
        <Input
          onChangeText={(e) => {
            setSearch(e)
            setShouldSearch(false)
          }}
          placeholder={`Search for ${parameter} `}
          placeholderTextColor={Colors.dark.background}
        />
      </SearchInputContainer>
      <Block width={24} />
      <Button width={98} height={33} onPress={() => setShouldSearch(true)}>
        SEARCH
      </Button>
    </View>
  )
}

const SearchInputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.blueBackground};
  height: 32px;
  width: 232px;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 40px;
`
const Input = styled.TextInput`
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`
