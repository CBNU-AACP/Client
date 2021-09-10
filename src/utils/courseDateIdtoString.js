export default function courseDate(courseDates, idx) {
  return `${courseDates[idx].courseDateId.slice(0, 4)}년 ${courseDates[idx].courseDateId.slice(-6, -4)}월 ${courseDates[
    idx
  ].courseDateId.slice(-4, -2)}일 ${courseDates[idx].courseDateId.slice(-2)}시`
}
