export default function getRows(courseDates, attendanceBook) {
  const rowsState = []
  const studentsState = []
  const courseDateState = {}

  for (let i = 0; i < attendanceBook[0].length; i += 1) {
    studentsState.push({ id: i + 1, 이름: `${attendanceBook[0][i].name}`, 학번: `${attendanceBook[0][i].studentId}` })
  }
  for (let i = 0; i < courseDates.length; i += 1) {
    courseDateState[courseDates[i].courseDateId] = ''
  }
  for (let i = 0; i < studentsState.length; i += 1) {
    for (let j = 1; j < attendanceBook.length; j += 1) {
      courseDateState[courseDates[j - 1].courseDateId] = attendanceBook[j][i]
    }
    rowsState.push({ ...studentsState[i], ...courseDateState })
  }
  console.log(rowsState)
  return rowsState
}
