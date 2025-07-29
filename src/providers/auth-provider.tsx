"use client";

import { useState, createContext, useContext } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>
    register: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async (email: string, password: string): Promise<boolean> => {
        if (email && password) {
            setUser({ id: "1", name: "Demo User", email });
            setIsLoading(false);
            return true;
        }
        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        if (name && email && password) {
            setUser({ id: "2", name, email });
            setIsLoading(false);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
