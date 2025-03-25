import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../background/Background";
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env';
export default function UpdateProfileScreen() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
    <Background/>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false} >
          <View style={{marginBottom:30}}>
          <View>
            <Text style={styles.title}>Actualiza tu perfil</Text>
            <Text style={styles.descrip}>Aqui puedes actualizar tu informacion personal.</Text>
          </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Nombre(s)" style={styles.input} />
                    <FontAwesome name="user" size={30} color="gray" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Apellidos" style={styles.input} />
                    <FontAwesome name="user" size={30} color="gray" style={styles.icon} />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry/>
                    <FontAwesome name="lock" size={30} color="gray" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Confirma tu contraseña" style={styles.input} secureTextEntry/>
                    <FontAwesome name="lock" size={30} color="gray" style={styles.icon} />
                </View>
                <View style={{alignItems:"center"}}> 
                <TouchableOpacity style={[styles.button, !isValidEmail && styles.buttonDisabled]} disabled={!isValidEmail}>
                  <Text style={styles.buttonText}>Guardar</Text>
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
  container: {
    flex: 1,
    paddingHorizontal:35
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    flex:1
  },
  
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF89",
  },
  descrip:{
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF89",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight:10 ,
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
    width:300,
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
    color: "#4CAF89",
    fontWeight: "bold",
    marginTop: 25,
    textDecorationLine: 'underline',
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
