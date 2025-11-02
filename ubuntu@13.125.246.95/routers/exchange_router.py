import requests
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/exchange",
    tags=["Exchange Rates"]
)

@router.get("/rates")
def get_exchange_rates(start: str, end: str):
    """
    Frankfurter API를 대신 호출해서 날짜별 USD→KRW 환율 데이터를 반환합니다.
    """
    try:
        url = f"https://api.frankfurter.app/{start}..{end}?from=USD&to=KRW"
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        data = res.json()
        return data
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Frankfurter API 호출 실패: {e}")
