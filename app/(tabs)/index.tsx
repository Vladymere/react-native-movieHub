import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();

  // 1. Fetch your data FIRST
  const {
    data: trendingMovies = [],
    loading: trendingLoading,
    error: trendingError,
  } = useFetch<TrendingMovie[]>(getTrendingMovies);

  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(() => fetchMovies({ query: "" }));

  // 2. Then filter for unique entries (ensure you never run map on null)
  const uniqueTrendingMovies = Array.from(
      new Map((trendingMovies || []).map(movie => [movie.movie_id, movie])).values()
  );
  const uniqueMovies = Array.from(
      new Map((movies || []).map(movie => [movie.id, movie])).values()
  );

  return (
      <View className="flex-1 bg-primary">
        <Image
            source={images.bg}
            className="absolute w-full z-0"
            resizeMode="cover"
        />

        <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <Image source={icons.logo} className="w-10 h-10 mt-20 mb-5 mx-auto rounded-md" />

          {moviesLoading || trendingLoading ? (
              <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="mt-10 self-center"
              />
          ) : moviesError || trendingError ? (
              <Text>Error: {moviesError?.message || trendingError?.message}</Text>
          ) : (
              <View className="flex-1 mt-5">
                <SearchBar
                    onPress={() => {
                      router.push("/search");
                    }}
                    placeholder="Search for a movie"
                />

                {uniqueTrendingMovies.length > 0 && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mb-3">
                        Trending Movies
                      </Text>
                      <FlatList
                          horizontal
                          data={uniqueTrendingMovies}
                          keyExtractor={(item) => item.movie_id.toString()}
                          showsHorizontalScrollIndicator={false}
                          className="mb-4 mt-3"
                          contentContainerStyle={{
                            gap: 26,
                          }}
                          renderItem={({ item, index }) => (
                              <TrendingCard movie={item} index={index} />
                          )}
                          ItemSeparatorComponent={() => <View className="w-4" />}
                      />
                    </View>
                )}

                <>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Latest Movies
                  </Text>

                  <FlatList
                      data={uniqueMovies}
                      renderItem={({ item }) => <MovieCard {...item} />}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 20,
                        paddingRight: 5,
                        marginBottom: 10,
                      }}
                      className="mt-2 pb-32"
                      scrollEnabled={false}
                  />
                </>
              </View>
          )}
        </ScrollView>
      </View>
  );
};

export default Index;