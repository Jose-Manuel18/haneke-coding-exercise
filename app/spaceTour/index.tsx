import { Image } from "react-native"

import { useRouter } from "expo-router"
import { Text } from "../../src/components/Themed"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"
import Colors from "../../src/constants/Colors"
import { Block } from "../../src/components/Block"

export default function TabOneScreen() {
  const { push } = useRouter()

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
            style={{ width: 261, height: 40 }}
          />
        </BannerContainer>

        <Block size={24} />
        <SearchContainer>
          <SearchInputContainer>
            <Image
              source={{
                uri: "https://cdn.zeplin.io/6369325b403d1716dd82bf01/assets/0e587e33-cde5-4aad-9f9f-640612c308f0.svg",
              }}
              style={{ width: 22, height: 25 }}
            />
            <Input
              placeholder="Search for flights"
              placeholderTextColor={Colors.dark.background}
            />
          </SearchInputContainer>
          <Block flex />
          <SearchButton>
            <Text>Search</Text>
          </SearchButton>
        </SearchContainer>
      </Container>
    </SafeAreaView>
  )
}
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
  padding: 0px 24px;
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
const SearchInputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.blueBackground};
  height: 32px;
  width: 224px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`
const SearchContainer = styled.View`
  flex-direction: row;
`
const Input = styled.TextInput`
  flex: 1;
  color: ${(props) => props.theme.colors.background};
  text-align: center;
  padding: 0px;
`
const SearchButton = styled.Pressable`
  background-color: red;
  height: 32px;
  width: 96px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`
