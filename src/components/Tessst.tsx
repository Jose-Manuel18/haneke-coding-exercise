import { FlatList, Switch, Text, View } from "react-native"

import { useInfiniteQuery } from "@tanstack/react-query"
import styled from "styled-components/native"
import Colors from "../constants/Colors"
import { useEffect, useMemo, useState } from "react"
import { Button } from "./Button"
import { Block } from "./Block"
import { Icon } from "./Icon"
import { useRouter } from "expo-router"
interface fetchProps {
  _id: string
  flight_number: number
  mission_name: string
  launch_year: string
  rocket: {
    rocket_type: string
    rocket_name: string
  }
}
interface Props {
  parameterName: string
}

export const LaunchesScreen = ({ parameterName }: Props) => {
  const [isPressed, setIsPressed] = useState<string | null>(null)
  const { push, setParams } = useRouter()
  const fetchData = async ({ pageParam = 0 }) => {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?id=true&limit=5&offset=${pageParam}`,
    )

    return response.json()
  }
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery<fetchProps[]>({
    queryKey: ["launches"],
    queryFn: fetchData,

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return null
      }
      // console.log("lastPage:", lastPage.length)
      // console.log("pages:", pages)
      return lastPage[lastPage.length - 1].flight_number
    },
  })

  const renderedItems = data?.pages.flat().length

  const result = useMemo(() => {
    switch (parameterName) {
      default:
        return data?.pages.flat().map((item) => ({
          id: item._id,
          value: item.rocket.rocket_name,
          rocketType: item.rocket.rocket_type,
          rocketName: item.rocket.rocket_name,
          launchYear: item.launch_year,
          missionName: item.mission_name,
        }))
      case "LAUNCH YEAR":
        return data?.pages.flat().map((item) => ({
          id: item._id,
          value: item.launch_year,
          rocketType: item.rocket.rocket_type,
          rocketName: item.rocket.rocket_name,
          launchYear: item.launch_year,
          missionName: item.mission_name,
        }))
      case "MISSION NAME":
        return data?.pages.flat().map((item) => ({
          id: item._id,
          value: item.mission_name,
          rocketType: item.rocket.rocket_type,
          rocketName: item.rocket.rocket_name,
          launchYear: item.launch_year,
          missionName: item.mission_name,
        }))
      case "ROCKET TYPE":
        return data?.pages.flat().map((item) => ({
          id: item._id,
          value: item.rocket.rocket_type,
          rocketType: item.rocket.rocket_type,
          rocketName: item.rocket.rocket_name,
          launchYear: item.launch_year,
          missionName: item.mission_name,
        }))
    }
  }, [parameterName, data])

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
          data={result}
          keyExtractor={(item, index) => item.id}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 56,
                }}
              >
                <Container>
                  <InnerContainer
                    pressed={isPressed === item.id}
                    onPress={() => {
                      item.id === isPressed
                        ? setIsPressed(null)
                        : setIsPressed(item.id)
                    }}
                  >
                    <Text
                      style={{
                        color:
                          isPressed === item.id ? "#fff" : Colors.dark.listText,
                      }}
                    >
                      {item.value}
                    </Text>
                  </InnerContainer>
                  {isPressed === item.id && (
                    <View style={{ position: "absolute", right: -56 }}>
                      <Icon
                        name="chevron-right-circle-outline"
                        size={40}
                        color={Colors.dark.searchButton}
                        onPress={() => {
                          push({
                            pathname: "two",
                            params: {
                              id: item.id,
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
        />
      </View>
      <Block size={24} />
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
          {renderedItems} of 110
        </Text>
        <Block width={40} />
        <Button
          disabled={isFetchingNextPage || !hasNextPage}
          width={141}
          height={33}
          onPress={() => {
            fetchNextPage()
          }}
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
