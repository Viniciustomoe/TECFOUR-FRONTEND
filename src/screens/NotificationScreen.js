import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationScreen() {
  const [items, setItems] = useState([]);

  const BASE = "https://lonely-cobweb-4jq7r5797wwrcq5wr-3000.app.github.dev/api";

  const loadNotifications = async () => {
    try {
      const user = await AsyncStorage.getItem("@user:irrigacao");
      const token = JSON.parse(user)?.token;

      const res = await fetch(`${BASE}/notificacoes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setItems(data || []);
    } catch (e) {
      console.log("Erro:", e);
    }
  };

  useEffect(() => { loadNotifications(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      <FlatList
        data={items}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item?.mensagem}</Text>
            <Text style={styles.date}>{item?.data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", color: "#0b2a47", marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: "#0b2a4715",
    borderRadius: 10,
    marginBottom: 10,
  },
  text: { fontSize: 16 },
  date: { marginTop: 5, fontSize: 12, color: "#777" },
});
