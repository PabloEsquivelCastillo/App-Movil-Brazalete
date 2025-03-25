import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import BackgroundDos from "../components/BackgroundDos";
import theme from "../themes/theme";
import StylesGen from "../themes/stylesGen";

export default function LoginScreen({ navigation }) {
  const { login, user } = useContext(AuthContext);  //  Importa el contexto
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
      <BackgroundDos/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={StylesGen.container2}
      >
        <View style={StylesGen.container2}>
          <Text style={StylesGen.title}>Inicia Sesión</Text>

          {/* Input de Correo */}
          <View style={[StylesGen.inputContainer, !isValidEmail && StylesGen.inputContainer2]}>
            <TextInput
              placeholder="Correo electrónico"
              style={StylesGen.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setIsValidEmail(emailRegex.test(text));
              }}
            />
            <FontAwesome name="envelope" size={25} color="gray" style={StylesGen.icon} />
          </View>
          {!isValidEmail && <Text style={styles.errorText}>Correo electrónico inválido</Text>}

          {/* Input de Contraseña */}
          <View style={[StylesGen.inputContainer, StylesGen.passwordContainer]}>
            <TextInput
              placeholder="Contraseña"
              style={StylesGen.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}  // 🔥 Guarda la contraseña
            />
            <FontAwesome name="lock" size={30} color="gray" style={StylesGen.icon} />
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
          <View style={{alignItems:'center'}} >
          {/* Link para crear cuenta */}
          <Text style={styles.createAccount}>
            ¿No tienes cuenta? <Text style={styles.createLink} onPress={() => navigation.navigate("Registro")}>Crear ahora</Text>
          </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  
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
  forgotPassword: {
    color: theme.colors.secondary,
    fontWeight: "bold",
    textAlign: "right",
    marginTop:10,
    marginBottom: 30,
    marginLeft: 100
  },
  button: {
    backgroundColor: theme.colors.secondary,
    marginTop: 10,
    marginBottom:10,
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
    alignItems: 'center'
  },
  createLink: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});


