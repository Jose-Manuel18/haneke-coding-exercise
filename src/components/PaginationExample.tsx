import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import axios from "axios"

const PAGE_SIZE = 10

const PaginationExample = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const fetchData = async () => {
    setIsLoading(true)
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`,
    )
    setData((prevData) => [...prevData, ...response.data])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const renderFooter = () => {
    if (!isLoading) return null

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const handleLoadMore = () => {
    if (isLoading) return

    setPage((prevPage) => prevPage + 1)
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#555",
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: "center",
  },
})

export default PaginationExample
