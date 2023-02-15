import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BurgerMenu from './BurgerMenu';
import Cart from './Cart';

const Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <BurgerMenu />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.leftSection}>
                <Cart qty={5} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingVertical: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Header;
