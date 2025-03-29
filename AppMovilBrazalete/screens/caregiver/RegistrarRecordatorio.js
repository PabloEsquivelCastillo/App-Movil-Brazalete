import Background from "../../components/Background";
import { KeyboardAvoidingView, StyleSheet, Switch, TouchableOpacity, Text, TextInput, Platform, View, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import theme from "../../themes/theme";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RegistarRecordatorio({navigation}) {

    //Estado del dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);


    //Items para el dropdown
    const [items, setItems] = useState([
        { label: "Opción 1", value: "opcion1" },
        { label: "Opción 2", value: "opcion2" },
        { label: "Opción 3", value: "opcion3" },
    ]);

    //Estado para validar el nombre
    const [name, setName] = useState('');
    const [isValidName, setIsValidName] = useState(true);

    // Función para validar el nombre de usuario
    const validateName = (text) => {
        setName(text);
        // Validación: El nombre debe tener al menos 3 caracteres y solo letras y espacios
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        setIsValidName(nameRegex.test(text));
    };


    {/*switch */ }
    const [isEnabled, setEnable] = useState(false);
    const conectado = isEnabled;

    const toggleSwitch = () => setEnable(previousState => !previousState);

    return (
        <>
            <Background />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    {/* Contenido principal */}
                    <View style={styles.content}>


                        <Text style={[styles.title, { marginTop: 50 }]}>Recordatorio</Text>
                        <Text style={styles.text}>Este es el menú, aquí podrás crear recordatorios.</Text>

                        {/* Input para el nombre del usuario */}
                        <View style={[styles.inputContainer, !isValidName && styles.inputError]}>
                            <TextInput
                                placeholder="Nombre del brazalete"
                                style={styles.input}
                                value={name}
                                onChangeText={validateName}
                            />
                        </View>
                        {!isValidName && (
                            <Text style={styles.errorText}>
                                El nombre debe tener al menos 3 caracteres y solo letras y espacios.
                            </Text>
                        )}

                        {/* Dropdown para seleccionar medicamento */}
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Medicamento..."
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownMenu}
                            textStyle={styles.dropdownText}
                            placeholderStyle={styles.placeholderText}
                            selectedItemLabelStyle={styles.selectedItemText}
                        />

                        {/* Contenedor para inputs en fila */}
                        <View style={styles.groupInput}>
                            <View style={[styles.inputContainer, { width: '48%' }]}>
                                <TextInput
                                    placeholder="Fecha Inicio"
                                    style={styles.input} />
                            </View>
                            <View style={[styles.inputContainer, { width: '48%' }]}>
                                <TextInput
                                    placeholder="C/Cuándo"
                                    style={styles.input}
                                />
                            </View>
                        </View>


                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Periodicidad"
                                style={styles.input}
                            />
                        </View>

                        {/* Contenedor para inputs en fila */}
                        <View style={styles.groupInput}>
                            <View style={[styles.inputContainer, { width: '48%' }]}>
                                <TextInput
                                    placeholder="Dosis"
                                    style={styles.input} />
                            </View>
                            <View style={[styles.inputContainer, { width: '48%' }]}>
                                <TextInput
                                    placeholder="Vía de toma"
                                    style={styles.input}
                                />
                            </View>
                        </View>


                        {/*Swithc de crónico*/}
                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Crónico</Text>
                            <Switch
                                trackColor={{ false: "#ccc", true: "#66CC99" }}
                                thumbColor={isEnabled ? theme.colors.primary : theme.colors.primary}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                    </View>

                    {/* Botón para guardar (anclado al pie) */}
                    <TouchableOpacity
                        style={[styles.button, !isValidName && styles.buttonDisabled]}
                        disabled={!isValidName}
                        onPress={() => { alert("Recordatorio registrado") }}
                    >
                        <Text style={styles.buttonText}>Registrar recordatorio</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        width: "95%",
        alignSelf: "center",
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    content: {
        flex: 1, // Ocupa todo el espacio restante
        paddingBottom: 100
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#6DCE9D",
    },
    text: {
        fontSize: 16,
        color: "#666",
        marginBottom: 40,
    },
    // Input
    inputContainer: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        width: "100%", // Mismo ancho que el dropdown
    },
    inputError: {
        borderColor: "red", // Cambia el borde a rojo si hay un error
    },
    input: {
        fontSize: 16,
        color: "#333",
        height: 50,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    // Dropdown
    dropdown: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        width: "100%", // Mismo ancho que el input
        marginTop: 20
    },
    dropdownMenu: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        marginTop: 5,
    },
    dropdownText: {
        fontSize: 16,
        color: "#333",
    },
    placeholderText: {
        color: "#999",
    },
    selectedItemText: {
        fontWeight: "bold",
        color: "#66CC99",
    },
    //Grupo de inputs
    groupInput: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    //Switch
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderWidth: 0.9,
        borderRadius: 10,
        width: "100%",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "grey",
    },
    // Botón
    button: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        width: "100%", // Mismo ancho que el input y el dropdown
        alignItems: "center",
        shadowColor: "#000",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        bottom: 90, // Distancia desde el borde inferior
        position: "relative"
    },
    buttonDisabled: {
        backgroundColor: "#ccc", // Cambia el color del botón si está deshabilitado
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonBack: {
        paddingTop: 30,
        color: theme.colors.secondary
    },
});