import Background from "../../components/Background";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Text,
    TextInput,
    Platform,
    View,
    Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native";
import { useState, useEffect, useContext } from "react";
import theme from "../../themes/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function RegistarRecordatorio({ navigation }) {
    const { token, user } = useContext(AuthContext); //Obtenemos el token
    const [openBrazalete, setOpenBrazalete] = useState(false);
    const [brazaleteValue, setBrazaleteValue] = useState(null);
    const [brazaletes, setBrazaletes] = useState([]);

    useEffect(() => {
        if (token) {
            console.log("id:", user.payload.id);
            getBrazaletes();
        }
    }, [])

    //Obtener brazaletes
    const getBrazaletes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/brazalet/user/${user.payload.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const brazaletesFormateados = response.data.map(brazalete => ({
                label: brazalete.nombre,
                value: brazalete._id
            }));
            setBrazaletes(brazaletesFormateados);

        } catch (error) {
            console.error("Error obteniendo cuidadores:", error);
            setBrazaletes([]);
        }
    };


    //Estado de medicamentos
    const [openMedicamento, setOpenMedicamento] = useState(false);
    const [medicamentoValue, setMedicamentoValue] = useState(null);

    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        if (token) {
            getMedicamentos()
        }
    }, [])
    //Obtener medicamentos
    const getMedicamentos = async () => {
        try {

            const response = await axios.get(`${API_BASE_URL}/api/medication`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            const medicamentoFormato = response.data.map(medicamento => ({
                label: medicamento.nombre,
                value: medicamento._id
            }))
            setMedicamentos(medicamentoFormato)

        } catch (error) {
            console.error("Error al cargar los medicamentos:", error);
            setMedicamentos([])

        }
    }


    //Envio del registro
    const handleSubmit = async () => {

        if (!brazaleteValue || !medicamentoValue || !periodicidad || !nombrePaciente) {
            Alert.alert("Error", "Por favor complete todos los campos");
            return;
        }

        // Asegurar que periodicidad sea número válido > 0
        const horas = parseInt(periodicidad) || 0;
        if (horas <= 0) {
            Alert.alert("Error", "La periodicidad debe ser mayor a 0");
            return;
        }

        try {
            // Preparar datos exactamente como los espera el backend
            const datos = {
                inicio: fechaInicio.toISOString(),
                fin: isCronico ? "" : fechaFin.toISOString(),
                time: horas,
                nombre_paciente: nombrePaciente.trim(),
                cronico: isCronico,
                id_medicamento: medicamentoValue,
                id_usuario: user.payload.id,
                id_pulsera: brazaleteValue
            };

            console.log("Enviando datos:", datos);

            const response = await axios.post(
                `${API_BASE_URL}/api/reminder`,
                datos,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Reset exitoso
            setBrazaleteValue(null);
            setMedicamentoValue(null);
            setNombrePaciente('');
            setPeriodicidad('');
            setIsCronico(false);

            Alert.alert("Éxito", "Medicamento registrado", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(), // Opción recomendada para flujo simple
                },
            ]);

        } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", mensaje);
        }
    };









    // Estados para las fechas
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [showFechaInicioPicker, setShowFechaInicioPicker] = useState(false);

    const [fechaFin, setFechaFin] = useState(new Date());
    const [showFechaFinPicker, setShowFechaFinPicker] = useState(false);

    const [nombrePaciente, setNombrePaciente] = useState('');
    const [periodicidad, setPeriodicidad] = useState('');
    const [isCronico, setIsCronico] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Validar formulario
    useEffect(() => {
        const valid = brazaleteValue && medicamentoValue && periodicidad && nombrePaciente;
        setIsFormValid(!!valid);
    }, [brazaleteValue, medicamentoValue, periodicidad]);

    // Manejar cambio de fecha inicio
    const onChangeFechaInicio = (event, selectedDate) => {
        setShowFechaInicioPicker(false);
        if (selectedDate) {
            setFechaInicio(selectedDate);
            // Si la fecha fin es anterior a la nueva fecha inicio, actualizarla
            if (fechaFin < selectedDate) {
                setFechaFin(selectedDate);
            }
        }
    };

    // Manejar cambio de fecha fin
    const onChangeFechaFin = (event, selectedDate) => {
        setShowFechaFinPicker(false);
        if (selectedDate && selectedDate >= fechaInicio) {
            setFechaFin(selectedDate);
        } else {
            Alert.alert("Error", "La fecha fin no puede ser anterior a la fecha inicio");
        }
    };

    // Formatear fecha para mostrar
    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
                    hour: '2-digit',
        minute: '2-digit',
        });
    };


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
                        <Text style={[styles.title, { marginTop: 10 }]}>Recordatorio</Text>
                        <Text style={styles.text}>Este es el menú, aquí podrás crear recordatorios.</Text>

                        {/* Dropdown para brazaletes */}
                        <DropDownPicker
                            open={openBrazalete}
                            value={brazaleteValue}
                            items={brazaletes}
                            setOpen={setOpenBrazalete}
                            setValue={setBrazaleteValue}
                            setItems={setBrazaletes}
                            placeholder="Seleccione un brazalete"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownMenu}
                            textStyle={styles.dropdownText}
                            placeholderStyle={styles.placeholderText}
                            zIndex={3000}
                            zIndexInverse={1000}
                            listEmptyLabel="No hay brazaletes disponibles"
                        />


                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Nombre del paciente"
                                style={styles.input}
                                value={nombrePaciente}
                                onChangeText={setNombrePaciente}
                            />
                        </View>

                        {/* Dropdown para medicamentos */}
                        <DropDownPicker
                            open={openMedicamento}
                            value={medicamentoValue}
                            items={medicamentos}
                            setOpen={setOpenMedicamento}
                            setValue={setMedicamentoValue}
                            setItems={setMedicamentos}
                            placeholder="Seleccione un medicamento"
                            style={[styles.dropdown, { marginTop: 20 }]}
                            dropDownContainerStyle={styles.dropdownMenu}
                            textStyle={styles.dropdownText}
                            placeholderStyle={styles.placeholderText}
                            zIndex={2000}
                            zIndexInverse={2000}
                            
                        />

                        {/* Contenedor para inputs de fecha */}
                        <View style={styles.groupInput}>
                            {/* Input para fecha inicio */}
                            <TouchableOpacity
                                style={[styles.inputContainer, { width: '48%' }]}
                                onPress={() => setShowFechaInicioPicker(true)}
                            >
                                <Text style={styles.input}>
                                    {formatDate(fechaInicio)}
                                </Text>
                                {showFechaInicioPicker && (
                                    <DateTimePicker
                                        value={fechaInicio}
                                        mode="datetime"
                                        display="default"
                                        minimumDate={new Date()}
                                        onChange={onChangeFechaInicio}
                                    />
                                )}
                            </TouchableOpacity>

                            {/* Input para fecha fin (solo si no es crónico) */}
                            {!isCronico && (
                                <TouchableOpacity
                                    style={[styles.inputContainer, { width: '48%' }]}
                                    onPress={() => setShowFechaFinPicker(true)}
                                >
                                    <Text style={styles.input}>
                                        {formatDate(fechaFin)}
                                    </Text>
                                    {showFechaFinPicker && (
                                        <DateTimePicker
                                            value={fechaFin}
                                            mode="datetime"
                                            display="default"
                                            minimumDate={fechaInicio}
                                            onChange={onChangeFechaFin}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Periodicidad en horas (ej: 8)"
                                style={styles.input}
                                value={periodicidad}
                                onChangeText={(text) => {
                                    // Filtra solo números y convierte a entero
                                    const numericValue = text.replace(/[^0-9]/g, '');
                                    setPeriodicidad(numericValue);
                                }}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Switch para crónico - Versión mejorada */}
                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Crónico</Text>
                            <Switch
                                trackColor={{ false: "#ccc", true: theme.colors.secondary }}
                                thumbColor={isCronico ? theme.colors.primary : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(newValue) => {
                                    setIsCronico(newValue);
                                    // Si se activa crónico, establece fecha fin muy futura
                                    if (newValue) {
                                        setFechaFin(new Date(9999, 11, 31));
                                    }
                                }}
                                value={isCronico}
                            />
                        </View>
                    </View>

                    {/* Botón para guardar */}
                    <TouchableOpacity
                        style={[styles.button, !isFormValid && styles.buttonDisabled]}
                        disabled={!isFormValid}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Registrar recordatorio</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

// Tus estilos permanecen igual
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        alignSelf: "center",
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    content: {
        flex: 1,
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
    inputContainer: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        width: "100%",
        justifyContent: 'center',
        height: 50,
    },
    input: {
        fontSize: 16,
        color: "#333",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        width: "100%",
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
    groupInput: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
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
        height: 50,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "grey",
    },
    button: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        bottom: 10,
        position: "relative"
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});