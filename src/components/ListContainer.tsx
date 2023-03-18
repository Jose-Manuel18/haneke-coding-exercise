import { FlatList, Switch, Text, View } from "react-native"

import { useInfiniteQuery } from "@tanstack/react-query"
import styled from "styled-components/native"
import Colors from "../constants/Colors"
import { useEffect, useMemo, useState } from "react"
import { Button } from "./Button"
import { Block } from "./Block"
import { Icon } from "./Icon"
import { useRouter } from "expo-router"
import { Loader } from "./Loader"
interface fetchProps {
  _id: string
  flight_number: number
  mission_name: string
  launch_year: string
  rocket: rocketProps
}
interface rocketProps {
  rocket_type: string
  rocket_name: string
}
interface Props {
  parameterName: string
  sort: boolean
  search: string
  shouldSearch: boolean
}

export const ListContainer = ({
  parameterName,
  sort,
  shouldSearch,
  search,
}: Props) => {
  const [isPressed, setIsPressed] = useState<number | null>(null)
  const [newResults, setNewResults] = useState<any[]>([])
  const [initialData, setInitialData] = useState(null)
  const [totalCount, setTotalCount] = useState([0])

  const { push } = useRouter()
  const fetchData = async ({ pageParam = 0, countOnly = false }) => {
    const limit = 5
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?id=true&offset=${pageParam}&limit=${limit}${
        countOnly ? "&countOnly=true" : ""
      }`,
    )

    return response.json()
  }
  useEffect(() => {
    ;(async () => {
      const countResponse = await fetch(
        "https://api.spacexdata.com/v3/launches",
      )
      const totalCount = await countResponse.json()
      setTotalCount(totalCount)

      const initialDataResponse = await fetchData({ pageParam: 0 })
      setInitialData(initialDataResponse)
    })()
  }, [])
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery<fetchProps[]>(["launches"], fetchData, {
    initialData: () => {
      if (initialData) {
        return {
          pages: [initialData],
          pageParams: [0],
        }
      }
      return undefined
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return null
      }
      return pages.length * 5
    },
  })

  // const [shuffledData, setShuffledData] = useState<any[]>([])
  function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const renderedItems = data && data.pages.flat().length
  const totalItems = totalCount.length

  const result = useMemo(() => {
    const commonProps = (item: fetchProps) => ({
      id: item._id,
      rocketType: item.rocket.rocket_type,
      rocketName: item.rocket.rocket_name,
      launchYear: item.launch_year,
      missionName: item.mission_name,
    })

    switch (parameterName) {
      default:
        return data?.pages.flat().map((item) => ({
          ...commonProps(item),
          value: item.rocket.rocket_name,
        }))

      case "LAUNCH YEAR":
        return data?.pages.flat().map((item) => ({
          ...commonProps(item),
          value: item.launch_year,
        }))

      case "MISSION NAME":
        return data?.pages.flat().map((item) => ({
          ...commonProps(item),
          value: item.mission_name,
        }))

      case "ROCKET TYPE":
        return data?.pages.flat().map((item) => ({
          ...commonProps(item),
          value: item.rocket.rocket_type,
        }))
    }
  }, [parameterName, data])

  const filteredResults = result?.filter((item) => {
    return item.value.includes(search.toLowerCase())
  })
  const [shuffledData, setShuffledData] = useState<any[]>([])

  useEffect(() => {
    if (!sort) {
      if (result) {
        setShuffledData(shuffle([...result]))
      }
    } else {
      setShuffledData(result ?? [])
    }
  }, [sort, result])

  const handleLoadMore = () => {
    if (!sort) {
      fetchNextPage().then(() => {
        if (data) {
          const newData = data.pages.flat()
          const lastFiveItems = newData.slice(-5)
          const shuffledLastFiveItems = shuffle([...lastFiveItems])
          newData.splice(-5, 5, ...shuffledLastFiveItems)
          setShuffledData(newData)
        }
      })
    } else {
      fetchNextPage()
    }
  }

  if (isLoading) return <Loader />
  if (isError) return <Text>Error</Text>
  // console.log("search:", search)
  // console.log("filteredResults:", filteredResults)

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          maxHeight: 408,
          paddingBottom: 16,
        }}
      >
        <FlatList
          data={shouldSearch ? filteredResults : shuffledData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 56,
                }}
              >
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
                      }}
                    >
                      {item.value}
                    </Text>
                  </InnerContainer>
                  {isPressed === index && (
                    <View style={{ position: "absolute", right: -56 }}>
                      <Icon
                        name="chevron-right-circle-outline"
                        size={40}
                        color={Colors.dark.searchButton}
                        onPress={() => {
                          push({
                            pathname: "ticket",
                            params: {
                              launchYear: item.launchYear,
                              rocketType: item.rocketType,
                              missionName: item.missionName,
                              rocketName: item.rocketName,
                            },
                          })
                        }}
                      />
                    </View>
                  )}
                </Container>
              </View>
            )
          }}
          ListEmptyComponent={
            filteredResults?.length === 0 ? (
              <>
                <Text
                  style={{
                    color: Colors.dark.blueBackground,
                    fontWeight: "bold",
                  }}
                >
                  No data found ❌
                </Text>
              </>
            ) : null
          }
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          minWidth: 246,
        }}
      >
        <Text
          style={{
            paddingLeft: 4,
            fontWeight: "bold",
            color: Colors.dark.blueBackground,
            fontSize: 16,
          }}
        >
          {shouldSearch ? filteredResults?.length : renderedItems} of{" "}
          {totalItems}
        </Text>
        <Block width={40} />
        <Button
          isLoading={isFetchingNextPage}
          disabled={isFetchingNextPage || !hasNextPage}
          width={141}
          height={33}
          onPress={handleLoadMore}
        >
          LOAD MORE
        </Button>
      </View>
    </View>
  )
}
const Container = styled.View`
  flex-direction: row;
  align-items: center;
`
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
