import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.text}>Nenhuma notificação no momento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0b2a47', marginBottom: 10 },
  text: { fontSize: 16, color: '#555' },
});
