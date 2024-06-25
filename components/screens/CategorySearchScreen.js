// CategorySearch.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

const CategorySearchScreen = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
            },
        };

        fetch(url, options)
            .then(async (response) => await response.json())
            .then((response) => {
                setCategories(response.genres);
            })
            .catch((errorResponse) => {
                console.log('errorResponse : ', errorResponse);
            });
    };

    const handleSearch = () => {
        if (selectedCategory !== null) {
            navigation.navigate('Movies By Category', { categoryId: selectedCategory });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.id && styles.selectedCategory,
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    categoryButton: {
        width: '40%',
        padding: 8,
        margin: 5,
        backgroundColor: '#C0B4D5',
        borderRadius: 10,
        alignItems: 'center',
    },
    selectedCategory: {
        backgroundColor: '#8978A4',
    },
    categoryText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    searchButton: {
        width: '60%',
        padding: 15,
        backgroundColor: '#8978A4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategorySearchScreen;
