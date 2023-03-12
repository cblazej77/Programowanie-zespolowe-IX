import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomePage({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => alert('This is the HomePage')}
                style={{ fontsize: 26, fontWeight: 'bold'}}>Home Page</Text>
        </View>    
    );
}