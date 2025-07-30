"use client"

import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import axios from "axios"

export function TradingPanel() {
    const { user } = useAuth()
    const [selectedSymbol, setSelectedSymbol] = useState("BTC")
    const [volume, setVolume] = useState("0.01")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const symbols = ["BTC", "ETH",]

    const handleTrade = async (orderType: "buy" | "sell") => {
        if (!user) return

        setIsLoading(true)
        setMessage("")

        try {
            const response = await axios.post("/api/trades", {
                userId: user.id,
                symbol: selectedSymbol,
                type: orderType,
                volume: Number.parseFloat(volume),
            })

            if (response.status === 200) {
                setVolume("0.01")
                setMessage(`${orderType.toUpperCase()} order placed successfully!`)
                setTimeout(() => setMessage(""), 3000)
            } else {
                setMessage("Failed to place order")
            }
        } catch (error) {
            console.error("Trade error:", error)
            setMessage("Failed to place order")
        }

        setIsLoading(false)
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    Trade Execution
                </h2>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <label htmlFor="symbol" className="block text-sm font-medium text-white mb-2">
                        Symbol
                    </label>
                    <div className="relative">
                        <select
                            id="symbol"
                            value={selectedSymbol}
                            onChange={(e) => setSelectedSymbol(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                            {symbols.map((symbol) => (
                                <option key={symbol} value={symbol}>
                                    {symbol}
                                </option>
                            ))}
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label htmlFor="volume" className="block text-sm font-medium text-white mb-2">
                        Volume (Lots)
                    </label>
                    <input
                        id="volume"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {message && (
                    <div
                        className={`text-sm p-2 rounded ${message.includes("success") ? "text-green-400 bg-green-900/20" : "text-red-400 bg-red-900/20"}`}
                    >
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleTrade("buy")}
                        disabled={isLoading}
                        className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>BUY</span>
                    </button>

                    <button
                        onClick={() => handleTrade("sell")}
                        disabled={isLoading}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H21L13 9L9 13L3 7" />
                        </svg>
                        <span>SELL</span>
                    </button>
                </div>

                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-white mb-3">Account Information</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Balance:</span>
                            <span className="text-green-400 font-mono">$10,000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Equity:</span>
                            <span className="text-green-400 font-mono">$10,000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Free Margin:</span>
                            <span className="text-blue-400 font-mono">$10,000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Margin Level:</span>
                            <span className="text-yellow-400 font-mono">100.00%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
