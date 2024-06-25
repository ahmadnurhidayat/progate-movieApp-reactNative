import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import KeywordSearchScreen from './KeywordSearchScreen';
import CategorySearchScreen from './CategorySearchScreen';

const SearchScreen = () => {
    const [selectedBar, setSelectedBar] = useState('keyword');

    const renderComponent = () => {
        if (selectedBar === 'keyword') {
            return <KeywordSearchScreen />;
        } else {
            return <CategorySearchScreen />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                {['keyword', 'category'].map((item, index) => (
                    <TouchableOpacity
                        key={item}
                        activeOpacity={0.9}
                        style={{
                            ...styles.topBar,
                            backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
                            borderTopLeftRadius: index === 0 ? 100 : 0,
                            borderBottomLeftRadius: index === 0 ? 100 : 0,
                            borderTopRightRadius: index === 1 ? 100 : 0,
                            borderBottomRightRadius: index === 1 ? 100 : 0,
                            width: 150,
                        }}
                        onPress={() => setSelectedBar(item)}
                    >
                        <Text style={styles.topBarLabel}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={[{ key: 'dummy' }]}
                renderItem={renderComponent}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.scrollContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 16,
        backgroundColor: '#f0f0f0',
    },
    topBar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
    topBarLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        textTransform: 'capitalize',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
});

export default SearchScreen;

