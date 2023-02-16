import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, useColorScheme, Animated, StyleSheet } from 'react-native';
import React, {useEffect} from 'react';
import HomeScreen from "./screens/HomeScreen";

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

    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }
        ).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <SafeAreaView>
                <StatusBar style={[StatusBarColor]}/>
                <HomeScreen />
            </SafeAreaView>
        </Animated.View>
    );
}