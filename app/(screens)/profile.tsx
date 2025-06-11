import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase'; // Adjust the import path as necessary

interface ProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string;
    joinDate?: string;
    followers?: number;
    following?: number;
    posts?: number;
  };
  onEditProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  user = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    bio: 'Desarrollador móvil apasionado por React Native y tecnologías emergentes.',
    location: 'Lima, Perú',
    joinDate: 'Enero 2023',
    followers: 1234,
    following: 567,
    posts: 89,
  },
  onEditProfile,
  onSettings,
  onLogout,
}) => {
  const profileStats = [
    { label: 'Posts', value: user.posts || 0 },
    { label: 'Seguidores', value: user.followers || 0 },
    { label: 'Siguiendo', value: user.following || 0 },
  ];

  const menuItems = [
    {
      icon: 'person-outline' as const,
      title: 'Editar Perfil',
      onPress: onEditProfile,
    },
    {
      icon: 'settings-outline' as const,
      title: 'Configuración',
      onPress: onSettings,
    },
    {
      icon: 'help-circle-outline' as const,
      title: 'Ayuda',
      onPress: () => console.log('Ayuda'),
    },
    {
      icon: 'information-circle-outline' as const,
      title: 'Acerca de',
      onPress: () => console.log('Acerca de'),
    },
  ];

  const signOut = async () => {
    try {

      const { error } = await supabase.auth.signOut();
      // await supabase.auth.signOut();
      onLogout?.();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900">Perfil</Text>
          <TouchableOpacity
            onPress={onSettings}
            className="p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="settings-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View className="px-6 py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <View className="items-center">
            {/* Avatar */}
            <View className="relative mb-4">
              {user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center border-4 border-white shadow-lg">
                  <Ionicons name="person" size={40} color="#6B7280" />
                </View>
              )}
              <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg">
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {user.name}
            </Text>
            <Text className="text-gray-600 mb-3">{user.email}</Text>

            {/* Bio */}
            {user.bio && (
              <Text className="text-gray-700 text-center mb-4 px-4 leading-6">
                {user.bio}
              </Text>
            )}

            {/* Location & Join Date */}
            <View className="flex-row items-center mb-6 space-x-4">
              {user.location && (
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">{user.location}</Text>
                </View>
              )}
              {user.joinDate && (
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">
                    Desde {user.joinDate}
                  </Text>
                </View>
              )}
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
              onPress={onEditProfile}
              className="bg-blue-500 px-8 py-3 rounded-full shadow-lg active:bg-blue-600"
            >
              <Text className="text-white font-semibold text-base">
                Editar Perfil
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row bg-white border-b border-gray-100">
          {profileStats.map((stat, index) => (
            <TouchableOpacity
              key={stat.label}
              className={`flex-1 py-6 items-center ${
                index < profileStats.length - 1 ? 'border-r border-gray-100' : ''
              }`}
            >
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(stat.value)}
              </Text>
              <Text className="text-gray-600 text-sm">{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View className="bg-white mt-6 mx-6 rounded-xl shadow-sm border border-gray-100">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              onPress={item.onPress}
              className={`flex-row items-center px-6 py-4 ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              } active:bg-gray-50`}
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Ionicons name={item.icon} size={20} color="#6B7280" />
              </View>
              <Text className="flex-1 text-gray-900 font-medium text-base">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={signOut}
          className="mx-6 mt-6 mb-8 bg-red-50 border border-red-200 rounded-xl py-4 active:bg-red-100"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="text-red-600 font-semibold text-base ml-2">
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;