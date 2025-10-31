import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { formatNumber } from './utils/number';

export default function App() {
	// monthlyAmount: 월 납입액
	const [monthlyAmount, setMonthlyAmout] = useState(1_000_000) // 기본 1,000,000원
	const [ticker, setTicker] = useState("AAPL") // default AAPL
	const [startDate, setStartDate] = useState("2020-01-01");
	const [endDate, setEndDate] = useState("2024-12-31");
	const [result, setResult] = useState(null);

	function handleSimulate() {
		setResult({
			invested: monthlyAmount * 12 * 5,
			estimated_value: monthlyAmount * 12 * 5 * 1.8,
		});
	}


	return (
		<div className='container'> 
			<h1>주식 투자 시뮬레이터 </h1>
			<p className='main-description'>
				매달 일정 금액을 투자했을 때의 수익률을 계산해보세요.
			</p>

			<div className='input-group'>
				<label>월 납입 금액 (원):</label>
				<input
				type="number"
				value={monthlyAmount}
				onChange={(e) => setMonthlyAmout(Number(e.target.value))}/>
				<div>월 납입액: {monthlyAmount} 원</div>
			</div>

			<div className='input-group'>
				<label>종목 (티커)</label>
				<input 
				type='text'
				value={ticker}
				placeholder='NVDA, AAPL, ...'
				onChange={(e) => setTicker(e.target.value.toUpperCase())}
				/>
				<div>선택 티커: {ticker}</div>
			</div>

			<button
			className='simulate-btn'
			onClick={handleSimulate}
			>
				시뮬레이션 실행
			</button>

			{result && (
				<div className='result-box'>
					<h2>📊 결과</h2>
					<p>총 납입금액: {formatNumber(result.invested)} 원</p>
					<p>예상 평가금액: {formatNumber(result.estimated_value)} 원</p>
				</div>
			)}



		</div>
		)
}