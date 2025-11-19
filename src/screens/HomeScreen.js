import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function Home({ token }) {
  const [umidade, setUmidade] = useState(0);
  const [bombaLigada, setBombaLigada] = useState(false);
  const [statusTexto, setStatusTexto] = useState("");

  const api = axios.create({
    baseURL: "http://SEU_BACKEND_AQUI", // substitua pelo seu backend
    headers: { Authorization: `Bearer ${token}` },
  });

  // Buscar umidade e estado da bomba a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchUmidade();
      await fetchStatusBomba();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchUmidade = async () => {
    try {
      const res = await api.get("/umidade/ultima");
      setUmidade(res.data.valor);
    } catch (err) {
      console.error("Erro ao buscar umidade:", err);
    }
  };

  const fetchStatusBomba = async () => {
    try {
      const res = await api.get("/agua");
      setBombaLigada(res.data.ligada === 1);
      setStatusTexto(res.data.statusTexto);
    } catch (err) {
      console.error("Erro ao buscar status da bomba:", err);
    }
  };

  const ligarBomba = async () => {
    try {
      await api.post("/agua/ligar");
      setBombaLigada(true);
      setStatusTexto("🚿 Ligada (manual)");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível ligar a bomba.");
      console.error(err);
    }
  };

  const desligarBomba = async () => {
    try {
      await api.post("/agua/desligar");
      setBombaLigada(false);
      setStatusTexto("🌤️ Desligada (manual)");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível desligar a bomba.");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Umidade do Solo</Text>
      <View style={styles.umidadeContainer}>
        <Text style={styles.umidadeTexto}>{umidade}%</Text>
      </View>

      <Text style={styles.statusBomba}>{statusTexto}</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoLigar} onPress={ligarBomba}>
          <Text style={styles.textoBotao}>Ligar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoDesligar} onPress={desligarBomba}>
          <Text style={styles.textoBotao}>Desligar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 40,
  },
  umidadeContainer: {
    backgroundColor: "#ecf0f1",
    borderRadius: 150,
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  umidadeTexto: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#2980b9",
  },
  statusBomba: {
    fontSize: 20,
    color: "#34495e",
    marginBottom: 30,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  botaoLigar: {
    flex: 1,
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  botaoDesligar: {
    flex: 1,
    backgroundColor: "#c0392b",
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "#ecf0f1",
    fontSize: 18,
    fontWeight: "bold",
  },
});
