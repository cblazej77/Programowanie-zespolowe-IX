import React from 'react';
import { AppText, HeaderText, RegularText } from './styles';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from './styles';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { primary, secondary1, darkLight, gray1, grey } = Colors;

function CardItem(props) {
  return (
    // <View style={styles.PostStyle}>
    //     <View style={{
    //         height: '20%',
    //         alignItems: 'center',
    //         flexDirection: 'row',
    //     }}>
    //         <View style={{ height: 50, width: 50, backgroundColor: "#CCC", marginHorizontal: 10, borderRadius: 30 }} />
    //         <HeaderText numberOfLines={1} style={{
    //             color: "#000",
    //         }}>{props.name} {props.surname}</HeaderText>
    //     </View>
    //     <View style={{
    //         backgroundColor: "#CCC",
    //         height: "70%",
    //         alignItems: 'center',
    //         justifyContent: 'center'
    //     }}>
    //         <Text style={{ color: primary }}>Image not found</Text></View>
    //     <View style={{ height: '10%', justifyContent: 'center', marginLeft: 10 }}>
    //         <RegularText style={{ color: "#000", }}>{props.ratingCount} opinii</RegularText>
    //     </View>
    // </View>
    <View style={styles.PostStyle}>
      <View style={styles.SimpleInfoContainer}>
        <Image style={styles.Avatar} resizeMode="cover" source={require('./../assets/img/avatar1.png')} />
        <AppText style={{ color: gray1 }}>{props.level}</AppText>
        <RegularText style={{ fontSize: 20, marginTop: 10 }}>
          {props.name} {props.surname}
        </RegularText>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <Stars
            default={props.rating}
            count={5}
            // podana wielkość nic nie zmienia
            starSize={50} 
            half={false}
            disabled={true}
            fullStar={<Icon name={'star'} style={[styles.Star]}/>}
            halfStar={<Icon name={'star-half'} style={[styles.Star]}/>}
            emptyStar={<Icon name={'star'} style={[styles.Star, { color: grey }]}/>}
          />
          <AppText style={{ color: darkLight, fontSize: 12, marginLeft: 5 }}>({props.ratingCount} opinii)</AppText>
        </View>
      </View>
      <Image style={styles.Photo} resizeMode="cover" source={require('./../assets/img/image1.jpg')} />
    </View>
  );
}

export default CardItem;

const styles = StyleSheet.create({
  PostStyle: {
    flexDirection: 'row',
    backgroundColor: secondary1,
    height: 220,
    width: '95%',
    marginBottom: 30,
    borderRadius: 5,
  },
  SimpleInfoContainer: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  Photo: {
    height: '100%',
    width: '50%',
  },
  Avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  Star: {
    color: '#ffe234',
    fontSize: 20,
    textShadowColor: grey,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});
