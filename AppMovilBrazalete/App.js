import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
        <GestureHandlerRootView style={ {flex : 1}}>
          <AuthProvider>
            <AppNavigator/>
          </AuthProvider>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

});
