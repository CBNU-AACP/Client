import courseDate from '../../utils/courseDateIdtoString'

export default function getRows(courseDates, attendanceBook) {
  const rowsState = []
  const studentsState = []
  const courseDateState = {}

  for (let i = 0; i < attendanceBook[0].length; i += 1) {
    studentsState.push({ id: i + 1, 이름: `${attendanceBook[0][i].name}`, 학번: `${attendanceBook[0][i].studentId}` })
  }
  for (let i = 0; i < studentsState.length; i += 1) {
    for (let j = 1; j < attendanceBook.length; j += 1) {
      courseDateState[courseDate(courseDates, j - 1)] = attendanceBook[j][i]
    }
    rowsState.push({ ...studentsState[i], ...courseDateState })
  }
  console.log(rowsState)
  return rowsState
}
