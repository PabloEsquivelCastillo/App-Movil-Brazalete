import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundDos from "../components/BackgroundDos";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import StylesGen from "../themes/stylesGen";
import { API_BASE_URL } from "@env";
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rol = "keeper";
  const edo = true;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false); // Estado para mostrar carga

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true); // Inicia el estado de carga

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users`,
        {
          name,
          email,
          phone,
          password,
          rol,
          edo,
        }
      );

      // Limpiar el formulario
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      Alert.alert(
        "Éxito",
        "Tu solicitud ha sido enviada."
      );
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "No se pudo crear la cuenta");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <>
      <BackgroundDos />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView style={StylesGen.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 30 }}>
              <Text style={StylesGen.title}>Crea tu cuenta</Text>
              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Nombre(s)"
                  style={StylesGen.input}
                  value={name}
                  onChangeText={setName}
                />
                <FontAwesome
                  name="user"
                  size={30}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>

              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Teléfono"
                  style={StylesGen.input}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <FontAwesome
                  name="phone"
                  size={25}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>

              <View
                style={[
                  StylesGen.inputContainer,
                  !isValidEmail && StylesGen.inputContainer2,
                ]}
              >
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
                <FontAwesome
                  name="envelope"
                  size={25}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>
              {!isValidEmail && (
                <Text style={styles.errorText}>
                  Correo electrónico no válido
                </Text>
              )}

              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Contraseña"
                  style={StylesGen.input}
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
                />
                <FontAwesome
                  name="lock"
                  size={30}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>

              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Confirma tu contraseña"
                  style={StylesGen.input}
                  value={confirmPassword}
                  secureTextEntry
                  onChangeText={setConfirmPassword}
                />
                <FontAwesome
                  name="lock"
                  size={30}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>


              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    StylesGen.button,
                    (!isValidEmail || loading) && styles.buttonDisabled,
                  ]}
                  disabled={!isValidEmail || loading}
                  onPress={handleRegister}
                >
                  <Text style={StylesGen.buttonText}>
                    {loading ? "Registrando..." : "Registrarse"}
                  </Text>
                </TouchableOpacity>
              </View>
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
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});
