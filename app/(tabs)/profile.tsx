import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/services/appwrite";
import { useRouter } from "expo-router";

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <SafeAreaView className="bg-primary flex-1 px-10">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="flex items-center my-5">
                    <Image
                        source={icons.person}
                        className="w-24 h-24 rounded-full border-4 border-white"
                        tintColor="#fff"
                    />
                    <Text className="text-white text-2xl mt-2">{user?.name || "User"}</Text>
                    <Text className="text-gray-400 text-sm">{user?.email}</Text>
                </View>
                {/* ...existing favorites and buttons... */}
                <TouchableOpacity className="bg-gray-800 p-3 rounded-md mt-3" onPress={handleLogout}>
                    <Text className="text-white text-center">Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;