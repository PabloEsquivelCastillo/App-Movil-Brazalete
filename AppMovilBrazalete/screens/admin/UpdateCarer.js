import React, { useContext, useEffect, useState } from "react";
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
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "@env";
import axios from "axios";

export default function UpdateProfileScreen() {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [nombreError, setNombreError] = useState(null);
  const [telefonoError, setTelefonoError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  // Función para limpiar y validar el nombre
  const cleanNombreInput = (text) => {
    return text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  };

  // Función para validar espacios en blanco
  const isWhitespaceOnly = (str) => {
    return !str || !str.trim();
  };

  // Cargar datos del usuario
  useEffect(() => {
    const fetchCuidador = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNombre(response.data.name);
        setTelefono(response.data.phone);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el usuario");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchCuidador();
    }
  }, [id, token]);

  // Validar nombre
  const handleNombreChange = (text) => {
    const cleaned = cleanNombreInput(text);
    setNombre(cleaned);
    
    if (isWhitespaceOnly(cleaned)) {
      setNombreError("El nombre no puede estar vacío");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(cleaned)) {
      setNombreError("Solo letras y espacios permitidos");
    } else {
      setNombreError(null);
    }
  };

  // Validar teléfono
  const handleTelefonoChange = (text) => {
    // Solo permitir números
    const cleaned = text.replace(/[^0-9]/g, '');
    setTelefono(cleaned);
    
    if (isWhitespaceOnly(cleaned)) {
      setTelefonoError("El teléfono no puede estar vacío");
    } else if (!/^[0-9]{10}$/.test(cleaned)) {
      setTelefonoError("Debe tener 10 dígitos");
    } else {
      setTelefonoError(null);
    }
  };

  // Actualizar perfil
  const handleRegister = async () => {
    // Verificar errores
    if (nombreError || telefonoError) {
      Alert.alert("Error", "Por favor corrige los errores en el formulario");
      return;
    }

    // Validación final
    if (isWhitespaceOnly(nombre) || isWhitespaceOnly(telefono)) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        `${API_BASE_URL}/api/users/${id}`,
        {
          name: nombre.trim(),
          phone: telefono.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Éxito", "Perfil actualizado", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  // Estado de carga
  if (loadingData) {
    return (
      <Background>
        <SafeAreaView style={[StylesGen.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#4CAF89" />
          <Text style={{ marginTop: 10 }}>Cargando usuario...</Text>
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 30 }}>
              <View>
                <Text style={styles.title}>Actualiza el perfil del cuidador</Text>
                <Text style={styles.descrip}>
                  Aquí puedes actualizar la información personal del cuidador seleccionado.
                </Text>
              </View>
              
              {/* Campo Nombre */}
              <View style={[
                styles.inputContainer,
                nombreError ? styles.inputError : null
              ]}>
                <TextInput
                  placeholder="Nombre(s)"
                  style={styles.input}
                  value={nombre}
                  onChangeText={handleNombreChange}
                  maxLength={50}
                />
                <FontAwesome 
                  name="user" 
                  size={30} 
                  color={nombreError ? "red" : "gray"} 
                  style={styles.icon} 
                />
              </View>
              {nombreError && <Text style={styles.errorText}>{nombreError}</Text>}

              {/* Campo Teléfono */}
              <View style={[
                StylesGen.inputContainer,
                telefonoError ? styles.inputError : null
              ]}>
                <TextInput
                  placeholder="Teléfono (10 dígitos)"
                  style={StylesGen.input}
                  value={telefono}
                  onChangeText={handleTelefonoChange}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                <FontAwesome 
                  name="phone" 
                  size={25} 
                  color={telefonoError ? "red" : "gray"} 
                  style={StylesGen.icon} 
                />
              </View>
              {telefonoError && <Text style={styles.errorText}>{telefonoError}</Text>}

              {/* Botón de Guardar */}
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button, 
                    (nombreError || telefonoError) ? styles.buttonDisabled : null
                  ]}
                  onPress={handleRegister}
                  disabled={loading || Boolean(nombreError) || Boolean(telefonoError)}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Guardar cambios</Text>
                  )}
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
  container: {
    flex: 1,
    paddingHorizontal: 35,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#4CAF89",
  },
  descrip: {
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
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
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
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
});