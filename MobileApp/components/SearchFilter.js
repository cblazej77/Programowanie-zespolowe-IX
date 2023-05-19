import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { RegularText, StatsText, Bubble, AppText, HeaderText, Line } from './styles';
import { Colors } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardItem from './CardItem';
import { CommisionElement } from './CommisionElement';
import Modal from 'react-native-modal';

const { darkLight, secondary, primary } = Colors;

function getSelectedLevel(levels) {
  if (levels) {
    if (levels.length === 3) {
      return 'Junior+';
    } else if (levels.length === 2) {
      return 'Mid+';
    } else if (levels.length === 1) {
      return levels[0];
    }
  }
}

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: xOffset, height: yOffset },
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = { elevation, shadowColor: shadowColorAndroid };
  }
};

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

export const CommisionsSearchFilter = ({ data, input, setInput, navigation }) => {

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const [isModalVisible, setisModalVisible] = useState(false);
  const [modalCommision, setModalCommision] = useState('');

  if (input === '') {
    const list = data.map((item, index) => (
      <TouchableOpacity
            onPress={() => {
              setisModalVisible(true);
              setModalCommision(item);
            }}
            key={index}
          >
      <CommisionElement
              key={index}
              title={item.title}
              description={item.description}
              stawka={item.stawka}
              deadline={item.deadline}
              level={getSelectedLevel(item.level)}
              location={item.location}
              tags={item.tags}
            />
            </TouchableOpacity>
    ));
    return (<View><View>{list}</View>{modalCommision && (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setisModalVisible(false)}
        onSwipeComplete={() => setisModalVisible(false)}
        swipeDirection="right"
        animationIn="fadeInUp"
        animationOut="fadeOutUp"
        animationInTiming={500}
        animationOutTiming={500}
        hideModalContentWhileAnimating={true}
      >
        <ScrollView style={{ maxHeight: '90%' }}>
          <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
              <HeaderText style={{ color: darkLight }}>{modalCommision.title}</HeaderText>
              <Line style={{ width: '90%', height: 2 }} />
              <View style={styles.ModalDescription}>
                <RegularText style={{ color: '#6e6968' }}>{modalCommision.description}</RegularText>
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalCommisionDetails}>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Stawka:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>
                    {modalCommision.stawka + ' PLN'}
                  </RegularText>
                </View>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Czas wykonania:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>{modalCommision.deadline}</RegularText>
                </View>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>
                    {getSelectedLevel(modalCommision.level)}
                  </RegularText>
                </View>
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Lokalizacja:</RegularText>
                {modalCommision.location.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                {modalCommision.tags.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                {modalCommision.skills.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                {modalCommision.languages.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? 'lightgrey' : darkLight,
                    },
                    styles.ModalButton,
                  ]}
                >
                  <AppText style={{ color: 'white' }}>Aplikuj!</AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    )}
    </View>);
  } else {
    const filtred = data.filter((item) => {
      if(item.title.toLowerCase().includes(input.toLowerCase())) {
      return item;
      }
    });
    const list = filtred.map((item, index) => (
      <TouchableOpacity
            onPress={() => {
              setisModalVisible(true);
              setModalCommision(item);
            }}
            key={index}
          >
      <CommisionElement
              key={index}
              title={item.title}
              description={item.description}
              stawka={item.stawka}
              deadline={item.deadline}
              level={getSelectedLevel(item.level)}
              location={item.location}
              tags={item.tags}
            />
            </TouchableOpacity>
    ));
    return (<View><View>{list}</View>{modalCommision && (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setisModalVisible(false)}
        onSwipeComplete={() => setisModalVisible(false)}
        swipeDirection="right"
        animationIn="fadeInUp"
        animationOut="fadeOutUp"
        animationInTiming={500}
        animationOutTiming={500}
        hideModalContentWhileAnimating={true}
      >
        <ScrollView style={{ maxHeight: '90%' }}>
          <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
              <HeaderText style={{ color: darkLight }}>{modalCommision.title}</HeaderText>
              <Line style={{ width: '90%', height: 2 }} />
              <View style={styles.ModalDescription}>
                <RegularText style={{ color: '#6e6968' }}>{modalCommision.description}</RegularText>
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalCommisionDetails}>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Stawka:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>
                    {modalCommision.stawka + ' PLN'}
                  </RegularText>
                </View>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Czas wykonania:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>{modalCommision.deadline}</RegularText>
                </View>
                <View style={styles.ModalDetail}>
                  <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                  <RegularText style={{ color: '#6e6968', width: '30%' }}>
                    {getSelectedLevel(modalCommision.level)}
                  </RegularText>
                </View>
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Lokalizacja:</RegularText>
                {modalCommision.location.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                {modalCommision.tags.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                {modalCommision.skills.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <Line style={{ width: '90%', height: 1 }} />
              <View style={styles.ModalMapping}>
                <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                {modalCommision.languages.map((tag, indexT) => (
                  <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                    <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                  </Bubble>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? 'lightgrey' : darkLight,
                    },
                    styles.ModalButton,
                  ]}
                >
                  <AppText style={{ color: 'white' }}>Aplikuj!</AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    )}
    </View>)
  }

  
};


const styles = StyleSheet.create({
  ListContainer: {
    padding: 10,
    width: '95%',
  },
  Commision: {
    borderRadius: 15,
    borderColor: '#0F0F0F33',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    marginRight: 5,
    marginBottom: 10,
    width: '98%',
  },
  TopContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
  },
  TitleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    width: '80%',
    marginLeft: 5,
  },
  TitleText: {
    maxWidth: '92%',
  },
  LevelBubble: {
    maxHeight: 20,
    maxWidth: 46,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 0,
    marginBottom: 0,
    borderColor: '#a8a5a5',
    borderWidth: 1,
    
  },
  MiddleText1: {
    color: '#a8a5a5',
    fontSize: 12,
    marginHorizontal: 10,
    marginRight: 20,
  },
  MiddleText2: {
    color: '#a8a5a5',
    fontSize: 12,
    marginRight: 20,
  },
  MiddleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    justifyContent: 'flex-start',
  },
  BottomContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'flex-end',
    flexWrap: 'wrap-reverse',
  },
  TagBubble: {
    maxHeight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 2,
    borderColor: '#a8a5a5',
    borderWidth: 1,
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    width: '100%',
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ModalButton: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
  ModalDescription: {
    paddingTop: 5,
    padding: 15,
  },
  ModalCommisionDetails: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  ModalDetail: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ModalMapping: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 17,
    paddingRight: 12,
  },
  ModalTagBubble: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
    backgroundColor: primary,
  },
});
