import { useState } from "react"
import { Animated, Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"
import {
  Block,
  Button,
  DropDownMenu,
  Icon,
  ListContainer,
  SearchBar,
} from "../../src/components"
import Colors from "../../src/constants/Colors"

export interface ParameterStateProps {
  name: string
  parameter: string
}
export default function TabOneScreen() {
  const [showDropDown, setShowDropDown] = useState(false)
  const [sort, setSort] = useState(false)
  const [search, setSearch] = useState("")
  const [shouldSearch, setShouldSearch] = useState(false)
  const [rotation, setRotation] = useState<number>(0)
  const [parameter, setParameter] = useState<ParameterStateProps>({
    name: "ROCKET NAME",
    parameter: "rockets",
  })
  console.log("shouldSearch", shouldSearch)

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
        <PlanetContainer>
          <Block size={6} />
          <Image
            source={require("../../assets/images/haneke-images/planet-photo/drawable-hdpi/planet.png")}
            style={{ width: 37, height: 40 }}
          />
        </PlanetContainer>
        <MiddleContainer>
          <Image
            source={require("../../assets/images/haneke-images/logo-photo/drawable-xhdpi/logo.png")}
            style={{ width: 182, height: 95 }}
          />
        </MiddleContainer>
        <RocketContainer>
          <Image
            source={require("../../assets/images/haneke-images/rocket-photo/drawable-xhdpi/rocket.png")}
            style={{ width: 66, height: 152 }}
          />
        </RocketContainer>
      </Header>
      <Block size={24} />
      <Container>
        <BannerContainer>
          <Image
            source={require("../../assets/images/haneke-images/banner-photo/drawable-xhdpi/banner.png")}
            style={{ width: 268, height: 40 }}
          />
        </BannerContainer>

        <Block size={24} />
        <SearchBar
          setShouldSearch={setShouldSearch}
          setSearch={(e) => setSearch(e)}
          parameter={parameter.parameter}
          parameterName={parameter.name}
        />
        <Block size={16} />
        <OuterContainer>
          <FilterContainer>
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
            <ArrowContainer rotation={rotation}>
              <Icon
                name="arrow-down"
                color={Colors.dark.blueBackground}
                size={24}
                onPress={() => {
                  !sort &&
                    Animated.timing(new Animated.Value(rotation), {
                      toValue: rotation,
                      duration: 100,
                      useNativeDriver: true,
                    }).start()
                  setRotation(rotation + 180)
                  setSort(!sort)
                }}
              />
            </ArrowContainer>

            <Block flex />
          </FilterContainer>

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
        </OuterContainer>
        <Block size={24} />
        <ContentContainer>
          <ListContainer
            shouldSearch={shouldSearch}
            search={search}
            sort={sort}
            parameterName={parameter.name}
          />
        </ContentContainer>
      </Container>
    </SafeAreaView>
  )
}

const ArrowContainer = styled(Animated.View)<{ rotation: number }>`
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`

const ContentContainer = styled.View`
  align-items: center;
`
const OuterContainer = styled.View`
  position: relative;
  z-index: 9999;
`

const FilterContainer = styled.View`
  flex-direction: row;
`
const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blueBackground};
  height: 141px;
  width: 100%;
`
const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  padding: 0px 16px;
`
const PlanetContainer = styled.View`
  flex: 1;
  align-items: center;
`
const MiddleContainer = styled.View`
  flex: 2;
  justify-content: center;
`
const RocketContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  bottom: -8px;
`
const BannerContainer = styled.View`
  align-items: center;
`
