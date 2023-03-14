import { StyleSheet, Image, ImageBackground } from "react-native"

import { Text, View } from "../../src/components/Themed"
import { useSearchParams } from "expo-router"
import { Icon } from "../../src/components"
import Colors from "../../src/constants/Colors"
interface detailsProps {
  id: string
  launchYear: string
  rocketName: string
  rocketType: string
  missionName: string
  [key: string]: string | string[]
}
export default function TabTwoScreen() {
  const { id, launchYear, rocketType, missionName, rocketName } =
    useSearchParams<detailsProps>()
  console.log(launchYear)

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.ImageBackground}
        source={{
          uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/0ae7b785-b76d-4c4a-8ed8-372b1208ff1b.svg",
        }}
      >
        <Icon
          name="chevron-left-circle-outline"
          size={40}
          color={Colors.dark.searchButton}
          onPress={() => console.log("back")}
        />

        <ImageBackground
          style={styles.Image}
          source={{
            uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/7a73f49d-e15e-48d5-b8ae-3c2975ae458c.svg",
          }}
        >
          <Text>{launchYear}</Text>
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    width: 700,
    height: 348,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "90deg" }],
  },
  ImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
})
