import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Modal, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import BackgroundDos from "../components/BackgroundDos";
import theme from "../themes/theme";
import StylesGen from "../themes/stylesGen";

export default function LoginScreen({ navigation }) {
  const { login, user, authStatus } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  React.useEffect(() => {
    if (user) {
      navigation.replace(user.payload.role === "admin" ? "AdminStack" : "CaregiverStack");
    }

    // Mostrar mensajes según el estado de la solicitud
    if (authStatus === 'pending') {
      showCustomAlert('Su solicitud está en espera de aprobación');
    } else if (authStatus === 'rejected') {
      showCustomAlert('Su solicitud ha sido rechazada');
    }
  }, [user, authStatus]);

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const validateEmail = (text) => {
    setEmail(text);
    const trimmedText = text.trim(); 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(trimmedText);
    setIsValidEmail(isValid);
    if (!isValid) setLoginError('Correo electrónico inválido');
    else setLoginError('');
  };

  const handleLogin = async () => {

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEmail) {
      showCustomAlert('Por favor ingresa tu email');
      return;
    }
    
    if (!trimmedPassword) {
      showCustomAlert('Por favor ingresa tu contraseña');
      return;
    }

    setLoading(true);
    setLoginError('');
    try {
      await login(trimmedEmail, trimmedPassword);
      // Verificar nuevamente el estado después del login
      if (authStatus === 'pending') {
        showCustomAlert('Su solicitud está en espera de aprobación');
        return;
      } else if (authStatus === 'rejected') {
        showCustomAlert('Su solicitud ha sido rechazada');
        return;
      }
    } catch (error) {
      showCustomAlert('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && isValidEmail && password;

  return (
    <>
      <BackgroundDos />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={StylesGen.container2}
      >
        <View style={StylesGen.container2}>
          <Text style={StylesGen.title}>Inicia Sesión</Text>

          {/* Input de Correo */}
          <View style={[StylesGen.inputContainer, !isValidEmail && email && StylesGen.inputContainer2]}>
            <TextInput
              placeholder="Correo electrónico"
              style={StylesGen.input}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FontAwesome name="envelope" size={25} color="gray" style={StylesGen.icon} />
          </View>
          {!isValidEmail && email && <Text style={styles.errorText}>Correo electrónico inválido</Text>}

          {/* Input de Contraseña */}
          <View style={StylesGen.inputContainer}>
            <TextInput
              placeholder="Contraseña"
              style={StylesGen.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <FontAwesome name="lock" size={30} color="gray" style={StylesGen.icon} />
          </View>

          {/* Olvidaste tu contraseña */}
          <TouchableOpacity onPress={() => navigation.navigate("Recuperar")}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            {/* Link para crear cuenta */}
            <Text style={styles.createAccount}>
              ¿No tienes cuenta? <Text style={styles.createLink} onPress={() => navigation.navigate("Registro")}>Crear ahora</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Modal para alertas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={() => setShowAlert(false)}
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
  errorText: {
    color: theme.colors.errorBorder,
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  forgotPassword: {
    color: theme.colors.secondary,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 100
  },
  button: {
    backgroundColor: theme.colors.secondary,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 20,
    color: "#666",
    alignItems: 'center'
  },
  createLink: {
    color: theme.colors.secondary,
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
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18
  },
  modalButton: {
    width: 120,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10
  }
});