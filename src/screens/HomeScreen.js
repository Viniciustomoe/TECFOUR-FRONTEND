import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/Auth";

export default function Home() {
  const [umidade, setUmidade] = useState(0);
  const [statusTexto, setStatusTexto] = useState("");

  const { user } = useAuth();
  const token = user?.user?.token;

  const baseURL = "https://backend-irrigacao-grazi.onrender.com/api";

  // Só manda authorization se tiver token
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

    // Atualiza a cada 3 segundos
    const interval = setInterval(() => {
      fetchUmidade();
    }, 3000);

    fetchUmidade(); // primeira chamada imediata

    return () => clearInterval(interval);
  }, [token]);

  const fetchUmidade = async () => {
    try {
      const page = await fetch(`${baseURL}/umidade/ultima`, {
        method: "GET",
        headers,
      });

      const json = await page.json();
      console.log("UMIDADE RECEBIDA:", json);

      // Se o backend estiver assim: { valor: 55, createdAt: ... }
      if (json?.valor !== undefined) {
        setUmidade(json.valor);
      }

      // Se quiser mostrar status da bomba automaticamente:
      if (json?.valor <= 30) {
        setStatusTexto("Solo seco — bomba ligada");
      } else {
        setStatusTexto("Solo adequado — bomba desligada");
      }

    } catch (err) {
      console.error("Erro ao buscar umidade:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Umidade do Solo</Text>

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
