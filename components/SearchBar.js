import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
    const [text, setText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    async function getCategoriesFromUrl(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const fetchedCategories = text.split('\n').map(category => category.trim()).filter(category => category !== '');
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    }

    const getProductsFromUrl = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setProducts(json);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        getCategoriesFromUrl('https://raw.githubusercontent.com/d3vote/ConfigFiles/main/categories.txt');
        getProductsFromUrl('https://raw.githubusercontent.com/d3vote/ConfigFiles/main/productsList.json');
    }, []);

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            const categoryMatch =
                selectedCategory ? product.category === selectedCategory : true;
            const textMatch = product.productTitle
                .toLowerCase()
                .includes(text.toLowerCase());
            return categoryMatch && textMatch;
        });

        // Sort the filtered products by category
        const sortedByCategory = filteredProducts.sort((a, b) =>
            b.category.localeCompare(a.category)
        );
        setSortedProducts(sortedByCategory);
    }, [selectedCategory, products, text]);

    const handleClear = () => {
        setText('');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory((prevSelectedCategory) => {
            if (prevSelectedCategory === category) {
                return '';
            }
            return category;
        });
    };

    const renderProducts = () => {
        const filteredProducts = products.filter((product) => {
            const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
            const textMatch = product.productTitle.toLowerCase().includes(text.toLowerCase());
            return categoryMatch && textMatch;
        });

        const rows = [];
        let cells = [];

        sortedProducts.forEach((product, index) => {
            cells.push(
                    <View key={index} style={styles.productContainer}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image style={styles.productImage} source={{ uri: product.productImageUrl }} />
                        </TouchableOpacity>
                        <View style={[styles.productDetails,{flex: 1}]}>
                            <Text style={styles.productTitle}>{product.productTitle}</Text>
                            <View style={[styles.productPriceContainer, {flex: 1}]}>
                                <View style={styles.productPriceContainer2}>
                                    <Text style={styles.productPrice}>{product.productPrice}</Text>
                                    <Text style={styles.productCurrency}>€</Text>
                                </View>
                                <View style={styles.productButtonWrapper}>
                                    <TouchableOpacity activeOpacity={0.7}>
                                        <Text style={styles.productButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
            );
            if (index % 2 === 1) {
                rows.push(
                    <View key={index} style={styles.productsRow}>
                        {cells}
                    </View>
                );
                cells = [];
            }
        });

        if (cells.length > 0) {
            rows.push(
                <View key={filteredProducts.length} style={styles.productsRow}>
                    {cells}
                </View>
            );
        }

        return rows;
    };


    return (
        <View>
            <View style={styles.container}>
                <Feather name="search" size={24} color="#ccc" />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="#ccc"
                    value={text}
                    onChangeText={setText}
                />
                {Boolean(text) && (
                    <TouchableOpacity onPress={handleClear} activeOpacity={0.5}>
                        <Feather name="x" size={24} color="#ccc" />
                    </TouchableOpacity>
                )}
            </View>
            {categories.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryButtonText,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <ScrollView style={{height: 600}}>
                {renderProducts()}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 12,
        elevation: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        marginLeft: 16,
        fontSize: 18,
        color: '#3C3C43',
    },
    categoriesContainer: {
        flexDirection: 'row',
        marginHorizontal: 0,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedCategoryButton: {
        backgroundColor: '#ccc',
    },
    categoryButtonText: {
        color: '#333',
    },
    selectedCategoryButtonText: {
        fontWeight: 'bold',
    },
    productListContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    productContainer: {
        flex: 1,
        borderRadius: 16,
        width: 180,
        maxWidth: 180,
        backgroundColor: 'white',
        overflow: 'visible',
        marginHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,

        elevation: 3,
    },
    productImage: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 150,
        width: '100%',
    },
    productDetails: {
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    productPriceContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyItems: 'flex-end'
    },
    productPriceContainer2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyItems: 'flex-end'
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    productCurrency: {
        marginLeft: 3,
        marginTop: 1.3,
        fontSize: 16,
        color: '#333',
    },
    productsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productButtonWrapper: {
        width: 34,
        backgroundColor: 'black',
        height: 34,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productButton: {
        color: '#fff',
        fontSize: 18,
        marginTop: -2,
    },
});

export default SearchBar;