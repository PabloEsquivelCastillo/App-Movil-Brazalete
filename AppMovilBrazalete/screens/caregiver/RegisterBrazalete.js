import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Switch,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import brazalete from "../../assets/Images/brazalete.png";
import Background from "../../components/Background";
import theme from "../../themes/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import StylesGen from "../../themes/stylesGen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import BackgroundDos from "../../components/BackgroundDos";

export default function RegisterBrazalete({ route }) {
  const [isEnabled, setEnable] = useState(false);
  const conectado = isEnabled;
  const [cont, setCont] = useState({});
  const toggleSwitch = () => setEnable((previousState) => !previousState);
  const { token, user } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { mode, contact } = route.params || {};
  const [desactivar, setDesactivar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();
  const { scannedData } = route.params || {};
  const id = scannedData.substring(2);

  const showCustomAlert = (title, message) => {
    setAlertMessage({ title, message });
    setShowAlert(true);
  };

  const checkBraceletExists = async () => {
    try {
      const cleanId = id.replace(':', '');
      console.log("Verificando brazalete con ID:", cleanId);
      
      const response = await axios.get(
        `${API_BASE_URL}/brazalet/shareId/${cleanId}`
      );
      
      console.log("Respuesta completa del servidor:", response);
      console.log("Datos de la respuesta:", response.data);
      
      return response.data._id ? true : false;
    } catch (error) {
      console.log("Error al verificar brazalete:", error.response);
      if (error.response?.status === 404) {
        return false;
      }
      throw error;
    }
  };

  useEffect(() => {
    const verifyBracelet = async () => {
      try {
        const exists = await checkBraceletExists();
        if (exists) {
          showCustomAlert(
            "Brazalete ya registrado",
            "Este brazalete ya ha sido registrado anteriormente"
          );
        }
      } catch (error) {
        console.error("Error al verificar brazalete:", error);
      }
    };

    verifyBracelet();
  }, []);

  const handleRegister = async () => {
    if (!nombre) {
      showCustomAlert("Error", "Por favor ingresa un nombre para el brazalete");
      return;
    }
    
    if (nombre.length < 3) {
      showCustomAlert("Error", "El nombre debe tener al menos 3 letras");
      return;
    }

    setLoading(true);
    try {
      const braceletExists = await checkBraceletExists();
      console.log("¿El brazalete existe?:", braceletExists);
      if (braceletExists) {
        showCustomAlert("Error", "Esta pulsera ya ha sido registrada");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/brazalet`,
        {
          _id: parseInt(id),
          nombre: nombre,
          id_user: user.payload.id,
          edo: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNombre("");

      showCustomAlert(
        "Éxito", 
        "Brazalete registrado correctamente"
      );
      navigation.navigate("Brazalete Registro");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      showCustomAlert(
        "Error", 
        "Algo falló en el registro del brazalete"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundDos />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView>
          <View>
            <View>
              <Text style={StylesGen.title}>Termina tu registro</Text>
              <Text style={StylesGen.descrip}>
                Aquí podrás terminar de completar tu registro del brazalete.
              </Text>
            </View>
          </View>
          <View style={styles.formu}>
            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Nombre del brazalete"
                style={StylesGen.input}
                value={nombre}
                onChangeText={setNombre}
                maxLength={30}
              />
              <MaterialCommunityIcons
                name="watch"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity 
                style={[styles.button, (!nombre || nombre.length < 3) && styles.buttonDisabled]} 
                onPress={handleRegister}
                disabled={!nombre || nombre.length < 3 || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Alert Personalizado */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{alertMessage.title}</Text>
            <Text style={styles.modalText}>{alertMessage.message}</Text>
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={() => {
                setShowAlert(false);
                if (alertMessage.title === "Éxito") {
                  navigation.navigate("Brazalete Registro");
                }
              }}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  formu: {
    marginTop: 15,
    marginBottom: 15,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  connectText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    width: 190,
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  warningText: {
    fontSize: 24,
    color: "#377F5B",
    fontWeight: "bold",
    marginTop: "30%",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#66CC99",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginTop: "25",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    marginTop: 40,
    height: 200,
    resizeMode: "contain",
  },
  textContainer: {
    padding: 15,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    color: "#66CC99",
    marginBottom: 10,
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
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4CAF89',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    color: '#333'
  },
  modalButton: {
    width: 120,
    paddingVertical: 12,
    marginTop: 10
  }
});