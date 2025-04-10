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
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function RegistarRecordatorio({ navigation }) {
    const { token, user } = useContext(AuthContext);
    const [openBrazalete, setOpenBrazalete] = useState(false);
    const [brazaleteValue, setBrazaleteValue] = useState(null);
    const [brazaletes, setBrazaletes] = useState([]);

    const [openMedicamento, setOpenMedicamento] = useState(false);
    const [medicamentoValue, setMedicamentoValue] = useState(null);
    const [medicamentos, setMedicamentos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [showFechaInicioPicker, setShowFechaInicioPicker] = useState(false);
    const [fechaFin, setFechaFin] = useState(new Date());
    const [showFechaFinPicker, setShowFechaFinPicker] = useState(false);

    const [nombrePaciente, setNombrePaciente] = useState('');
    const [periodicidad, setPeriodicidad] = useState('');
    const [isCronico, setIsCronico] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Nuevo estado para manejar el modo del picker en Android
    const [pickerMode, setPickerMode] = useState('date');

    useEffect(() => {
        if (token) {
            getBrazaletes();
            getMedicamentos();
        }
    }, [token]);

    const getBrazaletes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/brazalet/user/${user.payload.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBrazaletes(response.data.map(b => ({ label: b.nombre, value: b._id })));
        } catch (error) {
            console.error("Error obteniendo brazaletes:", error);
            setBrazaletes([]);
        }
    };

    const getMedicamentos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/medication`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedicamentos(response.data.map(m => ({ label: m.nombre, value: m._id })));
        } catch (error) {
            console.error("Error al cargar los medicamentos:", error);
            setMedicamentos([]);
        }
    };

    const handleSubmit = async () => {
        if (!brazaleteValue || !medicamentoValue || !periodicidad || !nombrePaciente) {
            Alert.alert("Error", "Por favor complete todos los campos");
            return;
        }

        const horas = parseInt(periodicidad) || 0;
        if (horas <= 0) {
            Alert.alert("Error", "La periodicidad debe ser mayor a 0");
            return;
        }

        try {
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

            await axios.post(`${API_BASE_URL}/api/reminder`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setBrazaleteValue(null);
            setMedicamentoValue(null);
            setNombrePaciente('');
            setPeriodicidad('');
            setIsCronico(false);

            Alert.alert("Éxito", "Recordatorio registrado", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);

        } catch (error) {
            console.error("Error completo:", error);
            Alert.alert("Error", error.response?.data?.message || "Ocurrió un error al registrar");
        }
    };

    // Función mejorada para manejar el cambio de fecha/hora
    const handleFechaInicioChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowFechaInicioPicker(false);
            if (pickerMode === 'date') {
                // Si estamos en modo fecha y el usuario seleccionó, pasamos a modo hora
                if (event.type === 'set') {
                    setFechaInicio(selectedDate);
                    setPickerMode('time');
                    setShowFechaInicioPicker(true);
                    return;
                }
            } else {
                // Si estamos en modo hora, reiniciamos el modo a fecha
                setPickerMode('date');
            }
        }

        if (event?.type === "set" && selectedDate) {
            const currentDate = selectedDate || fechaInicio;
            setFechaInicio(currentDate);
            if (fechaFin < currentDate) {
                setFechaFin(currentDate);
            }
        }
    };

    const handleFechaFinChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowFechaFinPicker(false);
            if (pickerMode === 'date') {
                if (event.type === 'set') {
                    setFechaFin(selectedDate);
                    setPickerMode('time');
                    setShowFechaFinPicker(true);
                    return;
                }
            } else {
                setPickerMode('date');
            }
        }

        if (event?.type === "set" && selectedDate) {
            const currentDate = selectedDate || fechaFin;
            if (currentDate >= fechaInicio) {
                setFechaFin(currentDate);
            } else {
                Alert.alert("Error", "La fecha fin no puede ser anterior a la fecha inicio");
            }
        }
    };

    // Función para mostrar el picker en Android
    const showPicker = (type) => {
        if (Platform.OS === 'android') {
            setPickerMode('date');
            if (type === 'inicio') {
                setShowFechaInicioPicker(true);
            } else {
                setShowFechaFinPicker(true);
            }
        } else {
            if (type === 'inicio') {
                setShowFechaInicioPicker(true);
            } else {
                setShowFechaFinPicker(true);
            }
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        setIsFormValid(!!(brazaleteValue && medicamentoValue && periodicidad && nombrePaciente));
    }, [brazaleteValue, medicamentoValue, periodicidad, nombrePaciente]);

    return (
        <>
            <Background />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <View style={styles.content}>
                        <Text style={[styles.title, { marginTop: 10 }]}>Recordatorio</Text>
                        <Text style={styles.text}>Este es el menú, aquí podrás crear recordatorios.</Text>

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

                        <View style={styles.groupInput}>
                            <TouchableOpacity
                                style={[styles.inputContainer, { width: '48%' }]}
                                onPress={() => showPicker('inicio')}
                            >
                                <Text style={styles.input}>{formatDate(fechaInicio)}</Text>
                            </TouchableOpacity>

                            {!isCronico && (
                                <TouchableOpacity
                                    style={[styles.inputContainer, { width: '48%' }]}
                                    onPress={() => showPicker('fin')}
                                >
                                    <Text style={styles.input}>{formatDate(fechaFin)}</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {(showFechaInicioPicker || showFechaFinPicker) && (
                            <DateTimePicker
                                value={showFechaInicioPicker ? fechaInicio : fechaFin}
                                mode={Platform.OS === 'android' ? pickerMode : 'datetime'}
                                display="default"
                                minimumDate={fechaInicio}
                                onChange={showFechaInicioPicker ? handleFechaInicioChange : handleFechaFinChange}
                            />
                        )}

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Periodicidad en horas (ej: 8)"
                                style={styles.input}
                                value={periodicidad}
                                onChangeText={(text) => setPeriodicidad(text.replace(/[^0-9]/g, ''))}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Crónico</Text>
                            <Switch
                                trackColor={{ false: "#ccc", true: theme.colors.secondary }}
                                thumbColor={isCronico ? theme.colors.primary : "#f4f3f4"}
                                value={isCronico}
                                onValueChange={(newValue) => {
                                    setIsCronico(newValue);
                                    if (newValue) setFechaFin(new Date(9999, 11, 31));
                                }}
                            />
                        </View>
                    </View>

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