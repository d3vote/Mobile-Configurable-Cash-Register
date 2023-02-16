import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BurgerMenu from './BurgerMenu';
import Cart from './Cart';

const Header = ({ title, qty }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <BurgerMenu />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.leftSection}>
                <Cart qty={qty} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
        marginLeft: -15,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Header;
