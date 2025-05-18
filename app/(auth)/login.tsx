import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { login } from "@/services/appwrite";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons"; // Use your own logo or movie icon

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }
        if (!password) {
            Alert.alert("Error", "Please enter your password.");
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            Alert.alert("Success", "Logged in!");
            router.replace("/");
        } catch (e: any) {
            Alert.alert("Error", e?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Movie App Logo */}
            <View style={styles.logoContainer}>
                <Image source={icons.logo} style={styles.logo} />
                <Text style={styles.appTitle}>MovieHub</Text>
            </View>

            <Text style={styles.title}>Login to your account</Text>

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
            </TouchableOpacity>

            {/* Sign Up link */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.replace("/signup")}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#151312" // MovieHub dark background
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 8,
        resizeMode: "contain",
        borderRadius: 25,
    },
    appTitle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
        color: "#fff",
        fontWeight: "600"
    },
    input: {
        backgroundColor: "#22213A",
        color: "#fff",
        padding: 14,
        borderRadius: 8,
        width: "100%",
        marginBottom: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        backgroundColor: "#E50914", // Netflix red
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 8,
        width: "100%",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    signupContainer: {
        flexDirection: "row",
        marginTop: 24,
        alignItems: "center",
    },
    signupText: {
        color: "#aaa",
        fontSize: 15
    },
    signupLink: {
        color: "#E50914",
        fontWeight: "bold",
        marginLeft: 6,
        fontSize: 15
    }
});