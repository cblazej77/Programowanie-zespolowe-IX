import * as React from 'react';
import { View, Text } from 'react-native';

export default function ChatScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('HomePage')} style={{ fontsize: 26, fontWeight: 'bold' }}>
        Chat Page
      </Text>
    </View>
  );
}
