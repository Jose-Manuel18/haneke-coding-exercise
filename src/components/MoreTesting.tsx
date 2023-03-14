import axios from "axios"
import { useEffect, useState } from "react"
import { Button, FlatList } from "react-native"

import { View, Text } from "./Themed"

export function ListContainer2() {
  const [data, setData] = useState<any[]>([])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches?limit=5&offset=${offset}`,
      )
      setData((data) => [...data, ...response.data])
    }
    fetchData()
  }, [offset])

  console.log(data)

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>Flight Number: {item.flight_number}</Text>
              <Text>Mission Name: {item.mission_name}</Text>
              <Text>Launch Year: {item.launch_year}</Text>
            </View>
          )
        }}
      />
      <Button title="Load More" onPress={() => setOffset(data?.length ?? 0)} />
    </View>
  )
}
