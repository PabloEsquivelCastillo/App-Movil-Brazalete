import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import Background from "../components/Background";
import theme from "../themes/theme";

export default function LoginScreen({ navigation }) {
  const { login, user } = useContext(AuthContext);  // 🔥 Importa el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo

  // Redirige al usuario después de iniciar sesión
  React.useEffect(() => {
    if (user) {
      navigation.replace(user.role === "admin" ? "AdminStack" : "CaregiverStack");
    }
  }, [user]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Inicia Sesión</Text>

          {/* Input de Correo */}
          <View style={[styles.inputContainer, !isValidEmail && styles.inputContainer2]}>
            <TextInput
              placeholder="Correo electrónico"
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setIsValidEmail(emailRegex.test(text));
              }}
            />
            <FontAwesome name="envelope" size={25} color="gray" style={styles.icon} />
          </View>
          {!isValidEmail && <Text style={styles.errorText}>Correo electrónico inválido</Text>}

          {/* Input de Contraseña */}
          <View style={[styles.inputContainer, styles.passwordContainer]}>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}  // 🔥 Guarda la contraseña
            />
            <FontAwesome name="lock" size={30} color="gray" style={styles.icon} />
          </View>

          {/* Olvidaste tu contraseña */}
          <TouchableOpacity onPress={() => navigation.navigate("Recuperar")}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => login(email, password)}  // 🔥 Llama a login()
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* Link para crear cuenta */}
          <Text style={styles.createAccount}>
            ¿No tienes cuenta? <Text style={styles.createLink} onPress={() => navigation.navigate("Registro")}>Crear ahora</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "flex-start",
    color: theme.colors.secondary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: theme.colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%", // El ancho será 100%
    height: 55,
    marginBottom: 25,
    backgroundColor: theme.colors.primary,
    color: "#665F5D",
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: theme.colors.errorBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%", // El ancho será 100%
    height: 55,
    marginBottom: 5,
    backgroundColor: theme.colors.errorBackground,
  },
  errorText: {
    color: theme.colors.errorBorder,
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  passwordContainer: {
    borderColor: "#4CAF89",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    color: theme.colors.secondary,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 30,
    marginLeft: 100
  },
  button: {
    backgroundColor: theme.colors.secondary,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%", // El ancho será 100%
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 20,
    color: "#666",
  },
  createLink: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});


