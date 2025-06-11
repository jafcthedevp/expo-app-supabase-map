import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import '../global.css'; // Import global styles

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href={"/(auth)/signin/login"} style={styles.button}>
        Go to Login
      </Link>
      <Link href={"/(auth)/signup/register"} style={styles.button}>
        Go to Register
      </Link>
      <Link href={"/(screens)/profile"} style={styles.button}>
        Go to Home Screen
      </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
