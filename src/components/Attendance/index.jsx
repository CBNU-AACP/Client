/* eslint-disable react/destructuring-assignment */
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import StyledAttendance from './style'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'

import CourseDataService from '../../services/CourseService'

function Attendance(props) {
  Attendance.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  }
  const initialCourseState = {
    courseId: null,
    name: '',
    description: '',
  }

  const [currentCourse, setCurrentCourse] = useState(initialCourseState) // 현재 강좌 정보 저장

  const dispatch = useDispatch()

  const getCourse = id => {
    // 현재 강좌를 찾는 함수
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  return (
    <StyledAttendance>
      {currentCourse.courseId !== null ? (
        <div>
          <div>
            <p>강좌명: {currentCourse.name}</p>
            <p>설명: {currentCourse.description}</p>
            <p>총 학생수: 35명</p>
          </div>

          <div className="datagrid" style={{ height: 400, width: '600px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} disableSelectionOnClick />
          </div>
        </div>
      ) : (
        <div>로딩 중..</div>
      )}
    </StyledAttendance>
  )
}

export default Attendance
