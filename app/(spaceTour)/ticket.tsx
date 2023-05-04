import { StyleSheet, ImageBackground, Alert } from "react-native";

import { View } from "../../src/components/Themed";
import { useRouter, useSearchParams } from "expo-router";
import { Block, Button, Icon, Loader } from "../../src/components";
import Colors from "../../src/constants/Colors";
import styled from "styled-components/native";
import { useState } from "react";

interface detailsProps {
  id: string;
  launchYear: string;
  rocketName: string;
  rocketType: string;
  missionName: string;
  [key: string]: string | string[];
}

export default function TabTwoScreen() {
  const { launchYear, rocketType, missionName, rocketName } =
    useSearchParams<detailsProps>();
  const [loading, setLoading] = useState(true);
  const { back } = useRouter();

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.ImageBackground}
      source={require("../../assets/images/haneke-images/background-ticket/drawable-mdpi/background.png")}
    >
      <Icon
        name="chevron-left-circle-outline"
        size={56}
        style={{ position: "absolute", top: 32, left: 32 }}
        color={Colors.dark.background}
        onPress={() => back()}
      />

      <ImageBackground
        style={styles.Image}
        onLoad={() => setLoading(false)}
        source={require("../../assets/images/haneke-images/ticket-photo/drawable-xhdpi/group_168.png")}
      >
        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              minHeight: 270,
              minWidth: 480,
              backgroundColor: "transparent",
              transform: [{ rotate: "90deg" }],
            }}
          >
            <View
              style={{ flexDirection: "row", backgroundColor: "transparent" }}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 64,
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    paddingBottom: 24,
                  }}
                >
                  <Text style={{ fontSize: 8, paddingBottom: 4 }}>
                    MISSION NAME
                  </Text>

                  <Text style={{ fontSize: 18 }}>{missionName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "transparent",
                  }}
                >
                  <View style={{ backgroundColor: "transparent" }}>
                    <Text style={{ paddingBottom: 4 }}>ROCKET NAME</Text>
                    <Text style={{ fontWeight: "700" }}>{rocketName}</Text>
                  </View>
                  <Block width={88} />
                  <View style={{ backgroundColor: "transparent" }}>
                    <Text style={{ paddingBottom: 4 }}>ROCKET TYPE</Text>
                    <Text style={{ fontWeight: "700" }}>{rocketType}</Text>
                  </View>
                </View>
              </View>
              <Block flex />
              <View style={{ paddingTop: 32, backgroundColor: "transparent" }}>
                <Text blue style={{ paddingBottom: 4 }}>
                  LAUNCH YEAR
                </Text>
                <Text blue style={{ fontSize: 16, fontWeight: "300" }}>
                  {launchYear}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>

      <View
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: "transparent",
        }}
      >
        <Button
          height={33}
          width={141}
          style={{ textAlign: "center" }}
          onPress={() => Alert.alert("Success!", "Ticket has been printed.")}
        >
          PRINT TICKET
        </Button>
      </View>
    </ImageBackground>
  );
}

const Text = styled.Text<{ blue?: boolean }>`
  color: ${(p) =>
    p.blue ? Colors.dark.blueBackground : Colors.dark.background};
  font-size: 8px;
`;

const styles = StyleSheet.create({
  Image: {
    width: 348,
    height: 700,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
