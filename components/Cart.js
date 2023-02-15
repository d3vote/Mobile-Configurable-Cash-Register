import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Cart = ({ qty }) => {
    return (
        <View style={styles.container}>
            <Feather name="shopping-cart" size={24} color="black" />
            {qty > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{qty}</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 30,
        backgroundColor: 'black',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Cart;
