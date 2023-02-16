import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const Product = ({ product }) => {
    return (
        <View style={styles.product}>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.info}>
                <Text style={styles.title}>{product.productTitle}</Text>
                <Text style={styles.price}>{product.productPrice}</Text>
            </View>
        </View>
    );
};

const ProductList = ({ products }) => {
    return (
        <View style={styles.container}>
            {products.map((product, index) => {
                if (index % 2 === 0) {
                    // if it's an even index, create a new row
                    return (
                        <View key={product.id} style={styles.row}>
                            <Product product={product} />
                            {products[index + 1] && <Product product={products[index + 1]} />}
                        </View>
                    );
                }
                // ignore odd indices, they will be included in the next even row
                return null;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    product: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 50,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});
