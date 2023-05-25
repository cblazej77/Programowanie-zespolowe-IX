import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';
import { HeaderText, Colors, AppText, StatsText, RegularText, Bubble, Line } from '../../components/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { CommisionElement } from '../../components/CommisionElement';
import * as SecureStore from 'expo-secure-store';
import { default as baseURL } from '../../components/AxiosAuth';
import axios from 'axios';


const { black, primary, gray, darkLight } = Colors;

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key);
  }
  return result;
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

// const commisionsData = [
//   {
//     title: 'Projekt logo dla firmy produkującej kosmetyki naturalne',
//     description:
//       'Poszukujemy osoby do zaprojektowania logo dla naszej firmy. Chcielibyśmy, żeby logo nawiązywało do idei naturalności i ekologii, które są dla nas ważne. W zamian oferujemy dobre wynagrodzenie i ciekawe projekty do realizacji w przyszłości',
//     stawka: 2000,
//     deadline: '2 tyg.',
//     level: ['Mid'],
//     location: ['Zdalnie'],
//     tags: ['Design logo', 'Kosmetyki', 'Ekologia'],
//     skills: ['Maskotka'],
//     languages: ['Polski', 'Angielski'],
//   },
//   {
//     title: 'Projekt opakowań dla nowej marki herbat ekologicznych',
//     description:
//       'Szukamy doświadczonego projektanta graficznego, który zaprojektuje dla nas opakowania do naszych herbat ekologicznych. Zależy nam na kreatywnym podejściu, które pozwoli wyróżnić nasze produkty na rynku. Oferujemy konkurencyjne wynagrodzenie oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.',
//     stawka: 3000,
//     deadline: '3 tyg.',
//     level: ['Senior'],
//     location: [],
//     tags: ['Design opakowań', 'Herbaty', 'Ekologia'],
//     skills: ['Maskotka'],
//     languages: ['Polski', 'Angielski'],
//   },
//   {
//     title: 'Projekt plakatu promującego wystawę sztuki nowoczesnej',
//     description:
//       'Jesteśmy galerią sztuki i poszukujemy projektanta graficznego, który zaprojektuje dla nas plakat promujący zbliżającą się wystawę sztuki nowoczesnej. Zależy nam na ciekawym i oryginalnym projekcie, który przyciągnie uwagę potencjalnych zwiedzających. Oferujemy dobrą stawkę oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.',
//     stawka: 1222500,
//     deadline: '2 tyg.',
//     level: ['Junior', 'Mid', 'Senior'],
//     location: ['Bydgoszcz', 'Torun', 'Warszawa', 'Zdalnie'],
//     tags: [
//       'Design plakatu',
//       'Sztuka',
//       'Wystawa',
//       'Sztukaaa',
//       'Design plakatu',
//       'Sztuka',
//       'Wystawa',
//       'Design plakatu',
//       'Sztuka',
//       'Wystawa',
//     ],
//     skills: ['Maskotka'],
//     languages: ['Polski', 'Angielski'],
//   },
// ];

const CompanyCommisions = ({ route, navigation }) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [commisionsData, setCommisionsData] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [modalCommision, setModalCommision] = useState('');

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

  async function getAccessToken() {
    const t = await getValueFor('accessToken');
    setToken(t);
    console.log(t);
  }

  async function getUserInfo() {
    const u = await getValueFor('user');
    setUserInfo(JSON.parse(u));
    console.log(u);
  }

  useEffect(() => {
    getAccessToken();
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/commission/getAllCommissionFirmByUsername/' + userInfo.username,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const fetchData = async () => {
        try {
          const result = await axios.request(config);
          console.log(result.data);
          setCommisionsData(result.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={{ backgroundColor: primary, alignItems: 'center', height: useWindowDimensions().height }}>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <HeaderText numberOfLines={1} style={{ color: black }}>
          Zlecenia
        </HeaderText>
      </View>

      <View style={{ backgroundColor: primary }}>
        {commisionsData.map((cms, indexC) => (
          <TouchableOpacity
            onPress={() => {
              setisModalVisible(true);
              setModalCommision(cms);
            }}
            key={indexC}
          >
            <CommisionElement
              name={cms.company_name}
              key={indexC}
              title={cms.title}
              description={cms.description}
              rate={cms.rate}
              deadline={cms.deadline}
              level={getSelectedLevel(cms.level)}
              location={cms.location}
              tags={cms.tags}
            />
          </TouchableOpacity>
        ))}
      </View>
      {modalCommision && (
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                      {modalCommision.rate + ' PLN'}
                    </RegularText>
                  </View>
                  <View style={styles.ModalDetail}>
                    <RegularText style={{ width: '60%' }}>Termin:</RegularText>
                    <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                      {modalCommision.deadline}
                    </RegularText>
                  </View>
                  <View style={styles.ModalDetail}>
                    <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                    <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                      {getSelectedLevel(modalCommision.level)}
                    </RegularText>
                  </View>
                </View>
                <Line style={{ width: '90%', height: 1 }} />
                <View style={styles.ModalMapping}>
                  <RegularText style={{ marginRight: 5 }}>Lokalizacja:</RegularText>
                  {modalCommision.location.map((tag, indexT) => (
                    <Bubble style={[styles.ModalTagBubble]} key={indexT}>
                      <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                    </Bubble>
                  ))}
                </View>
                <Line style={{ width: '90%', height: 1 }} />
                <View style={styles.ModalMapping}>
                  <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                  {modalCommision.tags.map((tag, indexT) => (
                    <Bubble style={[styles.ModalTagBubble]} key={indexT}>
                      <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                    </Bubble>
                  ))}
                </View>
                <Line style={{ width: '90%', height: 1 }} />
                <View style={styles.ModalMapping}>
                  <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                  {modalCommision.skills.map((tag, indexT) => (
                    <Bubble style={[styles.ModalTagBubble]} key={indexT}>
                      <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                    </Bubble>
                  ))}
                </View>
                <Line style={{ width: '90%', height: 1 }} />
                <View style={styles.ModalMapping}>
                  <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                  {modalCommision.languages.map((tag, indexT) => (
                    <Bubble style={[styles.ModalTagBubble]} key={indexT}>
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
    </SafeAreaView>
  );
};

export default CompanyCommisions;

const styles = StyleSheet.create({
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
    backgroundColor: primary,
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
    paddingRight: 17,
  },
  ModalTagBubble: {
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
    borderColor: '#0F0F0F33',
    borderWidth: 1.6,
  },
});
