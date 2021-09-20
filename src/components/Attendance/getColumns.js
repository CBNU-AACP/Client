import courseDate from '../../utils/courseDateIdtoString'

export default function getColumns(courseDates) {
  const columnsState = [
    {
      headerAlign: 'center',
      field: '학번',
      headerName: '학번',
      width: 120,
      editable: false,
      sortable: false,
      align: 'center',
      headAlign: 'center',
    },
    {
      headerAlign: 'center',
      field: '이름',
      headerName: '이름',
      width: 120,
      editable: false,
      align: 'center',
    },
  ]

  for (let i = 0; i < courseDates.length; i += 1) {
    columnsState.push({
      field: `${courseDate(courseDates, i)}`,
      headerName: `${courseDate(courseDates, i)}`,
      width: 180,
      editable: true,
      sortable: false,
      type: 'boolean',
      align: 'center',
    })
  }
  console.log(columnsState)
  return columnsState
}
