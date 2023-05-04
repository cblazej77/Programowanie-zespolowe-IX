import React from 'react';
import { HeaderText, RegularText } from './styles';
import { StyleSheet } from 'react-native';
import { Colors } from './styles';

const { primary, secondary1 } = Colors;

function CardItem(props) {
    return (
        <View style={styles.PostStyle}>
            <View style={{
                height: '20%',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <View style={{ height: 50, width: 50, backgroundColor: "#CCC", marginHorizontal: 10, borderRadius: 30 }} />
                <HeaderText numberOfLines={1} style={{
                    color: "#FFF",
                }}>{props.name} {props.surname}</HeaderText>
            </View>
            <View style={{
                backgroundColor: "#CCC",
                height: "70%",
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ color: primary }}>Image not found</Text></View>
            <View style={{ height: '10%', justifyContent: 'center', marginLeft: 10 }}>
                <RegularText style={{ color: "#FFF", }}>{props.ratingCount} opinii</RegularText>
            </View>
        </View>
    );
}

export default CardItem;

const styles = StyleSheet.create({
    PostStyle: {
        backgroundColor: secondary1,
        height: 350,
        minWidth: "90%",
        maxWidth: "90%",
        marginBottom: 15,
        borderRadius: 5,
    },
});