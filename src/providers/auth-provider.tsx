"use client";

import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setIsLoading(true);
            const fetchUser = async () => {
                const DecodedUser = await axios.post("/api/jwt", { type: "verify", token });
                setUser({
                    id: DecodedUser.data.user.user._id,
                    name: DecodedUser.data.user.user.name,
                    email: DecodedUser.data.user.user.email
                });
                setIsLoading(false);
            };
            fetchUser();
        }
    }, []);

    return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
