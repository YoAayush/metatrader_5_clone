"use client"

import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Cookies from "js-cookie"
import { useAuth } from "@/providers/auth-provider"

export function AuthPage() {
    const { user, setUser, isLoading, setIsLoading } = useAuth()
    const [activeTab, setActiveTab] = useState("login")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!email || !password) {
            toast.error("Email and password are required.")
            setError("Email and password are required.")
            setIsLoading(false)
            return
        }

        const res = await axios.post("/api/login", { email, password });
        console.log("Login response:", res)
        if (res.status === 200) {
            const { token } = res.data
            Cookies.set("token", token, { expires: 7 })
            const DecodedUser = await axios.post("/api/jwt", { type: "verify", token });
            setUser({
                id: DecodedUser.data._id,
                name: DecodedUser.data.name,
                email: DecodedUser.data.email
            })
            toast.success("Login successful!")
            setError("")
        } else {
            toast.error("Login failed. Please check your credentials.")
            setError("Login failed. Please check your credentials.")
        }

        setIsLoading(false)
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!name || !email || !password) {
            toast.error("All fields are required.")
            setError("All fields are required.")
            setIsLoading(false)
            return
        }

        try {
            const { data: response } = await axios.post("/api/register", { name, email, password });

            if (response.success) {
                toast.success(response.message);
                setError("")
            } else {
                setError(response.message)
            }
            setIsLoading(false)
            setActiveTab("login")
        } catch (error) {
            toast.error("An error occurred. Please try again.")
            setError("An error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-white">MT5 Clone</h1>
                </div>

                <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "login" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "register" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* Auth Forms */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    {activeTab === "login" ? (
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Login</h2>
                            <p className="text-gray-400 mb-6">Enter your credentials to access your trading account</p>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {error && <div className="text-red-400 text-sm">{error}</div>}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {isLoading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Register</h2>
                            <p className="text-gray-400 mb-6">Create a new trading account</p>

                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Create a password"
                                    />
                                </div>

                                {error && <div className="text-red-400 text-sm">{error}</div>}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {isLoading ? "Creating account..." : "Register"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-gray-400 text-sm">Demo account: demo@example.com / demo123</div>
            </div>
        </div>
    )
}
