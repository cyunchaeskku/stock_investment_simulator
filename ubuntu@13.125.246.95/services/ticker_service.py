from pathlib import Path

def load_tickers():
    path = Path(__file__).resolve().parent.parent / "data" / "nasdaq_tickers.txt"
    with open(path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]
