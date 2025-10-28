import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await AsyncStorage.setItem('usuario', usuario);
    await AsyncStorage.setItem('senha', senha);
    Alert.alert('Sucesso', 'Cadastro realizado!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <InputField placeholder="Usuário" value={usuario} onChangeText={setUsuario} />
      <InputField placeholder="Senha" secure={true} value={senha} onChangeText={setSenha} />
      <ButtonPrimary title="CADASTRAR" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0b2a47', marginBottom: 20, textAlign: 'center' },
});
