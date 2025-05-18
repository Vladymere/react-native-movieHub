import React, { useState } from "react";
import {
    View,
    TextInput,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { signUp } from "@/services/appwrite";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons"; // Use your movie app logo/icon

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (!name) {
            Alert.alert("Error", "Please enter your name.");
            return;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }
        if (!password || password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        try {
            await signUp(email, password, name);
            Alert.alert("Success", "Account created! Please login.");
            router.replace("/login");
        } catch (e: any) {
            Alert.alert("Error", e?.message || "Failed to sign up.");
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
            <Text style={styles.title}>Create your MovieHub account</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Signing up..." : "Sign Up"}
                </Text>
            </TouchableOpacity>
            {/* Login link */}
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.replace("/login")}>
                    <Text style={styles.loginLink}>Login</Text>
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
    loginContainer: {
        flexDirection: "row",
        marginTop: 24,
        alignItems: "center",
    },
    loginText: {
        color: "#aaa",
        fontSize: 15
    },
    loginLink: {
        color: "#E50914",
        fontWeight: "bold",
        marginLeft: 6,
        fontSize: 15
    }
});