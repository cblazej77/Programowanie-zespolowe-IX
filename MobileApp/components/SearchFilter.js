import { StyleSheet, Text, View, FlatList, Touchable } from 'react-native';
import React from 'react';
import { RegularText, StatsText } from './styles';
import { Colors } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardItem from './CardItem';

const { darkLight, secondary } = Colors;

export const MessagesSearchFilter = ({ data, input, setInput, navigation }) => {
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

  
};

export const HomeSearchFilter = ({ data, input, setInput, navigation }) => {
  if (input === '') {
    const list = data.map((item, index) => (
      <CardItem
        key={index}
        avatar="/assets/cards/person1.jpg"
        name={item.firstname}
        surname={item.lastname}
        username={item.username}
        navigation={navigation}
        level={item.level}
        rating={3.5}
        ratingCount={12}
        city={item.city}
        skills={item.skills}
        project1="/assets/cards/design1.jpg"
        project2="/assets/cards/design2.png"
        project3="/assets/cards/design3.jpg"
        project4="/assets/cards/design4.png"
      />
    ));
    return <View>{list}</View>;
  } else {
    const filtred = data.filter((item) => {
      const person = item.firstname + ' ' + item.lastname;
      if (person.toLowerCase().includes(input.toLowerCase())) {
        return item;
      }
    });
    const list = filtred.map((item, index) => (
      <CardItem
        key={index}
        avatar="/assets/cards/person1.jpg"
        name={item.firstname}
        surname={item.lastname}
        username={item.username}
        navigation={navigation}
        level={item.level}
        rating={3.5}
        ratingCount={12}
        city={item.city}
        skills={item.skills}
        project1="/assets/cards/design1.jpg"
        project2="/assets/cards/design2.png"
        project3="/assets/cards/design3.jpg"
        project4="/assets/cards/design4.png"
      />
    ));
    return <View>{list}</View>;
  }

  
};


const styles = StyleSheet.create({
  ListContainer: {
    padding: 10,
    width: '95%',
  },
});
