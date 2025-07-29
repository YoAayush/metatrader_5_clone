"use client"

import { useState } from "react"
// import { useAuth } from "@/components/auth-provider"

export function TradingPanel() {
    // const { user } = useAuth()
    const [selectedSymbol, setSelectedSymbol] = useState("EURUSD")
    const [volume, setVolume] = useState("0.01")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "NZDUSD"]

    const handleTrade = async (orderType: "buy" | "sell") => {
        // if (!user) return

        setIsLoading(true)
        setMessage("")

        try {
            const response = await fetch("/api/trades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // userId: user.id,
                    symbol: selectedSymbol,
                    type: orderType,
                    volume: Number.parseFloat(volume),
                }),
            })

            if (response.ok) {
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
                    <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                        />
                    </svg>
                    Trade Execution
                </h2>
            </div>

            <div className="p-4 space-y-4">
                {/* Symbol Selection */}
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

                {/* Volume Input */}
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

                {/* Message */}
                {message && (
                    <div
                        className={`text-sm p-2 rounded ${message.includes("success") ? "text-green-400 bg-green-900/20" : "text-red-400 bg-red-900/20"}`}
                    >
                        {message}
                    </div>
                )}

                {/* Trade Buttons */}
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

                {/* Account Info */}
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
