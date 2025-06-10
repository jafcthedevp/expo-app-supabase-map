import { Stack, Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="homescreen.tsx"
        options={{ title: 'Home', headerShown: false }}
      />
        
    </Stack>
  );
}