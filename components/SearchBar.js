import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearchBar = () => {
    const [text, setText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    async function getCategoriesFromUrl(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const fetchedCategories = text.split('\n').map(category => category.trim()).filter(category => category !== '');
            console.log(fetchedCategories)
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    }

    useEffect(() => {
        getCategoriesFromUrl('https://raw.githubusercontent.com/d3vote/ConfigFiles/main/categories.txt');
    }, []);

    const handleClear = () => {
        setText('');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
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
                    <TouchableOpacity
                        onPress={handleClear}
                        activeOpacity={0.5}
                    >
                        <Feather name="x" size={24} color="#ccc" />
                    </TouchableOpacity>
                )}
            </View>
            {categories.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton,
                            ]}
                        >
                            <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 8,
        marginHorizontal: 0,
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
        marginRight: 8,
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
});

export default SearchBar;