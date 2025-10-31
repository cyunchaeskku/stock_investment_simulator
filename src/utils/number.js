/*
숫자 표기할 때 쓰는 함수들
*/

/**
 * 숫자를 천 단위 콤마로 포맷
 * @param {number} num - 포맷할 숫자
 * @returns {string} - 1,234,567 형식의 문자열
 */
export function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return "-";
    return num.toLocaleString("ko-KR");
}