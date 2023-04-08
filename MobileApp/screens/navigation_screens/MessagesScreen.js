import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchFilter from '../../components/SearchFilter';
import { AppText, ChatLabel, HeaderText, LinearGradientStyle } from '../../components/styles';
import { Colors } from '../../components/styles';
import { LinearGradient } from 'expo-linear-gradient';

const { primary, darkLight, darkLight2 } = Colors

const DATA = [
  {
    id: "1",
    name: "Piotr",
    surname: "Baran",
    unseen_messages: 0,
    last_message_date: Date(2023, 3, 22),
    last_message: "Ale zajmę się tym."
  },
  {
    id: "2",
    name: "Tyberiusz",
    surname: "Kowal",
    unseen_messages: 0,
    last_message_date: Date(2023, 2, 12),
    last_message: "Niestety nie mam w piątek czasu. Czy odpowiada Panu za tydzień? Ewentualnie mogę zrobić więcej."
  },
  {
    id: "3",
    name: "Igor",
    surname: "Nowak",
    unseen_messages: 10,
    last_message_date: Date(2023, 12, 15),
    last_message: "Zadzwonię do Pana jutro."
  },
  {
    id: "4",
    name: "Miranda",
    surname: "Duda",
    unseen_messages: 0,
    last_message_date: Date(2022, 4, 21),
    last_message: "Ok?"
  },
  {
    id: "5",
    name: "Ryszard",
    surname: "Szulc",
    unseen_messages: 0,
    last_message_date: Date(2023, 9, 29),
    last_message: "Hej"
  },
  {
    id: "6",
    name: "Hektor",
    surname: "Lipiński",
    unseen_messages: 2,
    last_message_date: Date(2023, 9, 3),
    last_message: "Niestety nie"
  },
  {
    id: "7",
    name: "Hubert",
    surname: "Jędrzejewski",
    unseen_messages: 8,
    last_message_date: Date(2022, 7, 4),
    last_message: "Oczywiście"
  },
  {
    id: "8",
    name: "Iwon",
    surname: "Gajewski",
    unseen_messages: 4,
    last_message_date: Date(2022, 9, 19),
    last_message: "Jasne"
  },
  {
    id: "9",
    name: "Matylda",
    surname: "Kamińska",
    unseen_messages: 3,
    last_message_date: Date(2023, 3, 13),
    last_message: "Okej"
  },
  {
    id: "10",
    name: "Adam",
    surname: "Jarosz",
    unseen_messages: 1,
    last_message_date: Date(2022, 12, 12),
    last_message: "Nie"
  },
  {
    id: "11",
    name: "Gerwazy",
    surname: "Majewski",
    unseen_messages: 10,
    last_message_date: Date(2022, 4, 15),
    last_message: "Tak jest"
  },
  {
    id: "12",
    name: "Jakub",
    surname: "Kowalski",
    unseen_messages: 0,
    last_message_date: Date(2022, 1, 7),
    last_message: "Ok?"
  },
];


// const Item = ({ title }) => {
//   return (
//     <View style={styles.item}>
//       <Text>{title}</Text>
//     </View>
//   );
// };

// const renderItem = ({ item }) => <Item title={item.title} />;
// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       data: DATA,
//       error: null,
//       searchValue: '',
//     };
//     this.arrayholder = DATA;
//   }

//   searchFunction = (text) => {
//     const updatedData = this.arrayholder.filter((item) => {
//       const item_data = `${item.title.toUpperCase()})`;
//       const text_data = text.toUpperCase();
//       return item_data.indexOf(text_data) > -1;
//     });
//     this.setState({ data: updatedData, searchValue: text });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <SearchBar
//           placeholder="Search Here..."
//           round
//           value={this.state.searchValue}
//           onChangeText={(text) => this.searchFunction(text)}
//           autoCorrect={false}>
//           </SearchBar>
//         <FlatList
//           data={this.state.data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     );
//   }
// }

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     padding: 2,
//   },
//   item: {
//     backgroundColor: "#f5f520",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
// });

function MessagesScreen({ navigation }) {
  const [input, setInput] = useState("");
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: primary}}>
      <LinearGradient colors={[darkLight, darkLight2]}>
      <ChatLabel style={{
        justifyContent: 'center'
      }}>
        <HeaderText>Wiadomości</HeaderText>
      </ChatLabel>
      </LinearGradient>
      
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        backgroundColor={'#FFFFFF'}
        placeholderTextColor={'#D6D6D6'}
        placeholder="szukaj"
        style={styles.TextInputStyle}
      />
      </View>
      <SearchFilter data={DATA} input={input} setInput={setInput} />
      
    </SafeAreaView>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  TextInputStyle: { 
    width: "90%",
    margin: 15,
    borderRadius: 40,
    height: 25,
    paddingLeft: 10
  },
});