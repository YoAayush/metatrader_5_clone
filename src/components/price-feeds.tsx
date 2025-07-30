"use client"

import axios from "axios"
import { useEffect, useState } from "react"

interface MarketData {
    id: string
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    volume: string
    marketCap: string
}

export function PriceFeeds() {
    const [BTCmarketData, setBTCMarketData] = useState<MarketData[]>([])
    const [ETHmarketData, setETHMarketData] = useState<MarketData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get("/api/crypto-prices")

            if (response.status !== 200) {
                throw new Error("Failed to fetch crypto data")
            }

            const data = response.data;
            // console.log("Crypto data fetched:", data)
            setBTCMarketData(
                data.data.BTC.map((item: any) => {
                    const price = item.quote?.USDT?.price || 0;
                    const change = item.quote?.USDT?.percent_change_24h || 0;
                    const volume = item.quote?.USDT?.volume_24h || 0;
                    const marketCap = item.quote?.USDT?.market_cap || 0;

                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        price: price.toFixed(2),
                        change: change.toFixed(2),
                        changePercent: change.toFixed(2),
                        volume: volume.toFixed(2),
                        marketCap: marketCap.toFixed(2),
                    };
                })
            );
            setETHMarketData(
                data.data.ETH.map((item: any) => {
                    const price = item.quote?.USDT?.price || 0;
                    const change = item.quote?.USDT?.percent_change_24h || 0;
                    const volume = item.quote?.USDT?.volume_24h || 0;
                    const marketCap = item.quote?.USDT?.market_cap || 0;

                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        price: price.toFixed(2),
                        change: change.toFixed(2),
                        changePercent: change.toFixed(2),
                        volume: volume.toFixed(2),
                        marketCap: marketCap.toFixed(2),
                    };
                })
            );

            setError("")
        } catch (err) {
            console.error("Error fetching crypto data:", err)
            setError("Failed to load market data")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCryptoData()

        const interval = setInterval(() => {
            fetchCryptoData()
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    if (isLoading) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white flex items-center">
                        <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Live Crypto Prices
                    </h2>
                </div>
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading market data...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white flex items-center">
                        <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Live Crypto Prices
                    </h2>
                </div>
                <div className="p-8 text-center">
                    <div className="text-red-400 mb-4">
                        <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={fetchCryptoData}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    Live Market Prices
                </h2>
            </div>

            <div className="p-4">
                <div className="space-y-3">
                    {BTCmarketData?.concat(ETHmarketData).map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="font-semibold text-white">{item.symbol}<br />{item.name}</div>
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
