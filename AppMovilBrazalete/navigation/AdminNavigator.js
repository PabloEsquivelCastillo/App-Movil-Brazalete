import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/*import RequestsScreen from "../screens/admin/RequestsScreen";
import MedicationsScreen from "../screens/admin/MedicationsScreen";
import CaregiversScreen from "../screens/admin/CaregiversScreen";
import RemindersScreen from "../screens/admin/RemindersScreen";
import LogoutScreen from "../screens/admin/LogoutScreen";*/
import { Feather } from "@expo/vector-icons";
import AdminHomeScreen from "../screens/AdminHomeScreen";

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen
            name="Inicio"
            component={AdminHomeScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="watch" size={24} color={color} /> }} />
        {/**        <Tab.Screen
            name="Solicitudes"
            component={RequestsScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} /> }}
        />
        <Tab.Screen
            name="Medicamentos"
            component={MedicationsScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} /> }}
        />
        <Tab.Screen
            name="Cuidadores"
            component={CaregiversScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} /> }}
        />
        <Tab.Screen
            name="Recordatorios"
            component={RemindersScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} /> }}
        />
        <Tab.Screen
            name="Salir"
            component={LogoutScreen}
            options={{ tabBarIcon: ({ color }) => <Feather name="log-out" size={24} color={color} /> }}
        /> */}
    </Tab.Navigator>
);

export default AdminNavigator;
