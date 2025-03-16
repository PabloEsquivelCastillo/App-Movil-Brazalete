import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../components/Background";
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from "../themes/theme";


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
      <Background />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
        <AntDesign name="back" size={24} color={theme.colors.secondary} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false} >

            <Text style={styles.title}>Crea tu cuenta</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Nombre(s)" style={styles.input} />
              <FontAwesome name="user" size={30} color="gray" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Apellidos" style={styles.input} />
              <FontAwesome name="user" size={30} color="gray" style={styles.icon} />
            </View>
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
            {!isValidEmail && <Text style={styles.errorText}>Correo electrónico no válido</Text>}
            <View style={styles.inputContainer}>
              <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />
              <FontAwesome name="lock" size={30} color="gray" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Confirma tu contraseña" style={styles.input} secureTextEntry />
              <FontAwesome name="lock" size={30} color="gray" style={styles.icon} />
            </View>
            <TouchableOpacity style={[styles.button, !isValidEmail && styles.buttonDisabled]} disabled={!isValidEmail}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            {/* FALTA REDIGIR AL LoginScreen*/}
            <Text style={styles.createAccount}>
              ¿Ya tienes una cuenta?{'  '}
              {/* se agrega un onPress */}
              <Text style={styles.createLink} onPress={() => navigation.navigate("Inicio Sesion")} >
                Inicia sesión
              </Text>
            </Text>
          </ScrollView>
        </SafeAreaView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flex: 1
  },
  buttonBack: {
    position: 'absolute',
    top: 100, // Asegura que el ícono de regreso esté en la parte superior
    left: 20, // Asegura que esté en el margen izquierdo
  },
  innerContainer: {
    width: "100%", // Ajusta el ancho del contenido para que se vea bien
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    alignSelf: "flex-start",
    color: theme.colors.secondary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300, // Ajustar al ancho del contenedor
    height: 60,
    marginBottom: 20,
    backgroundColor: theme.colors.primary,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300, // Ajustar al ancho del contenedor
    height: 60,
    marginBottom: 5,
    backgroundColor: theme.colors.errorBackground,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#4CAF89",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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
    marginTop: 25,
    textDecorationLine: "none",
  },
  errorText: {
    color: theme.colors.errorBorder,
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left", // Alinea el texto a la izquierda
    alignSelf: "flex-start", // Asegura que el texto no esté centrado en el contenedor
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});