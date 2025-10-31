# 📈 Stock Investment Simulator (React + FastAPI)

## 🎯 프로젝트 개요

이 프로젝트는 매달 일정 금액을 투자했을 때의 수익률을 계산하는 **DCA (Dollar Cost Averaging) 시뮬레이터**입니다. 사용자는 투자 금액, 기간, 매수일 등을 입력하면 실제 주가 데이터를 기반으로 시뮬레이션 결과를 확인할 수 있습니다.

---

## ⚙️ 기술 스택

### 🧠 Frontend

| 구분           | 기술                          | 설명                |
| ------------ | --------------------------- | ----------------- |
| **프레임워크**    | React (Vite)                | 빠르고 가벼운 개발 환경     |
| **언어**       | JavaScript / JSX            | 기본 React 구성       |
| **스타일링**     | Tailwind CSS (또는 Shadcn/ui) | 컴포넌트 기반 스타일링      |
| **차트 라이브러리** | Recharts                    | 자산 곡선, 누적 납입금 시각화 |
| **날짜 유틸리티**  | date-fns                    | 날짜 계산 (매수일, 기간 등) |

### 🐍 Backend

| 구분             | 기술                      | 설명                    |
| -------------- | ----------------------- | --------------------- |
| **프레임워크**      | FastAPI                 | Python 기반 REST API 서버 |
| **HTTP 클라이언트** | requests                | 외부 주가 데이터 API 호출      |
| **환경변수 관리**    | python-dotenv           | API 키 및 설정값 관리        |
| **CORS 설정**    | fastapi.middleware.cors | 프론트엔드와 통신 허용          |

### 🧰 DevOps / 환경

| 항목      | 내용           |
| ------- | ------------ |
| Node.js | v18 이상       |
| Python  | v3.11 이상     |
| 패키지 매니저 | npm, pip     |
| 버전 관리   | Git + GitHub |
| 가상환경    | venv (.venv) |

---

## 🧩 폴더 구조 (초기 설계)

```
stock-simulator/
├── backend/            # FastAPI 서버
│   ├── main.py
│   ├── services/        # API별 호출 로직
│   ├── utils/           # 시뮬레이션 계산 등 유틸
│   └── models/          # Pydantic 스키마
│
├── frontend/           # Vite + React
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🔑 환경 변수 (.env 예시)

```
# backend/.env
ALPHAVANTAGE_KEY=your_alphavantage_key
TIINGO_KEY=your_tiingo_key
POLYGON_KEY=your_polygon_key
```

---

## 🚀 실행 방법

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

➡ [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Frontend (Vite)

```bash
cd frontend
npm install
npm run dev
```

➡ [http://localhost:5173](http://localhost:5173)

---

## 🧠 향후 로드맵

| 단계   | 목표 기능                               |
| ---- | ----------------------------------- |
| v0.1 | 단일 종목 DCA 시뮬레이션 (Alpha Vantage 데이터) |
| v0.2 | 다중 종목 비교, 포트폴리오 비율 설정               |
| v0.3 | 환율 변환, 배당 재투자, 세금 반영                |
| v1.0 | 사용자 계정, 시뮬레이션 저장, UI 고도화            |

---

## ✨ 개발자 메모

* API 키는 **프론트엔드에 직접 노출 금지**
* CORS 허용 주소는 `http://localhost:5173` (Vite 기본 포트)
* Git 커밋 시 `.env` 파일은 반드시 `.gitignore`에 포함
