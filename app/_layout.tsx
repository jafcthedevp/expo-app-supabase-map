import { Stack } from 'expo-router';
import '../global.css';
import AuthProvider from '@/providers/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
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
          name="(auth)/signin" 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="(auth)/signup" 
          options={{ title: 'Register' }} 
        />
        <Stack.Screen 
          name="(screens)/profile" 
          options={{ title: 'Home' }}
        />
      </Stack>
    </AuthProvider>
  );
}