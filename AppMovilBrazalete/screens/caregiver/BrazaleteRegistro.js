import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import brazalete from "../../assets/Images/brazalete.png";
import { Ionicons } from "react-native-vector-icons";
import Background from "../../components/Background";
import theme from "../../themes/theme";
import StylesGen from "../../themes/stylesGen";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

export default function BrazaleteRegistro({ navigation }) {
  const [brazaletes, setBrazaletes] = useState([]); //Estado para los brazaletes
  const { user, token } = useContext(AuthContext); //Obtenemos el token
  const [isEnabled, setEnable] = useState(false);

  const cuidadorId = user?.payload?.id;
  console.log("User ID:", cuidadorId);

  useEffect(() => {
    if (token) {
      getBrazaletes(cuidadorId);
    }
  }, [token])

  useFocusEffect(
    useCallback(() => {
      getBrazaletes(cuidadorId)
    }, [])
  );


  const getBrazaletes = async (id) => {
    try {
    const response = await axios.get(`${API_BASE_URL}/api/brazalet/user/${id}`, {
      headers : {
         Authorization: `Bearer ${token}`, 
      },
    });

    setBrazaletes(response.data)
    } catch (error) {
      console.error("Error al cargar los brazaletes:", error);
      setBrazaletes("No")
      
    }
  }



  const conectado = isEnabled;

  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 100; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos



  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View>
          <Text style={StylesGen.title}>Brazaletes</Text>
          <Text style={StylesGen.descrip}>
            Aquí podrás visualizar los brazaletes registrados.
          </Text>
          {brazalete.length === 0 ? ( // Verifica si no hay brazaleteos
            <View style={styles.nobrazaletesContainer}>
              <Text style={styles.nobrazaletesText}>
                No hay brazaletes registrados
              </Text>
            </View>
          ) : (
            <View style={{ overflow: "hidden", height: maxHeight, marginBottom: -20 }}>
              <ScrollView
                style={StylesGen.scroll}
                showsVerticalScrollIndicator={true}
              >
                {brazaletes.map((brazalete) => (
                  <View key={brazalete._id} style={styles.brazaleteItem}>
                    <View style={styles.brazaleteInfo}>
                      <View style={styles.edit}>
                        <Text style={styles.nameCui}>{brazalete.nombre}</Text>
                        {brazalete.estado === "false" ? (
                          ""
                        ) : (
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Brazalete Config", {
                                  mode: "edit", // Parámetro "edit"
                                  brazalete: brazalete, // Pasa el objeto completo, no solo el nombre
                                  contact: brazalete // Mantén esto para compatibilidad
                                })
                              }
                            >
                              <FontAwesome
                                name="edit"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                      <Text>Topico: {brazalete.topico}</Text>
                      <View style={styles.estado}>
                        <Text
                          style={[
                            styles.estado,
                            brazalete.estado === "Activo"
                              ? styles.estadoFinalizado
                              : styles.estadoPendiente,
                          ]}
                        >
                          Estado: {brazalete.estado}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Brazalete Config")}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  brazaleteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF89",
    width: "100%",
  },
  brazaleteInfo: {
    flex: 1,
  },
  nameCui: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 7,
  },
  estado: {
    alignItems: "flex-end",
    fontSize: 14,
    fontWeight: "bold",
  },
  estadoFinalizado: {
    color: "#4CAF89", // Verde
  },
  estadoPendiente: {
    color: "gray", // Rojo
  },
  edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
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
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  nobrazaletesContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100, // Altura del contenedor del mensaje
  },
  nobrazaletesText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});