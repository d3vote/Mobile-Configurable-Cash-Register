import {View, Text, Dimensions, Animated, StyleSheet, SafeAreaView} from "react-native";
import React, { useState, useRef } from "react";
import { Feather } from '@expo/vector-icons';
import HeaderSimple from "../components/HeaderSimple";
import SearchBar from "../components/SearchBar";
import {StatusBar} from "expo-status-bar";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SettingsScreen = ({navigation}) => {
    const [isVisible, setIsVisible] = useState(false);
    const slideIn = useRef(new Animated.Value(0)).current;

    const handleToggleMenu = () => {
        setIsVisible(!isVisible);
        Animated.timing(slideIn, {
            toValue: isVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleToggleMenuSwitch = (screenName) => {
        setIsVisible(!isVisible);
        Animated.timing(slideIn, {
            toValue: isVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        navigation.replace(screenName)
    };

    return (
        <SafeAreaView style={{backgroundColor: "white"}}>
            <StatusBar style="dark"/>
            <View style={{ marginLeft: 0, marginTop: 8 }}>
                <Animated.View
                    style={[
                        styles.menu,
                        {
                            transform: [
                                {
                                    translateX: slideIn.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, screenWidth],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.closeMenu}>
                        <Feather name="x" size={44} color="black" onPress={handleToggleMenu}/>
                    </View>
                    <Text style={styles.menuTitle} onPress={() => handleToggleMenuSwitch("Food")}>Essen</Text>
                    <Text style={styles.menuTitle} onPress={() => handleToggleMenuSwitch("Orders")}>Bestellungen</Text>
                    <Text style={styles.menuTitle} onPress={() => handleToggleMenuSwitch("Settings")}>Einstellungen</Text>
                    <Text style={styles.menuTitle} onPress={() => handleToggleMenuSwitch("Cart")}>Cart</Text>
                </Animated.View>
                <HeaderSimple title={'Einstellungen'} handleToggleMenu={handleToggleMenu} isVisible={isVisible}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        left: -(screenWidth),
        top: 0,
        zIndex: 999,
        backgroundColor: "white",
        width: screenWidth,
        height: screenHeight,
    },
    closeMenu: {
        position: "absolute",
        zIndex: 5,
        right: 15,
        height: 44,
        width: 44,
        top: 0,
        fontSize: 22,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 6,
        marginLeft: 15
    }
})

export default SettingsScreen;