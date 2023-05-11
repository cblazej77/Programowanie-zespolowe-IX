import { StyleSheet, Text, View, FlatList, Touchable } from 'react-native';
import React from 'react';
import { RegularText, StatsText } from './styles';
import { Colors } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { darkLight, secondary } = Colors;

const SearchFilter = ({ data, input, setInput, navigation }) => {
  if (input === '') {
    const list = data.map((item, index) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat');
        }}
        key={index}
      >
        <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }} key={index}>
          <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: '#CCC', marginRight: 5 }} />
          <View style={{ width: '80%' }}>
            <StatsText bold={true} style={{ textAlign: 'left', fontSize: 15 }}>
              {item.name} {item.surname}
            </StatsText>
            <RegularText style={{ color: '#777', fontSize: 13 }} numberOfLines={1}>
              {item.last_message}
            </RegularText>
          </View>
          <View>
            <StatsText
              numberOfLines={1}
              bold={true}
              style={{
                width: 25,
                fontSize: 10,
                backgroundColor: '#DA7676',
                borderRadius: 30,
                paddingVertical: 1,
                color: '#FFF',
              }}
            >
              {item.unseen_messages}
            </StatsText>
          </View>
        </View>
      </TouchableOpacity>
    ));
    return <View style={styles.ListContainer}>{list}</View>;
  } else {
    const filtred = data.filter((item) => {
      const person = item.name + ' ' + item.surname;
      if (person.toLowerCase().includes(input.toLowerCase())) {
        return item;
      }
    });
    const list = filtred.map((item, index) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat');
        }}
        key={index}
      >
        <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }} key={index}>
          <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: '#CCC', marginRight: 5 }} />
          <View style={{ width: '80%' }}>
            <StatsText bold={true} style={{ textAlign: 'left', fontSize: 15 }}>
              {item.name} {item.surname}
            </StatsText>
            <RegularText style={{ color: '#777', fontSize: 13 }} numberOfLines={1}>
              {item.last_message}
            </RegularText>
          </View>
          <View>
            <StatsText
              numberOfLines={1}
              bold={true}
              style={{
                width: 25,
                fontSize: 10,
                backgroundColor: '#DA7676',
                borderRadius: 30,
                paddingVertical: 1,
                color: '#FFF',
              }}
            >
              {item.unseen_messages}
            </StatsText>
          </View>
        </View>
      </TouchableOpacity>
    ));
    return <View style={styles.ListContainer}>{list}</View>;
  }

  // return (
  //   <FlatList
  //     contentContainerStyle={{ padding: 10 }}
  //     data={data}
  //     //ItemSeparatorComponent={<View style={{ width: "100%", height: 0, backgroundColor: "#e4dfe1", marginBottom: 10 }} />}
  //     keyExtractor={(item, index) => index}
  //     renderItem={({ item }) => {
  //       if (input === '') {
  //         return (
  //           <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }}>
  //             <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: '#CCC', marginRight: 5 }} />
  //             <View style={{ width: '80%' }}>
  //               <StatsText bold={true} style={{ textAlign: 'left', fontSize: 15 }}>
  //                 {item.name} {item.surname}
  //               </StatsText>
  //               <RegularText style={{ color: '#777', fontSize: 13 }} numberOfLines={1}>
  //                 {item.last_message}
  //               </RegularText>
  //             </View>
  //             <View>
  //               <StatsText
  //                 numberOfLines={1}
  //                 bold={true}
  //                 style={{
  //                   width: 25,
  //                   fontSize: 10,
  //                   backgroundColor: '#DA7676',
  //                   borderRadius: 30,
  //                   paddingVertical: 1,
  //                   color: '#FFF',
  //                 }}
  //               >
  //                 {item.unseen_messages}
  //               </StatsText>
  //             </View>
  //           </View>
  //         );
  //       }

  //       if (item.name.toLowerCase().includes(input.toLowerCase())) {
  //         return (
  //           <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-around' }}>
  //             <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: '#CCC', marginRight: 5 }} />
  //             <View style={{ width: '80%' }}>
  //               <StatsText bold={true} style={{ textAlign: 'left', fontSize: 15 }}>
  //                 {item.name} {item.surname}
  //               </StatsText>
  //               <RegularText style={{ color: '#6b6f96', fontSize: 13 }} numberOfLines={1}>
  //                 {item.last_message}
  //               </RegularText>
  //             </View>
  //             <View>
  //               <StatsText
  //                 numberOfLines={1}
  //                 bold={true}
  //                 style={{
  //                   width: 25,
  //                   fontSize: 10,
  //                   backgroundColor: '#DA7676',
  //                   borderRadius: 30,
  //                   paddingVertical: 1,
  //                   color: '#FFF',
  //                 }}
  //               >
  //                 {item.unseen_messages}
  //               </StatsText>
  //             </View>
  //           </View>
  //         );
  //       }
  //     }}
  //   />
  // );
};

export default SearchFilter;

const styles = StyleSheet.create({
  ListContainer: {
    padding: 10,
    width: '95%',
  },
});
