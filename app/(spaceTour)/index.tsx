import { Image, View, Text, Animated } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { Block, DropDownMenu, Icon, SearchButton } from "../../src/components"
import Colors from "../../src/constants/Colors"
import { useEffect, useState } from "react"

import { ListContainer } from "../../src/components/ListContainer"
import { SearchBar } from "../../src/components/SearchBar"
import { gql, useQuery } from "@apollo/client"
export interface ParameterStateProps {
  name: string
  parameter: string
}
export default function TabOneScreen() {
  const [showDropDown, setShowDropDown] = useState(false)
  const [search, setSearch] = useState("")
  const [shouldSearch, setShouldSearch] = useState(false)
  const [rotation, setRotation] = useState<number>(0)
  const [parameter, setParameter] = useState<ParameterStateProps>({
    name: "ROCKET NAME",
    parameter: "rockets",
  })
  const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
      launches {
        mission_name
        launch_date_local
        launch_success
      }
    }
  `
  const { loading, error, data } = useQuery(LAUNCHES_QUERY)
  console.log(data)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
      }}
    >
      <Header>
        <PlanetContainer>
          <Block size={6} />
          <Image
            source={{
              uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/fd741e80-51b6-404f-b38c-84100f868a70.svg",
            }}
            style={{ width: 37, height: 40 }}
          />
        </PlanetContainer>
        <MiddleContainer>
          <Image
            source={{
              uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/b7fce7da-3cfc-4c11-ac00-05cd93d795f2.svg",
            }}
            style={{ width: 182, height: 95 }}
          />
        </MiddleContainer>
        <RocketContainer>
          <Image
            source={{
              uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/961bce9e-804a-4b16-8034-d92c69d333d7.svg",
            }}
            style={{ width: 66, height: 152 }}
          />
        </RocketContainer>
      </Header>
      <Block size={24} />
      <Container>
        <BannerContainer>
          <Image
            source={{
              uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/0765d06a-b872-448b-89ef-df1a59686066.svg",
            }}
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
                  Animated.timing(new Animated.Value(rotation), {
                    toValue: rotation,
                    duration: 100,
                    useNativeDriver: true,
                  }).start()
                  setRotation(rotation + 180)
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
          {/* <PaginationExample /> */}
          <ListContainer
            shouldSearch={shouldSearch}
            search={search}
            parameterName={parameter.name}
            parameter={parameter.parameter}
          />
        </ContentContainer>
        <PaginationContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>6 of 49</Text>
            <Block flex />
            <SearchButton />
          </View>
        </PaginationContainer>
      </Container>
    </SafeAreaView>
  )
}

const ArrowContainer = styled(Animated.View)<{ rotation: number }>`
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`
const PaginationContainer = styled.View`
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 80px;
`
const ContentContainer = styled.View`
  align-items: center;
  flex: 1;
  overflow-y: scroll;
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
