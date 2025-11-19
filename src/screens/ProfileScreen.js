import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/Auth';

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const { user, signOut } = useAuth();

  // Nome vindo do backend
  const username = user?.user?.usuario || "Usuário";

  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) setImage(savedImage);
    };
    loadImage();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  const handleLogout = async () => {
    await signOut(); // usa Auth.js corretamente
  };

  return (
    <View style={styles.container}>
      
      {/* Foto */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={120} color="#aaa" />
        )}
      </TouchableOpacity>

      {/* Nome do usuário */}
      <Text style={styles.username}>{username}</Text>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },

  imageContainer: {
    marginBottom: 15,
  },

  profileImage: { 
    width: 130, 
    height: 130, 
    borderRadius: 70, 
    borderWidth: 3, 
    borderColor: '#0b2a47' 
  },

  username: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#0b2a47',
    marginBottom: 35 
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b2a47',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  logoutText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
    marginLeft: 8 
  },
});
