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
  const [loadingData, setLoadingData] = useState(true); // Estado para carga inicial
  const [isValidNombre, setIsValidNombre] = useState(true);
  const [isValidTelefono, setIsValidTelefono] = useState(true);
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

  //Validaciones
  const handleRegister = async () => {
    if (!nombre || !telefono) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (!isValidNombre || !isValidTelefono) {
      Alert.alert("Error", "Asegúrate de que los campos sean válidos");
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
      Alert.alert("Éxito", "Usuario actualizado", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "Algo falló al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  //Validar nombre
  const handleNombreChange = (text) => {
    setNombre(text);
    if (text.trim().length > 0) {
      setIsValidNombre(true);
    } else {
      setIsValidNombre(false);
    }
  };

  //Validar teléfono
  const handleTelefonoChange = (text) => {
    setTelefono(text);
    const telefonoRegex = /^[0-9]{10}$/; // Formato de teléfono en México (10 dígitos)
    if (telefonoRegex.test(text)) {
      setIsValidTelefono(true);
    } else {
      setIsValidTelefono(false);
    }
  };

  //Estado de carga
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
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nombre(s)"
                  style={styles.input}
                  value={nombre}
                  onChangeText={handleNombreChange}
                />
                <FontAwesome name="user" size={30} color="gray" style={styles.icon} />
              </View>
              {!isValidNombre && (
                <Text style={styles.errorText}>El nombre es obligatorio.</Text>
              )}

              <View style={StylesGen.inputContainer}>
                <TextInput
                  placeholder="Teléfono"
                  style={StylesGen.input}
                  value={telefono}
                  onChangeText={handleTelefonoChange}
                  keyboardType="phone-pad"
                />
                <FontAwesome name="phone" size={25} color="gray" style={StylesGen.icon} />
              </View>
              {!isValidTelefono && (
                <Text style={styles.errorText}>Ingresa un teléfono válido de 10 dígitos.</Text>
              )}

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[styles.button, (!isValidNombre || !isValidTelefono) && styles.buttonDisabled]}
                  onPress={handleRegister}
                  disabled={loading || !isValidNombre || !isValidTelefono}
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
    marginBottom: 10,
    textAlign: "left", 
    alignSelf: "flex-start", 
  },
});
