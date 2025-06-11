import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase'; // Importa tu cliente de Supabase

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen(){
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): Boolean => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleRegister = async (): Promise<void> => {

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      })

    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error', 'Ocurrió un error al crear tu cuenta. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }

  }


  const goTologin = (): void => {
    router.push('/(auth)/signin');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 40 }}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-6">
              <Ionicons name="person-add" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Crear cuenta
            </Text>
            <Text className="text-gray-600 text-center">
              Únete a nuestra comunidad
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Name Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">
                Nombre completo
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 pr-12"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  autoCapitalize="words"
                />
                <View className="absolute right-4 top-4">
                  <Ionicons name="person-outline" size={20} color="#9CA3AF" />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">
                Correo electrónico
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 pr-12"
                  placeholder="ejemplo@correo.com"
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
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirm Password Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">
                Confirmar contraseña
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 pr-12"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              className="flex-row items-center mt-4"
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${acceptTerms ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                {acceptTerms && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text className="text-gray-600 flex-1">
                Acepto los{' '}
                <Text className="text-green-500 font-medium">
                  términos y condiciones
                </Text>
                {' '}y la{' '}
                <Text className="text-green-500 font-medium">
                  política de privacidad
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mt-6 ${isLoading ? 'bg-green-300' : 'bg-green-500'
                }`}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text className="text-white font-semibold text-lg">
                  Creando cuenta...
                </Text>
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Crear cuenta
                </Text>
              )}
            </TouchableOpacity>

            {/* Social Register */}
            <View className="mt-8">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">O regístrate con</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <View className="flex-row space-x-4">
                <TouchableOpacity className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 items-center">
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 items-center">
                  <Ionicons name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 items-center">
                  <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">
                ¿Ya tienes cuenta?{' '}
              </Text>
              <TouchableOpacity onPress={goTologin}>
                <Text className="text-green-500 font-medium">
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
