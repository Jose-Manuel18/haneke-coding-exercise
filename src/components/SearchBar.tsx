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
            source={{
              uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/0e587e33-cde5-4aad-9f9f-640612c308f0.svg",
            }}
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
      {/* <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Block size={10} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Container>
              <Text style={{ color: "#606060" }}>
                {parameterName === "ROCKET NAME" && item.rocket_name}
                {parameterName === "MISSION NAME" && item.mission_name}
                {parameterName === "LAUNCH YEAR" && item.launch_year}
                {parameterName === "ROCKET TYPE" && item.engines.type}
              </Text>
            </Container>
          )
        }}
      /> */}
    </View>
  )
}
const Container = styled.View`
  max-height: 70px;
  min-height: 70px;
  max-width: 246px;
  min-width: 246px;
  background-color: #fdf2dd;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`
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
