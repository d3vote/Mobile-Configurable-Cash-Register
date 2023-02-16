import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import BurgerMenu from './BurgerMenu';
import Cart from './Cart';

const HeaderSimple = ({ title, handleToggleMenu, isVisible}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <BurgerMenu menuShown={isVisible} handleToggleMenu={handleToggleMenu}/>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.leftSection}>
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
        marginLeft: -40,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default HeaderSimple;
