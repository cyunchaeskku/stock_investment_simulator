import { useState, useEffect } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export const API_BASE_URL = "http://13.125.246.95:8000";

export default function App() {
    const [monthlyAmount, setMonthlyAmount] = useState(1_000_000);
    const [weeklyAmount, setWeeklyAmount] = useState(250_000);
    const [ticker, setTicker] = useState('AAPL');
    const [startDate, setStartDate] = useState(new Date('2010-01-01'));
    const [endDate, setEndDate] = useState(new Date('2025-10-31'));
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState([]);
    const [result, setResult] = useState(false);
    const [investmentReturn, setInvestmentReturn] = useState(0);
    const [principal, setPrincipal] = useState(0);
    const [assessedValue, setAssessedValue] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function fetchPrices() {
        setLoading(true);
        try {
          const startStr = startDate.toISOString().split('T')[0];
          const endStr = endDate.toISOString().split('T')[0];
      
          const priceRes = await fetch(
            `${API_BASE_URL}/price/yahoo?symbol=${ticker}&start=${startStr}&end=${endStr}`
          );
      
          if (!priceRes.ok) {
            throw new Error(`Price API failed: ${priceRes.status}`);
          }
      
          const priceData = await priceRes.json();
          console.log("✅ 가격 데이터:", priceData);
      
          setPrices(priceData.data);
        } catch (err) {
          console.error("❌ 데이터 로드 에러:", err);
        } finally {
          setLoading(false);
        }
      }
      

    function calculateInvestmentReturn(prices, weeklyAmount) {
        if (!prices || prices.length === 0) return [];

        const combinedData = [];
        let totalPrincipal = 0;
        let totalStock = 0;
        const EXCHANGE_RATE = 1300;

        prices.forEach((item) => {
            const priceKRW = item.close * EXCHANGE_RATE;
            const stockBought = weeklyAmount / priceKRW;
            totalStock += stockBought;
            totalPrincipal += weeklyAmount;

            const assessedValue = Math.round(totalStock * priceKRW);

            combinedData.push({
                date: item.date,
                close: priceKRW,
                principal: totalPrincipal,
                assessed: assessedValue,
            });
        });

        const final = combinedData.at(-1);
        const avgPrice = totalPrincipal / totalStock;
        const currentPrice = final.close;
        const ROI = ((currentPrice - avgPrice) / avgPrice) * 100;

        setPrincipal(final.principal);
        setAssessedValue(final.assessed);
        setInvestmentReturn(ROI.toFixed(1));

        return combinedData;
    }

	// 알파벳 입력 시 자동완성 호출
    async function handleTickerChange(e) {
        const value = e.target.value.toUpperCase();
        setTicker(value);
        if (value.length === 0) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/ticker/search?q=${value}`);
            const data = await res.json();
            setSuggestions(data.tickers);
            setShowSuggestions(true);
        } catch (err) {
            console.error("ticker search error:", err);
        }
    }

    // 추천 클릭 시
    function handleSelectSuggestion(selected) {
        setTicker(selected);
        setShowSuggestions(false);
    }

    useEffect(() => {
        if (prices.length > 0) {
            const data = calculateInvestmentReturn(prices, weeklyAmount);
            setChartData(data);
            setResult(true);
        }
    }, [prices]);

    return (
        <div className="container">
            <h1>주식 투자 시뮬레이터 (원화 기준)</h1>
            <p className="main-description">매주 일정 금액을 투자했을 때의 수익률을 계산해보세요.</p>

            <div className="input-group">
                <label>시작 날짜:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div className="input-group">
                <label>종료 날짜:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div className="input-group">
                <label>월 납입 금액 (원):</label>
                <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setMonthlyAmount(value);
                        setWeeklyAmount(value / 4);
                    }}
                />
                <div>월 납입액: {monthlyAmount.toLocaleString()} 원</div>
            </div>

            <div className="input-group">
                <label>종목 (티커)</label>
                <input
                    type="text"
                    value={ticker}
                    placeholder="예: NVDA, AAPL ..."
                    onChange={handleTickerChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // 클릭 허용
                />

                {/* 추천 목록 */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((s, idx) => (
                            <li key={idx} onClick={() => handleSelectSuggestion(s)}>
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className="simulate-btn" onClick={fetchPrices} disabled={loading}>
                {loading ? '데이터 불러오는 중...' : '시뮬레이션 실행'}
            </button>

            {result && (
                <div style={{ width: '100%', margin: '2rem auto 4rem auto' }}>
                    <h2 style={{ textAlign: 'center' }}>📊 {ticker} 투자 추이 (₩)</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                        <div style={{ flex: 1, height: '350px' }}>
                            <h3 style={{ textAlign: 'center' }}>💰 총 납입액 vs 총 평가금액</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={30} />
                                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                                    <Tooltip
                                        formatter={(value, name) => [`${value.toLocaleString()} 원`, name]}
                                        labelFormatter={(label) => `📅 ${label}`}
                                    />
                                    <Line type="monotone" dataKey="principal" stroke="#2E8B57" strokeWidth={2} dot={false} name="총 납입액 (₩)" />
                                    <Line type="monotone" dataKey="assessed" stroke="#FF6347" strokeWidth={2} dot={false} name="총 평가금액 (₩)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ flex: 1, height: '350px' }}>
                            <h3 style={{ textAlign: 'center' }}>📈 주가 추이 (₩)</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={30} />
                                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                                    <Tooltip
                                        formatter={(value, name) => [`${value.toLocaleString()} 원`, name]}
                                        labelFormatter={(label) => `📅 ${label}`}
                                    />
                                    <Line type="monotone" dataKey="close" stroke="#1E90FF" strokeWidth={2} dot={false} name="주가 (₩)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '6rem' }}>
                        <span>총 납입액: {principal.toLocaleString()} 원</span>
                        <br />
                        <span>총 평가금액: {assessedValue.toLocaleString()} 원</span>
                        <br />
                        <span>수익률: {investmentReturn.toLocaleString()}%</span>
                    </p>
                </div>
            )}
        </div>
		
    );
}