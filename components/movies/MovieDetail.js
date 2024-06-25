import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MovieList from './MovieList';

const MovieDetail = ({ route }) => {
    const { id } = route.params;

    const [moviesDetail, setMovieDetail] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getMovieList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            checkIfFavorite();
        }, [id])
    );

    const getMovieList = () => {
        const url = `https://api.themoviedb.org/3/movie/${id}`;

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
                setMovieDetail(response);
                // console.log("moviesDetail : ", response);
            })
            .catch((errorResponse) => {
                console.log("errorResponse : ", errorResponse);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const checkIfFavorite = async () => {
        try {
            const initialData = await AsyncStorage.getItem('@FavoriteList');
            if (initialData) {
                const favMovieList = JSON.parse(initialData);
                const isFav = favMovieList.some((movie) => movie.id === id);
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addFavorite = async (movie) => {
        try {
            if (!movie.id) {
                throw 'Movie data is deprecated';
            }
            const initialData = await AsyncStorage.getItem('@FavoriteList');

            let favMovieList = [];

            if (initialData !== null) {
                favMovieList = [...JSON.parse(initialData), movie];
            } else {
                favMovieList = [movie];
            }

            await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
            setIsFavorite(true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeFavorite = async (id) => {
        try {
            const initialData = await AsyncStorage.getItem('@FavoriteList');
            if (initialData) {
                let favMovieList = JSON.parse(initialData);
                favMovieList = favMovieList.filter((movie) => movie.id !== id);
                await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
                setIsFavorite(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {moviesDetail && (
                    <>
                        <ImageBackground
                            source={{ uri: `https://image.tmdb.org/t/p/w500/${moviesDetail.poster_path}` }}
                            style={styles.backgroundImage}
                        >
                            <Text style={styles.titleText}>{moviesDetail.title}</Text>

                            <View style={styles.insideImageContainer}>
                                <View style={styles.ratingContainer}>
                                    <FontAwesome name="star" size={16} color="yellow" />
                                    <Text style={styles.textRating}>{moviesDetail.vote_average ? moviesDetail.vote_average.toFixed(1) : ''}</Text>
                                </View>
                                <View style={styles.favoriteContainer}>
                                    <FontAwesome
                                        name={isFavorite ? "heart" : "heart-o"}
                                        size={25}
                                        color={'pink'}
                                        onPress={() => isFavorite ? removeFavorite(moviesDetail.id) : addFavorite(moviesDetail)}
                                    />
                                </View>
                            </View>

                        </ImageBackground>
                        <Text style={styles.summaryText}>Overview: {moviesDetail.overview}</Text>
                        <View style={styles.detailMovieContainer}>
                            <View style={styles.sideContainer}>
                                <Text style={styles.label}>
                                    Original Language
                                </Text>
                                <Text style={styles.detail}>
                                    {moviesDetail.original_language}
                                </Text>
                            </View>
                            <View style={styles.sideContainer}>
                                <Text style={styles.label}>
                                    Popularity
                                </Text>
                                <Text style={styles.detail}>
                                    {moviesDetail.popularity}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.detailMovieContainer}>
                            <View style={styles.sideContainer}>
                                <Text style={styles.label}>
                                    Release Date
                                </Text>
                                <Text style={styles.detail}>
                                    {formatDate(moviesDetail.release_date)}
                                </Text>
                            </View>
                            <View style={styles.sideContainer}>
                                <Text style={styles.label}>
                                    Vote Count
                                </Text>
                                <Text style={styles.detail}>
                                    {moviesDetail.vote_count}
                                </Text>
                            </View>
                        </View>
                        <MovieList
                            title={'Recommendation'}
                            path={`movie/${id}/similar`}
                            coverType={'poster'}
                            key={'Recommendation'}
                        />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    scrollContainer: {
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        paddingBottom: 10
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginLeft: 20
    },
    insideImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteContainer: {
        marginLeft: 'auto',
        marginRight: 20
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    iconRating: {
        width: 20,
        height: 20,
    },
    textRating: {
        color: 'yellow',
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 5
    },
    summaryText: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'justify'
    },
    detailMovieContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        paddingLeft: 20,
        marginBottom: 10
    },
    sideContainer: {
        width: '40%',
        height: 'auto',
        textAlign: 'left',
    },
    label: {
        fontSize: 15,
        fontWeight: '500'
    },
    detail: {
        fontSize: 14,
    },
});

export default MovieDetail;
