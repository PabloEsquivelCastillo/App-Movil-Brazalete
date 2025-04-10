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
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "@env";
import axios from "axios";

export default function ActualizarMedicamento() {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [nombreError, setNombreError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  // Función para limpiar entrada
  const cleanInput = (input) => {
    return input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  };

  // Función para validar espacios en blanco
  const isWhitespaceOnly = (str) => {
    return !str || !str.trim();
  };

  // Cargamos datos del medicamento
  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/medication/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNombre(response.data.nombre);
        setDescripcion(response.data.description);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el medicamento");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchMedicamento();
    }
  }, [id, token]);

  // Actualizar medicamento
  const handleRegister = async () => {
    // Limpiar errores previos
    setNombreError("");
    setDescripcionError("");
    
    // Limpiar los campos
    const nombreLimpio = cleanInput(nombre);
    const descripcionLimpia = cleanInput(descripcion);

    let isValid = true;

    // Validación para nombre
    if (isWhitespaceOnly(nombreLimpio)) {
      setNombreError("El nombre no puede estar vacío");
      isValid = false;
    }

    // Validación para descripción
    if (isWhitespaceOnly(descripcionLimpia)) {
      setDescripcionError("La descripción no puede estar vacía");
      isValid = false;
    } else if (descripcionLimpia.trim().length < 5) {
      setDescripcionError("La descripción debe tener al menos 5 caracteres");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/medication/${id}`, 
        {
          nombre: nombreLimpio.trim(),
          description: descripcionLimpia.trim()
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      Alert.alert(
        "Éxito", 
        "Medicamento actualizado",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Error", "Algo falló al actualizar el medicamento");
    } finally {
      setLoading(false);
    }
  };

  // Estado de carga
  if (loadingData) {
    return (
      <Background>
        <SafeAreaView style={[StylesGen.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#4CAF89" />
          <Text style={{ marginTop: 10 }}>Cargando medicamento...</Text>
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={StylesGen.container}
      >
        <SafeAreaView style={StylesGen.container}>
          <View style={{ marginBottom: 30 }}>
            <View>
              <Text style={StylesGen.title}>Actualizar medicamento</Text>
              <Text style={styles.descrip}>Aquí puedes actualizar los medicamentos.</Text>
            </View>
            
            <View style={StylesGen.inputContainer}>
              <TextInput 
                placeholder="Nombre" 
                style={[
                  StylesGen.input,
                  nombreError ? styles.inputError : null
                ]} 
                value={nombre} 
                onChangeText={(text) => {
                  const cleaned = cleanInput(text);
                  setNombre(cleaned);
                  if (nombreError) setNombreError("");
                }} 
              />
              <MaterialCommunityIcons 
                name="pill" 
                size={30} 
                color={nombreError ? "red" : "gray"} 
                style={StylesGen.icon} 
              />
            </View>
            {nombreError && <Text style={styles.errorText}>{nombreError}</Text>}

            <View style={StylesGen.inputContainer}>
              <TextInput 
                placeholder="Descripción" 
                style={[
                  StylesGen.input,
                  descripcionError ? styles.inputError : null
                ]} 
                value={descripcion} 
                onChangeText={(text) => {
                  const cleaned = cleanInput(text);
                  setDescripcion(cleaned);
                  if (descripcionError) setDescripcionError("");
                }} 
                multiline
              />
              <MaterialCommunityIcons 
                name="pill" 
                size={30} 
                color={descripcionError ? "red" : "gray"} 
                style={StylesGen.icon} 
              />
            </View>
            {descripcionError && <Text style={styles.errorText}>{descripcionError}</Text>}

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  loading ? styles.buttonDisabled : null
                ]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Guardar cambios</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  descrip: {
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
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});