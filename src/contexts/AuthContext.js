import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    deleteUser
} from "firebase/auth";

import auth from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function updateUserProfile(user, profile) {
        return updateProfile(user, profile);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    function deleteCurrentUser(user) {
        deleteUser(user).then(() => {
            window.location.replace("/login")
        }).catch((error) => {
            console.log(error)
        });
    }
    const value = {
        currentUser,
        error,
        setError,
        login,
        register,
        logout,
        updateUserProfile,
        deleteCurrentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}