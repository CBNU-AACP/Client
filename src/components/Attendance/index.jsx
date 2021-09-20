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
import Pagination from '@material-ui/lab/Pagination'

import CourseDataService from '../../services/CourseService'
import { getCourseDates, getAttendanceBook } from '../../actions/attendance'

import getColumns from './getColumns'
import getRows from './getRows'
import courseDate from '../../utils/courseDateIdtoString'

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
  const [apiend, setApiend] = useState(false) // 서버요청이 끝났는지 아닌지 여부
  const [rows, setRows] = useState([])
  const [edit, setEdit] = useState([]) // 현재 수정 중인 셀을 담는 상태
  const [editList, setEditList] = useState([]) // 수정하는 것들을 담는 상태
  const [message, setMessage] = useState('로딩 중..')
  const [page, setPage] = useState(0)
  const courseId = props.match.params.id

  let courseDates = []
  let attendanceBook = []

  const dispatch = useDispatch()
  const attendance = useSelector(state => state.attendanceBook)
  const coursedates = useSelector(state => state.courseDates)

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

  const handleEdit = model => {
    setEdit(model)
    const key = +Object.keys(model)
    if (model[key] !== undefined && model[key] !== null) {
      const v = String(Object.keys(model[key]))
      coursedates.forEach((el, idx) => {
        if (courseDate(coursedates, idx) === v) {
          const index = editList.findIndex((cur, id, arr) => {
            // findIndex가 0을 반환하면 -1로 바꿈 그래서 0번 idx에서 찾아도 -1로 된다.
            if (cur[0] === attendance[0][key - 1].userId && cur[1] === el.courseDateId) {
              return id
            }
            return false
          }) // editlist에 일치하는 배열이 있는지 확인
          if (editList.length !== 0 && index !== -1) {
            // 일치하면
            editList[index][2] = model[key][v].value // 상태 수정
            setEditList([...editList]) // 상태 업데이트
          } else if (editList.length === 0 || index === -1) {
            setEditList([...editList, [attendance[0][key - 1].userId, el.courseDateId, model[key][v].value]])
          }
        }
      })
    }
  }

  useEffect(() => {
    console.log(editList)
  }, [editList])

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

  const getAttendanceInfo = id => {
    dispatch(getCourseDates(id))
      .then(data => {
        courseDates = data
        console.log('1', courseDates)
        setColumns(getColumns(data)) // columns 상태 저장
        dispatch(getAttendanceBook(id))
          .then(data => {
            attendanceBook = data
            console.log('2', attendanceBook)
            setApiend(true)
            setRows(getRows(courseDates, attendanceBook)) // rows 상태 저장
          })
          .catch(e => {
            setMessage('등록한 학생이 없습니다.')
          })
      })
      .catch(e => {
        setMessage('리더기를 켜서 수업 날짜를 만들어주세요.')
      })
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(courseId)
    getAttendanceInfo(courseId)
  }, [courseId])

  return (
    <div>
      {userId && userId !== 'undefined' ? (
        <StyledAttendance>
          {courseId !== null && apiend !== false ? (
            rows.length !== 0 ? (
              <div>
                <div>
                  <p>강좌명: {currentCourse.name}</p>
                  <p>설명: {currentCourse.description}</p>
                  <p>학생수: {rows.length}명</p>
                </div>

                <div className="datagrid">
                  <div className="gridparent">
                    <DataGrid
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
                      isCellEditable={params => params}
                      editRowsModel={edit}
                      onEditRowsModelChange={handleEdit}
                    />
                  </div>
                </div>
                <button type="button">수정하기</button>
              </div>
            ) : (
              <div>{message}</div>
            )
          ) : (
            <div>{message}</div>
          )}
        </StyledAttendance>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  )
}

export default Attendance
