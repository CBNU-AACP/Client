/* eslint-disable react/destructuring-assignment */
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import StyledAttendance from './style'
import PropTypes from 'prop-types'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  useGridSlotComponentProps,
} from '@mui/x-data-grid'
import Pagination from '@material-ui/lab/Pagination/Pagination'

import CourseDataService from '../../services/CourseService'
import { getCourseDates, getAttendanceBook } from '../../actions/attendance'

import getColumns from './getColumns'
import getRows from './getRows'

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
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const { courseId } = currentCourse

  const dispatch = useDispatch()
  const courseDates = useSelector(state => state.courseDates)
  const attendanceBook = useSelector(state => state.attendanceBook)

  function CustomToolbar() {
    // 툴바 커스텀
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  function CustomPagination() {
    // 출석부 페이지네이션
    const { state, apiRef } = useGridSlotComponentProps()
    return (
      <Pagination
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    )
  }

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

  const getAttendanceInfo = () => {
    dispatch(getCourseDates(courseId))
      .then(data => {
        console.log('2', data)
        dispatch(getAttendanceBook(courseId))
          .then(data => console.log('2', data))
          .catch(e => {
            console.log(e)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    if (courseId) getAttendanceInfo()
  }, [courseId])

  useEffect(() => {
    console.log(1)
    if (courseDates.length !== 0 && attendanceBook.length !== 0) {
      setColumns(getColumns(courseDates)) // columns 상태 저장
      setRows(getRows(courseDates, attendanceBook)) // rows 상태 저장
    }
  }, [attendanceBook])

  return (
    <div>
      {userId && userId !== 'undefined' ? (
        <StyledAttendance>
          {currentCourse.courseId !== null && attendanceBook[0] ? (
            <div>
              <div>
                <p>강좌명: {currentCourse.name}</p>
                <p>설명: {currentCourse.description}</p>
                <p>학생수: {attendanceBook[0].length}명</p>
              </div>

              <div className="datagrid">
                <div className="gridparent">
                  <DataGrid
                    className="grid"
                    page={page}
                    onPageChange={newPage => setPage(newPage)}
                    localeText={{
                      toolbarColumns: '열',
                      columnsPanelTextFieldLabel: '열 찾기',
                      columnsPanelTextFieldPlaceholder: '열 이름을 입력해주세요.',
                      columnsPanelShowAllButton: '모든 열 보이기',
                      columnsPanelHideAllButton: '모든 열 감추기',
                      toolbarExport: '추출',
                      toolbarExportCSV: 'CSV로 다운로드',
                    }}
                    components={{
                      Toolbar: CustomToolbar,
                      Pagination: CustomPagination,
                    }}
                    columnBuffer={10}
                    pagenation
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    disableColumnMenu
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
