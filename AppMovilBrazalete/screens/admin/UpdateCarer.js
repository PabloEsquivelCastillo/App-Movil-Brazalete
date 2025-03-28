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
  Platform, Alert, ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "@env";
import axios from "axios";

export default function UpdateProfileScreen() {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Nuevo estado para carga inicial
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; //Pasamos el id

  //Cargamos datos del usuario a actualizar
  useEffect(() => {
    const fetchCuidador = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNombre(response.data.name); //Set al nombre y descripcion
        setTelefono(response.data.phone);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        Alert.alert("Error", "No se pudo cargar el usuario");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchCuidador();
    }
  }, [id, token]);

  //Actualizar usuario
  const handleRegister = async () => {
    if (!nombre || !telefono) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/${id}`,
        {
          name: nombre,
          phone: telefono,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Éxito", "Medicamento actualizado", [
        { text: "OK", onPress: () => navigation.goBack() },
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
          <Text style={{ marginTop: 10 }}>Cargando cuidador...</Text>
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
                <Text style={styles.title}>
                  Actualiza el perfil del cuidador
                </Text>
                <Text style={styles.descrip}>
                  Aqui puedes actualizar la informacion personal del cuidador
                  seleccionado.
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nombre(s)"
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
                />
                <FontAwesome
                  name="user"
                  size={30}
                  color="gray"
                  style={styles.icon}
                />
              </View>
              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Teléfono"
                  style={StylesGen.input}
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                />
                <FontAwesome
                  name="phone"
                  size={25}
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
    paddingHorizontal: 35,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    flex: 1,
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
  createAccount: {
    marginTop: 20,
    color: "#666",
  },
  createLink: {
    color: "#4CAF89",
    fontWeight: "bold",
    marginTop: 25,
    textDecorationLine: "underline",
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
