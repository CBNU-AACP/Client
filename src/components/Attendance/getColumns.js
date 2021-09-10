import courseDate from '../../utils/courseDateIdtoString'

export default function getColumns(courseDates) {
  const columnsState = [
    {
      field: '학번',
      headerName: '학번',
      width: 100,
      editable: false,
    },
    {
      field: '이름',
      headerName: '이름',
      width: 100,
      editable: false,
    },
  ]

  for (let i = 0; i < courseDates.length; i += 1) {
    columnsState.push({
      field: `${courseDate(courseDates, i)}`,
      headerName: `${courseDate(courseDates, i)}`,
      width: 200,
      editable: true,
    })
  }
  console.log(columnsState)
  return columnsState
}
