import { useState } from "react";
import { Animated, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {
  Block,
  DropDownMenu,
  Icon,
  ListContainer,
  SearchBar,
} from "../../src/components";
import Colors from "../../src/constants/Colors";

export interface ParameterStateProps {
  name: string;
  parameter: string;
}
export default function TabOneScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [sort, setSort] = useState(false);

  const [result, setResult] = useState("");
  const [rotateAnimation] = useState(new Animated.Value(0));
  const [parameter, setParameter] = useState<ParameterStateProps>({
    name: "ROCKET NAME",
    parameter: "rockets",
  });

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
      }}
    >
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0, backgroundColor: Colors.dark.blueBackground }}
      />
      <Header>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Block size={6} />
          <Image
            source={require("../../assets/images/haneke-images/planet-photo/drawable-hdpi/planet.png")}
            style={{ width: 37, height: 40 }}
          />
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/haneke-images/logo-photo/drawable-xhdpi/logo.png")}
            style={{ width: 182, height: 95 }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end", bottom: -8 }}>
          <Image
            source={require("../../assets/images/haneke-images/rocket-photo/drawable-xhdpi/rocket.png")}
            style={{ width: 66, height: 152 }}
          />
        </View>
      </Header>
      <Block size={24} />
      <Container>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/haneke-images/banner-photo/drawable-xhdpi/banner.png")}
            style={{ width: 268, height: 40 }}
          />
        </View>

        <Block size={24} />
        <SearchBar
          setResult={(e) => setResult(e)}
          parameter={parameter.parameter}
        />
        <Block size={16} />
        <View style={{ position: "relative", zIndex: 9999 }}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ paddingLeft: 8 }}
              name="filter"
              size={24}
              color={Colors.dark.blueBackground}
              onPress={() => setShowDropDown(!showDropDown)}
            />
            <Block flex />

            <Text
              style={{
                fontWeight: "bold",
                paddingRight: 24,
                color: Colors.dark.blueBackground,
              }}
            >
              {parameter.name}
            </Text>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: rotateAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              }}
            >
              <Icon
                name="arrow-down"
                color={Colors.dark.blueBackground}
                size={24}
                onPress={() => {
                  Animated.timing(rotateAnimation, {
                    toValue: sort ? 0 : 1,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  setSort(!sort);
                }}
              />
            </Animated.View>

            <Block flex />
          </View>

          <DropDownMenu
            setParameter={(e) => setParameter(e)}
            toggleClose={(e) => setShowDropDown(e)}
            selectedParameter={parameter.name}
            dropDownState={showDropDown}
          />

          <View
            style={{
              width: "100%",
              height: 8,
              backgroundColor: Colors.dark.blueBackground,
              borderRadius: 40,
            }}
          />
        </View>
        <Block size={24} />
        <View style={{ alignItems: "center" }}>
          <ListContainer
            result={result}
            sort={sort}
            parameterName={parameter.name}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
}

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blueBackground};
  height: 141px;
  width: 100%;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  padding: 0px 16px;
`;
