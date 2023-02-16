import React, { useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handleToggle = () => {
        setIsOpen(!isOpen);
        Animated.timing(animation, {
            toValue: isOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const topLineTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
    });

    const topLineRotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

    const middleLineOpacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1],
    });

    const middleLineWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [35, 0],
    });

    const bottomLineTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -7],
    });

    const bottomLineRotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-45deg'],
    });

    return (
        <TouchableOpacity onPress={handleToggle} style={styles.container}>
            <Animated.View style={[styles.line, { transform: [{ translateY: topLineTranslate }, { rotate: topLineRotate }] }]} />
            <Animated.View style={[styles.line, { opacity: middleLineOpacity, width: middleLineWidth }]} />
            <Animated.View style={[styles.line, { transform: [{ translateY: bottomLineTranslate }, { rotate: bottomLineRotate }] }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'left',
    },
    line: {
        width: 36,
        height: 3,
        backgroundColor: 'black',
        marginVertical: 3,
        borderRadius: 2,
    },
});

export default BurgerMenu;
