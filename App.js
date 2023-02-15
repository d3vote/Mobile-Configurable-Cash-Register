import { StatusBar } from 'expo-status-bar';
import {Appearance, SafeAreaView, useColorScheme} from 'react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TailwindProvider} from "tailwindcss-react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./screens/HomeScreen";

const StyledView = styled(View)
const StyledText = styled(Text)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
let StatusBarColor = "light";


export default function App() {
    let colorScheme = useColorScheme();

    if (colorScheme !== 'dark') {
        StatusBarColor = "light";
        console.log(colorScheme)
    } else {
        StatusBarColor = "dark"
        console.log(colorScheme)
    }

    return (
        <SafeAreaView>
            <StatusBar style={StatusBarColor}/>
            <HomeScreen />
        </SafeAreaView>
    );
}