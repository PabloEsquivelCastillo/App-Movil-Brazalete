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
  const conectado = isEnabled;
  const [cont, setCont] = useState({});
  const toggleSwitch = () => setEnable((previousState) => !previousState);
  // Si estamos en modo edición, llenamos el nombre del brazalete
  useEffect(() => {
    if (mode === "edit") {
      setCont(contact); // Llenamos el nombre del brazalete si estamos en edición
    }
  }, [mode, contact]);

  // Obtenemos el parámetro desde la navegación
  const { mode, contact } = route.params || {}; // 'mode' puede ser 'edit' o 'register'

  const title =
    mode === "edit" ? "Actualizar brazalete" : "Registrar brazalete";
  const desc =
    mode === "edit"
      ? "Aqui podrás actualizar la información del brazalete."
      : "Aqui podrás registrar un nuevo brazalete.";

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mode === "edit" ? (
            <View>
              <View>
                <Text style={StylesGen.title}>{title}</Text>
                <Text style={StylesGen.descrip}>{desc}</Text>
              </View>

              <View style={styles.formu}>
                <View style={StylesGen.inputContainer}>
                  <TextInput value={cont.name} style={StylesGen.input} />
                  <MaterialCommunityIcons
                    name="pill"
                    size={30}
                    color="gray"
                    style={StylesGen.icon}
                  />
                </View>
                <View style={StylesGen.inputContainer}>
                  <TextInput value={cont.topico} style={StylesGen.input} />
                  <MaterialCommunityIcons
                    name="pill"
                    size={30}
                    color="gray"
                    style={StylesGen.icon}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View>
                <Text style={StylesGen.title}>{title}</Text>
                <Text style={StylesGen.descrip}>{desc}</Text>
                <View style={styles.switchContainer}>
                  <Text style={styles.label}>Bluetooth</Text>
                  <Switch
                    trackColor={{ false: "#ccc", true: "#66CC99" }}
                    thumbColor={
                      isEnabled ? theme.colors.primary : theme.colors.primary
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              {conectado ? (
                <View>
                  <View style={styles.card}>
                    <Image source={brazalete} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>Brazalete Bluetooth</Text>
                      <TouchableOpacity
                        style={styles.connectButton}
                        onPress={() => navigation.navigate("Dispositivos")}
                      >
                        <Text style={styles.connectText}>Conectar</Text>
                        <Ionicons name="add" size={20} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.formu}>
                    <View style={StylesGen.inputContainer}>
                      <TextInput placeholder="Nombre" style={StylesGen.input} />
                      <MaterialCommunityIcons
                        name="pill"
                        size={30}
                        color="gray"
                        style={StylesGen.icon}
                      />
                    </View>
                    <View style={StylesGen.inputContainer}>
                      <TextInput placeholder="Topico" style={StylesGen.input} />
                      <MaterialCommunityIcons
                        name="pill"
                        size={30}
                        color="gray"
                        style={StylesGen.icon}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Guardar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <Text style={styles.warningText}>
                  ¡Asegúrate de encender tu bluetooth!
                </Text>
              )}
            </View>
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
