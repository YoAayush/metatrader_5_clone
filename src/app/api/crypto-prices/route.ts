import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

const CMC_API_KEY = process.env.COINMARKETCAP_APIKEY;

export async function GET(request: NextRequest) {
  // const url = new URL(request.url);
  //   const symbol = url.searchParams.get("symbol")?.toUpperCase() || "BTC";

  if (!CMC_API_KEY) {
    return NextResponse.json(
      { error: "CoinMarketCap API key is not set." },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": CMC_API_KEY
        },
        params: {
          symbol: "BTC,ETH,USDT",
          convert: "USDT",
        },
      }
    );

    // console.log("Response status:", response);

    if (response.status !== 200) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
