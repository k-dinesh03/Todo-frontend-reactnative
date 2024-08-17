import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientProvider, { ClientContext } from '@/context/ClientContext';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from '@/app/(auth)';
import SignUp from '@/app/(auth)/signup';
import { Platform, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import HomeScreen from '@/app/(tabs)';
import Profile from '@/app/(tabs)/profile';
import GlobalProvider from '@/context/GlobalProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SignIn'>
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
);

const Main: React.FC = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                height: 55,
                width: '100%',
                backgroundColor: '#000',
            },
            tabBarLabel: ({ focused }) => {
                return (
                    <Text style={{
                        color: focused ? '#fff' : '#a8a8a8',
                    }}>
                        {route.name}
                    </Text>
                );
            },
            tabBarIcon: ({ focused }) => {
                if (route.name === 'Home') {
                    return (
                        <AntDesign name="home" size={24} color={focused ? '#ffffff' : '#a8a8a8'} />
                    );
                } else if (route.name === 'Profile') {
                    return (
                        <Feather name="user" size={24} color={focused ? '#ffffff' : '#a8a8a8'} />
                    );
                }
            }
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);

const Render = () => {
    const { token } = React.useContext(ClientContext);
    return token ? <Main /> : <Auth />;
};

const AppNavigation = () => {
    return (
        <ClientProvider>
            <GlobalProvider>
                <Render />
            </GlobalProvider>
        </ClientProvider>
    );
};

export default AppNavigation;
