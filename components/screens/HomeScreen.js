import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MovieList from '../movies/MovieList';

const movieLists = [
    {
        title: 'Now Playing in Theater',
        path: 'movie/now_playing?language=en-US&page=1',
        coverType: 'backdrop',
    },
    {
        title: 'Upcoming Movies',
        path: 'movie/upcoming?language=en-US&page=1',
        coverType: 'poster',
    },
    {
        title: 'Top Rated Movies',
        path: 'movie/top_rated?language=en-US&page=1',
        coverType: 'poster',
    },
    {
        title: 'Popular Movies',
        path: 'movie/popular?language=en-US&page=1',
        coverType: 'poster',
    },
];

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {movieLists.map((movieList) => (
                    <View key={movieList.title} style={styles.movieListContainer}>
                        <MovieList
                            title={movieList.title}
                            path={movieList.path}
                            coverType={movieList.coverType}
                        />
                    </View>
                ))}
            </ScrollView>
            <StatusBar translucent={false} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    movieListContainer: {
        marginBottom: 16,  // Ensure spacing between movie lists
        width: '100%',     // Ensure the MovieList components take the full width
    },
});

export default HomeScreen;
