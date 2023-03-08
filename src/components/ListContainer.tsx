import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"
import { Button, FlatList } from "react-native"
import styled from "styled-components/native"
import Colors from "../constants/Colors"
import { Block } from "./Block"
import { Icon } from "./Icon"
import { Loader } from "./Loader"
import { View, Text } from "./Themed"
interface ListContainerProps {
  parameter: string
  parameterName: string
  search: string
  shouldSearch: boolean
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
  data?: SpaceXList[][]
  pageParams?: (number | null)[][]
  pages?: AxiosResponse<any, any>[][]
  response?: AxiosResponse<any, any> // add this line
  nextPage?: any // add this line
}

export function ListContainer({
  parameter,
  parameterName,
  search,
  shouldSearch,
}: ListContainerProps) {
  const [isPressed, setIsPressed] = useState<number | null>(null)
  const [isSorted, setIsSorted] = useState(false)

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<TanStackProps>(
      ["spaceXList", parameter],
      async ({ pageParam = 0 }) => {
        const response = await axios.get(
          `https://api.spacexdata.com/v3/${parameter}?limit=5&offset=${pageParam}`,
        )
        return {
          data: response.data.slice(0, 5), // limit to first 5 items
          nextPage: response.data.length > 5 ? pageParam + 5 : null,
        }
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage
        },
      },
    )
  // const [sortedData, setSortedData] = useState(data?.data)

  // const filteredData = shouldSearch
  //   ? data?.data.filter((item) => {
  //       const lowerSearch = search.toLowerCase()
  //       switch (parameterName) {
  //         case "ROCKET NAME":
  //           return item.rocket_name?.toLowerCase().includes(lowerSearch)
  //         case "MISSION NAME":
  //           return item.mission_name?.toLowerCase().includes(lowerSearch)
  //         case "LAUNCH YEAR":
  //           return item.launch_year?.toLowerCase().includes(lowerSearch)
  //         case "ROCKET TYPE":
  //           return item.rocket_type?.toLowerCase().includes(lowerSearch)
  //         default:
  //           return false
  //       }
  //     })
  //   : data?.data

  // const handleSortData = () => {
  //   setIsSorted(true)
  //   const sortedData = [...filteredData].sort((a, b) => {
  //     switch (parameterName) {
  //       case "ROCKET NAME":
  //         return a.rocket_name?.localeCompare(b.rocket_name)
  //       case "MISSION NAME":
  //         return a.mission_name?.localeCompare(b.mission_name)
  //       case "LAUNCH YEAR":
  //         return a.launch_year?.localeCompare(b.launch_year)
  //       case "ROCKET TYPE":
  //         return a.engines.type?.localeCompare(b.engines.type)
  //       default:
  //         return 0
  //     }
  //   })
  //   setSortedData(sortedData)
  // }

  if (isLoading) return <Loader />
  if (isError) return null
  // console.log(data)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={data?.data}
        keyExtractor={(item, index) => index.toString()}
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
                    {parameterName === "ROCKET NAME" && item.rocket_name}
                    {parameterName === "MISSION NAME" && item.mission_name}
                    {parameterName === "LAUNCH YEAR" && item.launch_year}
                    {parameterName === "ROCKET TYPE" && item.engines.type}
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
        // onEndReached={() => {
        //   fetchNextPage()
        // }}
        // ListFooterComponent={
        //   hasNextPage ? (
        //     <View style={{ paddingVertical: 20 }}>
        //       <Loader />
        //     </View>
        //   ) : null
        // }
      />
      <Button
        title="Load more data"
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
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

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 48px;
`
const IconContainer = styled.View`
  position: absolute;
  right: 4;
`
