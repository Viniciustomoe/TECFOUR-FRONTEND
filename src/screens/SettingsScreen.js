import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Config() {
  const [umidadeMinima, setUmidadeMinima] = useState("");
  const [umidadeMaxima, setUmidadeMaxima] = useState("");

  useEffect(() => {
    buscarConfiguracoes();
  }, []);

  async function buscarConfiguracoes() {
    try {
      const res = await fetch("https://lonely-cobweb-4jq7r5797wwrcq5wr-3000.app.github.dev/config");
      const data = await res.json();

      setUmidadeMinima(data.umidadeMinima.toString());
      setUmidadeMaxima(data.umidadeMaxima.toString());

    } catch (e) {
      console.log("Erro ao carregar config:", e);
    }
  }

  async function salvar() {
    try {
      await fetch("https://lonely-cobweb-4jq7r5797wwrcq5wr-3000.app.github.dev/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          umidadeMinima: Number(umidadeMinima),
          umidadeMaxima: Number(umidadeMaxima)
        })
      });

      alert("Configurações salvas com sucesso!");
    } catch (e) {
      console.log("Erro ao salvar config:", e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do Sistema</Text>

      <View style={styles.card}>
        
        <Text style={styles.label}>Umidade mínima (%)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={umidadeMinima}
          onChangeText={setUmidadeMinima}
        />

        <Text style={styles.label}>Umidade máxima (%)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={umidadeMaxima}
          onChangeText={setUmidadeMaxima}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={salvar}>
          <Text style={styles.saveText}>Salvar Configurações</Text>
        </TouchableOpacity>

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
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 20
  },
  saveBtn: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
