import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext();

const BACKEND_URL = "https://backend-irrigacao-grazi.onrender.com/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ------- LOGIN NO BACKEND -------
  const authUser = async (usuario, senha) => {
    try {
      const res = await fetch(`${BACKEND_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }), // <-- CORRETO
      });

      if (!res.ok) {
        const err = await res.json();
        return { ok: false, status: res.status, error: err.message };
      }

      const resBody = await res.json();
      return { ok: true, status: res.status, data: resBody };
    } catch (err) {
      return { ok: false, status: 0, error: err.message };
    }
  };

  // ------- CARREGA USUÁRIO SALVO -------
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("@user:irrigacao");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          autenticated: true,
          user: parsed,
          role: parsed.role,
        });
      } else {
        setUser({
          autenticated: false,
          user: null,
          role: null,
        });
      }
    };
    loadUser();
  }, []);

  // ------- LOGIN -------
  const signIn = async ({ usuario, senha }) => {
    const userExists = await authUser(usuario, senha);

    if (!userExists.ok || !userExists.data?.token) {
      await AsyncStorage.removeItem("@user:irrigacao");
      throw new Error("Usuário ou senha inválidos");
    }

    await AsyncStorage.setItem(
      "@user:irrigacao",
      JSON.stringify(userExists.data)
    );

    setUser({
      autenticated: true,
      user: userExists.data,
      role: userExists.data.role,
    });

    return userExists.data;
  };

  // ------- LOGOUT -------
  const signOut = async () => {
    await AsyncStorage.removeItem("@user:irrigacao");
    setUser({
      autenticated: false,
      user: null,
      role: null,
    });
  };

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}