import { View } from "./Themed";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Button } from "./Button";
import { Block } from "./Block";
import Colors from "../constants/Colors";
import { useSearchContext } from "../context/SearchContext";

interface ListContainerProps {
  parameter: string;
  setResult: (value: string) => void;
}

export function SearchBar({ parameter, setResult }: ListContainerProps) {
  // const [search, setSearch] = useState("");
  const { search, setSearch } = useSearchContext();
  console.log(search);

  return (
    <View style={{ flexDirection: "row" }}>
      <SearchInputContainer>
        <Block width={16} />
        <View
          style={{
            justifyContent: "center",
            backgroundColor: Colors.dark.blueBackground,
          }}
        >
          <Image
            source={require("../../assets/images/haneke-images/search-rocket-photo/drawable-xxhdpi/rocket.png")}
            style={{ width: 22, height: 25 }}
          />
        </View>
        <Input
          value={search}
          onChangeText={(e) => {
            setSearch(e);
          }}
          placeholder={`Search for ${parameter} `}
          placeholderTextColor={Colors.dark.background}
        />
      </SearchInputContainer>
      <Block width={24} />
      <Button width={98} height={33} onPress={() => setResult(search)}>
        SEARCH
      </Button>
    </View>
  );
}

const SearchInputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.blueBackground};
  height: 32px;
  width: 232px;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 40px;
`;
const Input = styled.TextInput`
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;
