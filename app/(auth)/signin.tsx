import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface FormData {
  email: string;
  password: string;
}


const LoginScreen = () => {
  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [infoAlert, setInfoAlert] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);

    try {
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
          setIsLoading(false);
          return;
        }
      }
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
      if (error) {
        Alert.alert('Error', error.message);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo más tarde.');
    }
  };

      const handleSocialLogin = (provider: string) => {
        if (provider === 'logo-google') {
          // Lógica para Google
        } else if (provider === 'logo-apple') {
          // Lógica para Apple
        } else if (provider === 'logo-facebook') {
          // Lógica para Facebook
        }
      };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Se ha enviado un enlace a tu correo');
  };

  const goToregister = () => {
    router.push('/(auth)/signup');
  };

  const buttons = [
    {
      name: "logo-google",
      color: "#DB4437",
    },
    {
      name: "logo-apple",
      color: "#000",
    },
    {
      name: "logo-facebook",
      color: "#1877F2",
    }
  ]

  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">
          {/* Header */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-6">
              <Ionicons name="person" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Bienvenido
            </Text>
            <Text className="text-gray-600 text-center">
              Inicia sesión para 
            </Text>
          </View>

           

          {/* Form */}
          <View className="space-y-4">
            {/* Email Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">
                Correo electrónico
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 pr-12"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View className="absolute right-4 top-4">
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">
                Contraseña
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 pr-12"
                  placeholder="********"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end"
              onPress={handleForgotPassword}
            >
              <Text className="text-blue-500 font-medium">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mt-6 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'
                }`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text className="text-white font-semibold text-lg">
                  Iniciando sesión...
                </Text>
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Iniciar sesión
                </Text>
              )}
            </TouchableOpacity>

            {/* Social Login */}
            <View className="mt-8">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">O continúa con</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <View className="flex-row space-x-4">
                {buttons.map((btn, idx) => (
                  <TouchableOpacity
                    key={btn.name}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 items-center"
                    onPress={() => handleSocialLogin(btn.name)}
                  >
                    <Ionicons name={btn.name as any} size={24} color={btn.color} />
                  </TouchableOpacity>
                ))}
              </View>
              
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">
                ¿No tienes cuenta?{' '}
              </Text>
              <TouchableOpacity onPress={goToregister}>
                <Text className="text-blue-500 font-medium">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;