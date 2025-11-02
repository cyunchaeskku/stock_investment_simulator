import os
import requests
from dotenv import load_dotenv
import yfinance as yf
from datetime import datetime

load_dotenv()

def fetch_daily_prices(symbol: str, start: str, end: str):
    """
    Yahoo Finance에서 일별 종가 데이터 가져오기
    symbol: 'AAPL', 'NVDA', 'TSLA', 'MSFT' 등
    start, end: 'YYYY-MM-DD' 형식
    """
    try:
        ticker = yf.Ticker(symbol)
        '''
        1m: 1분봉 (1분) 최근 7일치만 가능
        1h: 1시간
        1d: 1일
        1wk: 주봉
        1mo: 월봉
        '''
        df = ticker.history(start=start, end=end, interval="1wk")
        if df.empty:
            return []

        # DataFrame → JSON 리스트
        prices = [
            {"date": d.strftime("%Y-%m-%d"), "close": float(c)}
            for d, c in zip(df.index, df["Close"])
        ]
        
        
        return prices

    except Exception as e:
        print("❌ Yahoo Finance error:", e)
        return []