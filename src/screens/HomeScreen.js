import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <Text style={styles.label}>Umidade</Text>
      <Text style={styles.value}>75%</Text>
      <Text style={styles.subLabel}>Umidade do solo</Text>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="power" size={20} color="#fff" />
        <Text style={styles.buttonText}>Desligar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  topBar: { height: 6, width: '100%', backgroundColor: '#2f6fd6', position: 'absolute', top: 0 },
  label: { fontSize: 20, color: '#555' },
  value: { fontSize: 70, fontWeight: 'bold', color: '#000' },
  subLabel: { fontSize: 16, color: '#aaa' },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2f6fd6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, marginLeft: 8, fontWeight: 'bold' },
});
