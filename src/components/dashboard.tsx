"use client"

import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { PriceFeeds } from "./price-feeds"
import { TradingPanel } from "./trading-panel"
import { OrderHistory } from "./order-history"

export function Dashboard() {
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = useState("trading")

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <h1 className="text-xl font-bold">MT5 Clone</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="text-sm">{user?.name}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-gray-800 border-b border-gray-700 px-6 py-2">
                <div className="flex space-x-6">
                    <button
                        onClick={() => setActiveTab("trading")}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "trading" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
                            }`}
                    >
                        Trading
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "history" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
                            }`}
                    >
                        Order History
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                {activeTab === "trading" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PriceFeeds />
                        </div>
                        <div>
                            <TradingPanel />
                        </div>
                    </div>
                ) : (
                    <OrderHistory />
                )}
            </main>
        </div>
    )
}
