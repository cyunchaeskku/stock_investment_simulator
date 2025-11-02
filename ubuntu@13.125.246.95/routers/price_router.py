from fastapi import APIRouter, Query
from services.yahoo_service import fetch_daily_prices

router = APIRouter(prefix="/price", tags=["Price"])

@router.get("/yahoo")
def get_price_yahoo(
    symbol: str = Query(..., example="AAPL"),
    start: str = Query(..., example="2023-01-01"),
    end: str = Query(..., example="2024-01-01")
):
    """ Yahoo에서 특정 종목 일별 종가 가져오기 """
    data = fetch_daily_prices(symbol, start, end)
    return {
        "symbol": symbol,
        "count": len(data),
        "data": data
    }