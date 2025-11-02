import requests

def update_nasdaq_tickers():
	url = "https://raw.githubusercontent.com/rreichel3/US-Stock-Symbols/main/nasdaq/nasdaq_tickers.txt"
	res = requests.get(url)
	res.raise_for_status()
	with open("data/nasdaq_tickers.txt", "w", encoding="utf-8") as f:
		f.write(res.text)
	print("✅ NASDAQ ticker list updated!")


def load_nasdaq_tickers():
	with open("data/nasdaq_tickers.txt", "r", encoding="utf-8") as f:
		return [line.strip() for line in f if line.strip()]
