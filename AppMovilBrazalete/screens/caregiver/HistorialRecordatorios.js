import React, { useContext, useEffect, useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  StyleSheet
} from 'react-native'
import Background from '../../components/Background'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'
import { API_BASE_URL } from "@env";
import axios from 'axios'
import StylesGen from '../../themes/stylesGen'
import theme from '../../themes/theme'

export default function HistorialRecordatorios() {
  const [recordatorio, setRecordatorio] = useState({})
  const route = useRoute();
  const { id } = route.params;
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getRecordatorio(id);
    }
  }, [token]);

  const getRecordatorio = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reminder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecordatorio(response.data)
    } catch (error) {
      console.error("Error al carga los datos:", error);
      Alert.alert("Error", "No se pudo cargar los datos");
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Background />
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Historial de Recordatorio</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Paciente</Text>
            {recordatorio.cronico &&
              <Text style={styles.chronicBadge}>Crónico</Text>
            }
          </View>
          <Text style={styles.patientName}>{recordatorio.nombre_paciente || 'N/A'}</Text>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Período</Text>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Inicio:</Text>
              <Text style={styles.dateValue}>{formatDate(recordatorio.inicio)}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Fin:</Text>
              <Text style={styles.dateValue}>{formatDate(recordatorio.fin)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusText,
              recordatorio.edo === "true" ? styles.statusPending : styles.statusCompleted
            ]}>
              {recordatorio.edo === "true" ? 'Pendiente' : 'Completado'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
  },
  patientName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  chronicBadge: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  dateRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  dateLabel: {
    width: 60,
    fontSize: 15,
    color: '#666',
  },
  dateValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  statusCompleted: {
    backgroundColor: theme.colors.secondary,
    color: '#2e7d32',
  },
  statusPending: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
});