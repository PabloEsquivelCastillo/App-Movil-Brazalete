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

export default function HistoricoScreen() {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; //obtener el id de la pantalla anterior
  const [historic, setHistoric] = useState({});

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Cargamos  datos del medicamento renderizar
  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/reminder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistoric(response.data);
        console.log("DATOS: ", response.data);
      } catch (error) {
        console.error("Error al cargar el historico:", error);
        Alert.alert("Error", "No se pudo cargar el historico");
      }
    };

    if (id) {
      fetchHistorico();
    }
  }, [id, token]);

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.textContainer}>
          <Text style={StylesGen.title}>Historico</Text>
          <Text style={StylesGen.descrip}>
            Información sobre el recordatorio.
          </Text>
          <View style={styles.contactItem}>
          <View style={styles.contactInfo}>
            <Text style={styles.namePac}>
              Paciente: {historic.nombre_paciente}
            </Text>
            { historic.cronico && <Text style={{ color: "blue", fontSize:18 }}>Cronico</Text>
            }
            <View style={styles.estado}>
              <View style={styles.fechas}>
                <Text style={styles.contactEmail}>
                  Inicio: {formatDate(historic.inicio)}
                </Text>
                <Text style={styles.contactEmail}>
                  Fin:     {formatDate(historic.fin)}
                </Text>
              </View>
            </View>

            <View>
              <Text style={{fontSize:20}}>Desactivo la alarma despues de:</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:25, color: 'red', fontWeight:'bold', marginTop:10}}>{historic.timeout} segundos</Text>
            </View>
          </View>
        </View>
        </View>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginTop: 35,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF89",
    width: "100%",
    marginTop:50,
    alignItems:'center'
  },
  contactInfo: {
    flex: 1,
  },
  contactEmail:{
    fontSize: 20,
  },
  namePac: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF89", // Verde para destacar
  },
  fechas: {
    marginTop: 15,
    fontSize: 20,
  },
  estado: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom:10
  },
  estadoFinalizado: {
    color: "#4CAF89", // Verde
  },
  estadoPendiente: {
    color: "red", // Rojo
  },
  button: {
    backgroundColor: "#4CAF89",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
});
