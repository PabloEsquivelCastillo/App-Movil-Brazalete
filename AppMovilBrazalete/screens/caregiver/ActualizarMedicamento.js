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
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  const [loadingData, setLoadingData] = useState(true); // Nuevo estado para carga inicial
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; //Pasamos el id

  // Cargamos  datos del medicamento renderizar
  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/medication/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNombre(response.data.nombre); //Set al nombre y descripcion
        setDescripcion(response.data.description);
        
      } catch (error) {
        console.error("Error al cargar medicamento:", error);
        Alert.alert("Error", "No se pudo cargar el medicamento");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchMedicamento();
    }
  }, [id, token]);

  //Actualizar medicamento
  const handleRegister = async () => {
    if (!nombre || !descripcion) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/medication/${id}`,
        {
          nombre: nombre,
          description: descripcion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Éxito", "Medicamento registrado", [
        {
          text: "OK",
          onPress: () => navigation.goBack(), // Opción recomendada para flujo simple
        },
      ]);
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "Algo falló al actualizar el medicamento");
    } finally {
      setLoading(false);
    }
  };

  //Estado de deep
  if (loadingData) {
    return (
      <Background>
        <SafeAreaView
          style={[
            StylesGen.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView style={StylesGen.container}>
          <View style={{ marginBottom: 30 }}>
            <View>
              <Text style={StylesGen.title}>Actualizar medicamento</Text>
              <Text style={styles.descrip}>
                Aquí puedes actualizar los medicamentos.
              </Text>
            </View>
            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Nombre"
                style={StylesGen.input}
                value={nombre}
                onChangeText={setNombre}
              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={StylesGen.inputContainer}>

              <TextInput 
                placeholder="Descripción" 
                style={StylesGen.input} 
                value={descripcion} 
                onChangeText={setDescripcion} 

              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
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
});
