import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Config() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    carregarTema();
  }, []);

  async function carregarTema() {
    const tema = await AsyncStorage.getItem("temaEscuro");
    if (tema !== null) {
      setTemaEscuro(JSON.parse(tema));
    }
  }

  async function mudarTema(valor) {
    setTemaEscuro(valor);
    await AsyncStorage.setItem("temaEscuro", JSON.stringify(valor));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch value={temaEscuro} onValueChange={mudarTema} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15
  },
  label: { fontSize: 18, marginBottom: 10 },
});
