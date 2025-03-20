import React, { useState } from "react";
import BackgroundDos from "../components/BackgroundDos";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from "../themes/theme";
import StylesGen from "../themes/stylesGen";

export default function RecoverScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
      <BackgroundDos />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={StylesGen.container}>
        <View style={styles.innerContainer}>
          
          {/* Formulario */}
          <View style={styles.formContainer}>
            <Text style={StylesGen.title}>Recuperar Contraseña</Text>
            {/* Input de Correo */}
            <View style={[StylesGen.inputContainer, !isValidEmail && StylesGen.inputContainer2]}>
              <TextInput placeholder="Correo electrónico" style={StylesGen.input} value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setIsValidEmail(emailRegex.test(text));
                }} />
              <FontAwesome name="envelope" size={25} color="gray" style={StylesGen.icon} />
            </View>
            {!isValidEmail && <Text style={styles.errorText}>Correo electrónico no válido</Text>}

            {/* Botón de Enviar */}
            <TouchableOpacity style={StylesGen.button}>
              <Text style={StylesGen.buttonText}>Enviar</Text>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    flex:1
  },
  
  innerContainer: {
    flex: 1,
    justifyContent: "center", // Centra verticalmente el formulario
    width: "100%",
    position: 'relative', // Necesario para colocar el ícono de vuelta correctamente
    marginBottom:100
  },
  buttonBack: {
    paddingTop: 30,
    paddingHorizontal: 10,
    color: theme.colors.secondary
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
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
  buttonBack: {
    paddingTop: 30,
    color: theme.colors.secondary
  },
});
