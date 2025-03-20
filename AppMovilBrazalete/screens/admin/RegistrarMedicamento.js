import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StylesGen from "../../themes/stylesGen";

export default function RegistrarMedicamento() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar el correo
  return (
    <>
    <Background/>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={StylesGen.container}
    >
    <SafeAreaView style={StylesGen.container}>
    
          <View style={{marginBottom:30}}>
          <View>
            <Text style={StylesGen.title}>Registrar medicamento</Text>
            <Text style={styles.descrip}>Aqui puedes registrar medicamentos.</Text>
          </View>
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Nombre" style={StylesGen.input} />
                    <MaterialCommunityIcons name="pill" size={30} color="gray" style={StylesGen.icon} />
                </View>
                <View style={StylesGen.inputContainer}>
                    <TextInput placeholder="Descripcion" style={StylesGen.input} />
                    <MaterialCommunityIcons name="pill" size={30} color="gray" style={StylesGen.icon} />
                </View>
                <View style={{alignItems:"center"}}> 
                <TouchableOpacity style={[styles.button, !isValidEmail && styles.buttonDisabled]} disabled={!isValidEmail}>
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                </View>
          </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  
 
  descrip:{
    fontSize: 18,
    marginBottom: 20,
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
