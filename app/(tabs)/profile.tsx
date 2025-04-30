import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons"; // Update this with your icons source
import { useState } from "react";

const Profile = () => {
    const [favorites, setFavorites] = useState([
        { id: 1, title: "Inception", poster: "https://link-to-poster1.jpg" },
        { id: 2, title: "Avatar", poster: "https://link-to-poster2.jpg" },
        { id: 3, title: "Titanic", poster: "https://link-to-poster3.jpg" },
    ]);

    return (
        <SafeAreaView className="bg-primary flex-1 px-10">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Profile Header */}
                <View className="flex items-center my-5">
                    <Image
                        source={icons.person}
                        className="w-24 h-24 rounded-full border-4 border-white"
                        tintColor="#fff"
                    />
                    <Text className="text-white text-2xl mt-2">Vladymere Bilan</Text>
                    <Text className="text-gray-400 text-sm">james.jamero@neu.edu.ph</Text>
                </View>

                {/* Favorites Section */}
                <View className="mt-5">
                    <Text className="text-white text-xl">Favorites</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
                        {favorites.map((movie) => (
                            <View key={movie.id} className="mr-3">
                                <Image
                                    source={{ uri: movie.poster }}
                                    className="w-24 h-36 rounded-lg"
                                />
                                <Text className="text-white text-xs text-center mt-2">{movie.title}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Settings Section */}
                <View className="mt-5">
                    <TouchableOpacity className="bg-gray-800 p-3 rounded-md">
                        <Text className="text-white text-center">Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-800 p-3 rounded-md mt-3">
                        <Text className="text-white text-center">Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-800 p-3 rounded-md mt-3">
                        <Text className="text-white text-center">Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
