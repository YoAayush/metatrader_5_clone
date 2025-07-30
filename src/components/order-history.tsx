"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import axios from "axios"

interface Order {
    id: string
    symbol: string
    type: "buy" | "sell"
    volume: number
    openPrice: number
    closePrice?: number
    profit?: number
    status: "open" | "closed"
    timestamp: string
}

export function OrderHistory() {
    const { user } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return

            try {
                const response = await axios.get(`/api/trades?userId=${user.id}`)
                setOrders(response.data.orders)
            } catch (error) {
                console.error("Failed to fetch orders:", error)
            }

            setIsLoading(false)
        }

        fetchOrders()
    }, [user])

    if (isLoading) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-center text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    Loading orders...
                </div>
            </div>
        )
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Order History
                </h2>
            </div>

            <div className="p-4">
                {orders.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="mt-2">Start trading to see your order history.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${order.type === "buy" ? "bg-green-600" : "bg-red-600"}`}>
                                        {order.type === "buy" ? (
                                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 17H21L13 9L9 13L3 7"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    <div>
                                        <div className="font-semibold text-white">{order.symbol}</div>
                                        <div className="text-sm text-gray-400">
                                            {order.type.toUpperCase()} {order.volume} lots
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-mono text-white text-sm">
                                        Open: {order.openPrice}
                                        {order.closePrice && <span className="ml-2">Close: {order.closePrice}</span>}
                                    </div>
                                    <div className="flex items-center justify-end space-x-2 mt-1">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === "open" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                        {order.profit !== undefined && (
                                            <span className={`text-sm font-medium ${order.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                                {order.profit >= 0 ? "+" : ""}${order.profit.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-sm text-gray-400 ml-4">{new Date(order.timestamp).toLocaleDateString()}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
