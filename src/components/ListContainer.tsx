import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Button, FlatList } from "react-native"
import styled from "styled-components/native"
import Colors from "../constants/Colors"
import { Block } from "./Block"
import { Icon } from "./Icon"
import { Loader } from "./Loader"
import { View, Text } from "./Themed"

export function ListContainer({
  parameter,
  parameterName,
  search,
  shouldSearch,
}) {
  const [isPressed, setIsPressed] = useState<number | null>(null)
  const {
    data,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["spaceXList", parameter],
    async ({ pageParam = 0 }) => {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches?id=true&limit=5&offset=${pageParam}`,
      )
      return response.data
    },
    {
      getNextPageParam: (lastPage, pages) => {
        //create example using lastPage and allPages
        if (lastPage.length < 10) {
          return null
        }
        // console.log("lastPage:", lastPage.length)
        // console.log("pages:", pages)

        return lastPage[lastPage.length - 1].flight_number
      },
    },
  )

  const [numItems, setNumItems] = useState(5)
  const flatData = data?.pages?.flat()
  if (isLoading) return <Loader />
  if (isError) {
    console.log("error:", isError)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={flatData}
        keyExtractor={(item, index) => item._id}
        ItemSeparatorComponent={() => <Block size={10} />}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={
        //   filteredData?.length === 0 ? (
        //     <Text
        //       style={{ color: Colors.dark.blueBackground, fontWeight: "bold" }}
        //     >
        //       No data found ❌
        //     </Text>
        //   ) : null
        // }
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1 }}>
              <Container>
                <InnerContainer
                  pressed={isPressed === index}
                  onPress={() => {
                    index === isPressed
                      ? setIsPressed(null)
                      : setIsPressed(index)
                  }}
                >
                  <Text
                    style={{
                      color:
                        isPressed === index
                          ? Colors.dark.text
                          : Colors.dark.listText,
                      fontWeight: "400",
                    }}
                  >
                    {item.launch_year}
                    {/* {parameterName === "ROCKET NAME" && item.rocket_name}
                    {parameterName === "MISSION NAME" && item.mission_name}
                    {parameterName === "LAUNCH YEAR" && item.launch_year} */}
                    {/* {parameterName === "ROCKET TYPE" && item.engines.type} */}
                  </Text>
                </InnerContainer>
                <Block width={8} />
                {isPressed === index && (
                  <IconContainer>
                    <Icon
                      name="chevron-right-circle-outline"
                      size={40}
                      color={Colors.dark.searchButton}
                    />
                  </IconContainer>
                )}
              </Container>
            </View>
          )
        }}
      />
      <Button
        title="load more"
        onPress={() => {
          setNumItems(numItems + 5)
          fetchNextPage()
        }}
      />
    </View>
  )
}
const InnerContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  height: 70px;
  width: 246px;
  background-color: ${(p) =>
    p.pressed ? Colors.dark.searchButton : "#fdf2dd"};
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`

const Container = styled.View``
const IconContainer = styled.View`
  position: absolute;
  right: 4;
`
