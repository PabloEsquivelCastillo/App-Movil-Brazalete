import React, { useState } from "react";
import Background from "../components/Background";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from "../themes/theme";

export default function RecoverScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
      <Background />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.innerContainer}>
          {/* Icono de regreso */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
            <AntDesign name="back" size={24} color={theme.colors.secondary} />
          </TouchableOpacity>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            {/* Input de Correo */}
            <View style={[styles.inputContainer, !isValidEmail && styles.inputContainer2]}>
              <TextInput placeholder="Correo electrónico" style={styles.input} value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setIsValidEmail(emailRegex.test(text));
                }} />
              <FontAwesome name="envelope" size={25} color="gray" style={styles.icon} />
            </View>
            {!isValidEmail && <Text style={styles.errorText}>Correo electrónico no válido</Text>}

            {/* Botón de Enviar */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    width: "100%",
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center", // Centra verticalmente el formulario
    alignItems: "center", // Centra horizontalmente el formulario
    width: "100%",
    position: 'relative', // Necesario para colocar el ícono de vuelta correctamente
  },
  buttonBack: {
    position: 'absolute',
    top: 100, // Asegura que el ícono de regreso esté en la parte superior
    left: 20, // Asegura que esté en el margen izquierdo
  },
  formContainer: {
    width: "100%",
    alignItems: "center", // Centra los elementos dentro del formulario
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    color: theme.colors.secondary,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "90%",
    height: 50,
    marginBottom: 30,
    backgroundColor: theme.colors.primary,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "90%", // Ajustar al ancho del contenedor
    height: 50,
    marginBottom: 5,
    backgroundColor: theme.colors.errorBackground
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
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
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: theme.colors.errorBorder,
    fontSize: 14,
    marginBottom: 20,
    textAlign: "right", // Alinea el texto a la izquierda
    alignSelf: "center", // Asegura que el texto no esté centrado en el contenedor
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});
