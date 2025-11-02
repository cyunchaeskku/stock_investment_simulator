from fastapi import APIRouter, Query
from services.ticker_service import load_tickers

router = APIRouter(prefix="/ticker", tags=["Ticker"])

@router.get("/search")
def search_tickers(q: str = Query("", description="ticker prefix")):
    tickers = load_tickers()
    q_upper = q.upper()
    matches = [t for t in tickers if t.startswith(q_upper)]
    return {"tickers": matches[:20]}  # 상위 20개만 리턴
