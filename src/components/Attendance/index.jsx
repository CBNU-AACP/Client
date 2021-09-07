/* eslint-disable react/destructuring-assignment */
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
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
    cookies: PropTypes.objectOf(PropTypes.shape),
  }

  const { userId } = props.cookies

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
      field: '학번',
      headerName: '학번',
      width: 100,
      editable: true,
    },
    {
      field: '이름',
      headerName: '학번',
      width: 100,
      editable: true,
    },
    {
      field: '2021090613',
      headerName: '2021090613',
      type: 'number',
      width: 200,
      editable: true,
    },
  ]

  const rows = [
    { id: 1, 이름: 'Snow', 학번: 'Jon', 2021090613: 35 },
    { id: 2, 이름: 'Lannister', 학번: 'Cersei', 2021090613: 42 },
    { id: 3, 이름: 'Lannister', 학번: 'Jaime', 2021090613: 45 },
    { id: 4, 이름: 'Stark', 학번: 'Arya', 2021090613: 16 },
    { id: 5, 이름: 'Targaryen', 학번: 'Daenerys', 2021090613: null },
    { id: 6, 이름: 'Melisandre', 학번: null, 2021090613: 150 },
    { id: 7, 이름: 'Clifford', 학번: 'Ferrara', 2021090613: 44 },
    { id: 8, 이름: 'Frances', 학번: 'Rossini', 2021090613: 36 },
    { id: 9, 이름: 'Roxie', 학번: 'Harvey', 2021090613: 65 },
  ]

  return (
    <div>
      {userId && userId !== 'undefined' ? (
        <StyledAttendance>
          {currentCourse.courseId !== null ? (
            <div>
              <div>
                <p>강좌명: {currentCourse.name}</p>
                <p>설명: {currentCourse.description}</p>
                <p>총 학생수: 35명</p>
              </div>

              <div className="datagrid">
                <div className="gridparent">
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>로딩 중..</div>
          )}
        </StyledAttendance>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  )
}

export default Attendance
