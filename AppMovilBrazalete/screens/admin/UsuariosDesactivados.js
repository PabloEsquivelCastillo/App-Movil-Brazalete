import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Background from "../../components/Background";
import { SearchBar } from "react-native-elements";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";

export default function UsuariosDesactivados() {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [desactivados, setDesactivados] = useState([]);

  const itemHeight = 85; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 6; // Altura máxima para 5 elementos

  useEffect(() => {
    if (token) {
      getCuidadoresDesactivados();
    }
  }, []);

  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getCuidadoresDesactivados();
    }, [])
  );

  const getCuidadoresDesactivados = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/disabled`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setDesactivados(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      setDesactivados("No hay cuidadores");
    }
  };

  const handleActivar = async (id) => {
    try {
      // Verificar token
      if (!token) {
        Alert.alert("Error", "No hay token de autenticación");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/users/reactivate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getCuidadoresDesactivados(); // Recargar la lista
      Alert.alert("Éxito", "El cuidador ha sido activado correctamente");
    } catch (error) {
      Alert.alert("Error", "Error al activar el cuidador");
    }
  };

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.textContainer}>
          <Text style={StylesGen.title}>Cuidadores desactivados</Text>
          <Text style={StylesGen.descrip}>
            Aquí se muestran todos los cuidadores que fueron desactivados.
          </Text>
        </View>
        <View
          style={{
            overflow: "hidden",
            maxHeight: maxHeight,
            marginBottom: 10,
          }}
        >
          <ScrollView
            style={StylesGen.scroll}
            showsVerticalScrollIndicator={true}
          >
            {desactivados.length === 0 ? (
              <Text style={StylesGen.descrip}>
                No hay cuidadores desactivados.
              </Text>
            ) : (
              desactivados.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Text
                      style={{
                        color: "green",
                        fontWeight: "500",
                        marginLeft: 10,
                      }}
                      onPress={() => handleActivar(contact._id)}
                    >
                      Activar
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  descrip: {
    fontSize: 18,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4CAF89",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  contactEmail: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 8,
    borderRadius: 15,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginTop: 35,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 40,
    flexDirection: "row",
  },
  iconText: {
    fontSize: 16,
    color: "gray",
  },
});

