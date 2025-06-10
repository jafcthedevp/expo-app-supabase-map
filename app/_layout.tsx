import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerShown: false,
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ title: 'Login' }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ title: 'Register' }} 
      />
      <Stack.Screen 
        name="homescreen" 
        options={{ title: 'Home' }}
      />
    </Stack>
  );
}