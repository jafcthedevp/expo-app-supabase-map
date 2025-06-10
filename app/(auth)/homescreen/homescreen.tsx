import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, color: '#333' }}>Welcome to the Home Screen!</Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>This is where you can see your dashboard.</Text>
    </View>
  );
}   