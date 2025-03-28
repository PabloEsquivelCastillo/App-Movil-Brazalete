import React, { useState, useEffect } from "react";
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
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import brazalete from "../../assets/Images/brazalete.png";
import Background from "../../components/Background";
import theme from "../../themes/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import StylesGen from "../../themes/stylesGen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BrazaleteConfig({ route, navigation }) {
  const [isEnabled, setEnable] = useState(false);
  const [cont, setCont] = useState({
    nombre: '',
    topico: '',
    estado: 'false'
  });

  const { mode, brazalete, contact } = route.params || {};
  const toggleSwitch = () => setEnable((previousState) => !previousState);

  // Llenar formulario si estamos en modo edición
  useEffect(() => {
    if (mode === "edit") {
      const datosBrazalete = brazalete || contact;
      if (datosBrazalete) {
        setCont({
          nombre: datosBrazalete.nombre || '',
          topico: datosBrazalete.topico || '',
          estado: datosBrazalete.estado || 'false'
        });
      }
    }
  }, [mode, brazalete, contact]);

  const handleChange = (name, value) => {
    setCont(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = () => {
    if (!cont.nombre || !cont.topico) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }
    
    // Aquí iría la lógica para guardar/actualizar
    console.log("Datos a guardar:", cont);
    
    if (mode === "edit") {
      // Lógica para actualizar
      Alert.alert("Éxito", "Brazalete actualizado correctamente");
    } else {
      // Lógica para crear nuevo
      Alert.alert("Éxito", "Brazalete registrado correctamente");
    }
    
    navigation.goBack();
  };

  const title = mode === "edit" ? "Actualizar brazalete" : "Registrar brazalete";
  const desc = mode === "edit" 
    ? "Aquí podrás actualizar la información del brazalete." 
    : "Aquí podrás registrar un nuevo brazalete.";

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={StylesGen.title}>{title}</Text>
            <Text style={StylesGen.descrip}>{desc}</Text>
          </View>

          {mode === "edit" || isEnabled ? (
            <View style={styles.formu}>
              <View style={StylesGen.inputContainer}>
                <TextInput 
                  placeholder="Nombre"
                  value={cont.nombre}
                  onChangeText={(text) => handleChange('nombre', text)}
                  style={StylesGen.input}
                />
                <MaterialCommunityIcons
                  name="card-account-details"
                  size={30}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>
              
              <View style={StylesGen.inputContainer}>
                <TextInput 
                  placeholder="Topico"
                  value={cont.topico}
                  onChangeText={(text) => handleChange('topico', text)}
                  style={StylesGen.input}
                />
                <MaterialCommunityIcons
                  name="tag"
                  size={30}
                  color="gray"
                  style={StylesGen.icon}
                />
              </View>
              
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>
                    {mode === "edit" ? "Actualizar" : "Guardar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.warningText}>
              ¡Asegúrate de encender tu bluetooth!
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
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
    shadowColor: "#66CC99", // Color de la sombra
    shadowOffset: { width: 2, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 10, // Radio de difuminado
    elevation: 5, // Sombra en Android
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
