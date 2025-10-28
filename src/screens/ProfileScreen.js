import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [image, setImage] = useState(null);

  // Carrega a imagem salva ao abrir o app
  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) setImage(savedImage);
    };
    loadImage();
  }, []);

  // Escolher imagem
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

  // Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('senha');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-circle-outline" size={100} color="#aaa" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.username}>Usuário</Text>
      </View>

      {/* Botão de Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  profileContainer: { alignItems: 'center', marginBottom: 40 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#0b2a47' },
  placeholder: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center' },
  username: { marginTop: 10, fontSize: 18, fontWeight: 'bold', color: '#0b2a47' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b2a47',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});
