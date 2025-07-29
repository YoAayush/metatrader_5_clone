"use client"

import { useEffect, useState } from "react"

interface MarketData {
    symbol: string
    price: number
    change: number
    changePercent: number
    volume: string
}

export function PriceFeeds() {
    const [marketData, setMarketData] = useState<MarketData[]>([
        { symbol: "EURUSD", price: 1.0856, change: 0.0012, changePercent: 0.11, volume: "1.2M" },
        { symbol: "GBPUSD", price: 1.2734, change: -0.0023, changePercent: -0.18, volume: "890K" },
        { symbol: "USDJPY", price: 149.82, change: 0.45, changePercent: 0.3, volume: "2.1M" },
        { symbol: "AUDUSD", price: 0.6523, change: 0.0008, changePercent: 0.12, volume: "650K" },
        { symbol: "USDCAD", price: 1.3678, change: -0.0015, changePercent: -0.11, volume: "780K" },
        { symbol: "NZDUSD", price: 0.5987, change: 0.0034, changePercent: 0.57, volume: "420K" },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setMarketData((prev) =>
                prev.map((item) => {
                    const randomChange = (Math.random() - 0.5) * 0.01
                    const newPrice = Math.max(0, item.price + randomChange)
                    const change = newPrice - item.price
                    const changePercent = (change / item.price) * 100

                    return {
                        ...item,
                        price: Number(newPrice.toFixed(4)),
                        change: Number(change.toFixed(4)),
                        changePercent: Number(changePercent.toFixed(2)),
                    }
                }),
            )
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Live Market Prices
                </h2>
            </div>

            <div className="p-4">
                <div className="space-y-3">
                    {marketData.map((item) => (
                        <div
                            key={item.symbol}
                            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="font-semibold text-white">{item.symbol}</div>
                                <div className="text-sm text-gray-400">Vol: {item.volume}</div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="font-mono text-lg text-white">{item.price}</div>
                                    <div className={`flex items-center text-sm ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        {item.change >= 0 ? (
                                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 17H21L13 9L9 13L3 7"
                                                />
                                            </svg>
                                        )}
                                        {item.change >= 0 ? "+" : ""}
                                        {item.change} ({item.changePercent}%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
