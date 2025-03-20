import react from "react";
import Background from "../../components/Background";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import StylesGen from "../../themes/stylesGen";

const contacts = [
  { name: "Salem Román", email: "2023tm096@utez.edu.mx" },
  { name: "Juan Pablo E.", email: "2023tm096@utez.edu.mx" },
  { name: "Alan Mondragón", email: "2023tml14@utez.edu.mx" },
  { name: "Daniel Aguilar", email: "2023tml15@utez.edu.mx" },
  { name: "Francisco Cereth", email: "2023tml23@utez.edu.mx" },
  { name: "Salem Román", email: "2023tm096@utez.edu.mx" },
  { name: "Juan Pablo E.", email: "2023tm096@utez.edu.mx" },
  { name: "Alan Mondragón", email: "2023tml14@utez.edu.mx" },
  { name: "Daniel Aguilar", email: "2023tml15@utez.edu.mx" },
  { name: "Francisco Cereth", email: "2023tml23@utez.edu.mx" },
];

export default function UsersScreen({ navigation }) {
  const handleAccept = (contact) => {
    console.log("Aceptar:", contact.name);
  };

  const handleReject = (contact) => {
    console.log("Rechazar:", contact.name);
  };
  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={StylesGen.title}>Cuidadores</Text>
          <Text style={StylesGen.descrip}>
            Aquí se muestran todos los{"\n"}cuidadores registrados
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Solicitudes")} style={{alignItems:'center'}}>
            <Ionicons name="person-add-outline" size={40} color="gray" />
            <Text style={styles.iconText}>Solicitudes</Text>
          </TouchableOpacity>
        </View>
      </View>
        <ScrollView
          style={StylesGen.scroll}
          showsVerticalScrollIndicator={true}
        >
          {contacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactEmail}>{contact.email}</Text>
              </View>
              <View style={styles.buttonContainer}>
                {/* Botón de Aceptar con ícono de palomita (check) */}
                <TouchableOpacity onPress={() => handleAccept(contact)} style={{marginRight:15}}>
                  <FontAwesome name="edit" size={30} color="black" />
                </TouchableOpacity>

                {/* Botón de Rechazar con ícono de equis (times) */}
                <TouchableOpacity onPress={() => handleReject(contact)}>
                  <Ionicons name="trash" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
    fontWeight: '500',
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
    marginBottom:20
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginTop:35,
    marginRight:1,
  },
  iconText: {
    fontSize: 16,
    color: "gray",
  },
});
