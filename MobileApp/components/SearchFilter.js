import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';


const SearchFilter = ({data, input, setInput}) => {
    return (
        <View style={{marginTop:10}}>
            <FlatList data={data} renderItem={({item}) => {
                if(input === ""){
                    return (
                        <View style={{marginVertical:10}}>
                            <Text style = {{fontSize:14, fontWeight:"bold"}}>{item.title}</Text> 
                            <Text style = {{borderColor:"grey", borderWidth:1, height:1, marginTop:5}}></Text>   
                        </View>
                    )
                }

                if(item.title.toLowerCase().includes(input.toLowerCase())){
                    return (
                        <View style={{marginVertical:10}}>
                            <Text style = {{fontSize:14, fontWeight:"bold"}}>{item.title}</Text> 
                            <Text style = {{borderColor:"grey", borderWidth:1, height:1, marginTop:5}}></Text>   
                        </View>
                    )
                }
            }}/>
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({})