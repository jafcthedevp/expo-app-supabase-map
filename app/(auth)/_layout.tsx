import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarLabel: 'Login',
          headerShown: false,
        }}
      />
        <Tabs.Screen
          name="register"
          options={{
            title: 'register',
            tabBarLabel: 'register',
            headerShown: false,
          }}
        />
    </Tabs>
  );
}