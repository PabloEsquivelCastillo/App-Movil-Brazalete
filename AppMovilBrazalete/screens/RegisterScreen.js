import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundDos from "../components/BackgroundDos";
import { useNavigation } from '@react-navigation/native';
import StylesGen from "../themes/stylesGen";
export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
    <BackgroundDos/>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={StylesGen.container}
    >
    <SafeAreaView style={StylesGen.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false} >
          <View style={{marginBottom:30}}>
                <Text style={StylesGen.title}>Crea tu cuenta</Text>
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Nombre(s)" style={StylesGen.input} />
                    <FontAwesome name="user" size={30} color="gray" style={StylesGen.icon} />
                </View>
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Apellidos" style={StylesGen.input} />
                    <FontAwesome name="user" size={30} color="gray" style={StylesGen.icon} />
                </View>
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
              {!isValidEmail && <Text style={styles.errorText}>Correo electrónico no válido</Text>}
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Contraseña" style={StylesGen.input} secureTextEntry/>
                    <FontAwesome name="lock" size={30} color="gray" style={StylesGen.icon} />
                </View>
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Confirma tu contraseña" style={StylesGen.input} secureTextEntry/>
                    <FontAwesome name="lock" size={30} color="gray" style={StylesGen.icon} />
                </View>
                <View style={{alignItems:"center"}}> 
                <TouchableOpacity style={[StylesGen.button, !isValidEmail && StylesGen.buttonDisabled]} disabled={!isValidEmail}>
                  <Text style={StylesGen.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                </View>
                {/* FALTA REDIGIR AL LoginScreen*/}
          </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    flex:1
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left", // Alinea el texto a la izquierda
    alignSelf: "flex-start", // Asegura que el texto no esté centrado en el contenedor
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});