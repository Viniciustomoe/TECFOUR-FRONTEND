import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/Auth";

export default function Home() {
  const [umidade, setUmidade] = useState(0);
  const [statusTexto, setStatusTexto] = useState("");

  const { user } = useAuth();
  const token = user?.user?.token;

  const baseURL = "https://backend-irrigacao-grazi.onrender.com/api";

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      fetchStatus();
    }, 3000);

    fetchStatus(); // primeira chamada

    return () => clearInterval(interval);
  }, [token]);


  // 🔥 BUSCA CORRETA DO BACKEND /status
  const fetchStatus = async () => {
    try {
      const response = await fetch(`${baseURL}/status`, {
        method: "GET",
        headers,
      });

      const json = await response.json();
      console.log("STATUS RECEBIDO:", json);

      // Backend retorna:
      // { ligada: false, texto: "🌤️ Desligada", horario: "2025-11-25 ..." }

      setStatusTexto(json.texto);

      // Só para exibir no círculo: bomba = 100% ligada, 0% desligada
      setUmidade(json.ligada ? 100 : 0);

    } catch (err) {
      console.error("Erro ao buscar status:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Status da Irrigação</Text>

      <View style={styles.umidadeContainer}>
        <Text style={styles.umidadeTexto}>{umidade}%</Text>
      </View>

      <Text style={styles.statusBomba}>{statusTexto}</Text>
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
    marginTop: 20,
  },
});
