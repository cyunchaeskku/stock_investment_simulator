from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import price_router, exchange_router, ticker_router

app = FastAPI(title="Stock Investment Simulator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'], # Vite 기본 포트. React 실행 주소 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(price_router.router)
app.include_router(exchange_router.router)
app.include_router(ticker_router.router)

@app.get("/")
def root():
    return {"message": "Backend is now running"}

