import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";

export default function CadastroScreen({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    if (!usuario || !senha)
      return Alert.alert("Preencha todos os campos!");

    try {
      const response = await fetch(
        "https://lonely-cobweb-4jq7r5797wwrcq5wr-3000.app.github.dev/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, senha }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert(data?.message || "Erro ao cadastrar.");
      }

      Alert.alert("Cadastro realizado!", "Agora faça o login.");
      navigation.goBack();

    } catch (e) {
      Alert.alert("Erro de conexão.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <InputField placeholder="Usuário" value={usuario} onChangeText={setUsuario}/>
      <InputField placeholder="Senha" value={senha} secure={true} onChangeText={setSenha}/>

      <ButtonPrimary title="CADASTRAR" onPress={handleCadastro} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.footerText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#0b2a47", marginBottom: 20 },
  footerText: { marginTop: 20, textAlign: "center", color: "#0b2a47" },
});
