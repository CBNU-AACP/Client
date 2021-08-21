/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { DataGrid } from '@material-ui/data-grid'
import { FiPlusSquare } from 'react-icons/fi'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'
import StyledAddmemberModal from './style'

import { createMemberlist, retrieveMemberlist, findMemberByName } from '../../../actions/memberlist'
import { retrieveUsers, findUserByName } from '../../../actions/userlist'

function getModalStyle() {
  // 여기서부터 modal style
  return {
    top: `50%`,
    left: `50%`,
    WebkitTransform: `translate(-50%, -50%)`,
    MsTransform: `translate(-50%, -50%)`,
    MozTransform: `translate(-50%, -50%)`,
    OTransform: `translate(-50%, -50%)`,
    transform: `translate(-50%, -50%)`,
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80vw',
    maxWidth: '100%',
    height: '42vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const columns = [
  // 여기까지 modal style
  {
    field: 'studentId',
    headerName: '학번',
    // width: '20rem',
  },
  {
    field: 'name',
    headerName: '이름',
    // width: '20rem',
  },
  {
    field: 'userId',
    headerName: '학생 ID',
    // width: '20rem',
  },
]

export default function AddmemberModal({ courseId, submitted }) {
  AddmemberModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    submitted: PropTypes.func.isRequired,
  }

  const [rows, setRows] = useState([]) // 서버로부터 모든 유저들의 정보를 담을 상태변수
  const [memberList, setMemberList] = useState([]) // 멤버리스트 서버에 보낸 후 모달 밖의 컴포넌트에 보낼 멤버리스트 id배열
  const [submitable, setSubmitable] = useState(false) // 멤버리스트 생성 준비 상태를 나타냄

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const reduxmemberList = useSelector(state => state.memberlist) // 리덕스 상태에 저장된 memberlist 데이터

  const [pageSize, setPageSize] = useState(10) // 페이지 사이즈 상태변수
  const [searchMember, setSearchMember] = useState('') // 검색어 저장 상태변수

  useEffect(() => {
    // 체크박스에서 체크해서 멤버리스트 구성
    if (!submitable && memberList.length !== 0) setSubmitable(true) // 제출 불가능한 상태에서 멤버리스트에 내용이 있으면 제출 가능 상태로 만든다.
    console.log(memberList, courseId, submitable)
  }, [memberList, submitable])

  useEffect(() => {
    console.log(rows)
  }, [rows])

  // const userlist = useSelector(state => state.userlist[0]) // userlist 목록 가져온다.

  const userlistReducer = users => users.reduce((acc, cur, index) => [...acc, { id: index, ...cur }], []) // id 넘버를 포함한 객체 배열 반환

  const getUserlist = () => {
    // 유저리스트 불러오는 함수
    dispatch(retrieveUsers())
      .then(data => {
        setRows(userlistReducer(data))
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getMemberlist = () => {
    // 서버로부터 현재 코스의 멤버리스트 가져옴
    dispatch(retrieveMemberlist(courseId))
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const addMemberlist = () => {
    dispatch(createMemberlist(memberList, courseId))
      .then(data => {
        console.log(data)
        setOpen(false) // 멤버리스트 생성에 성공하면 창을 닫는다.
        submitted(true) // 멤버 등록 버튼을 눌렀음을 알려줌
        setSubmitable(false) // 멤버리스트 생성에 성공하면 submit을 false로 바꾼다.
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    if (memberList.length === 0) setSubmitable(false) // modal을 열때 memberlist가 비어있으면 버튼을 누르지 못하도록 한다.
    setSearchMember('') // 검색어 초기화
    getMemberlist() // 멤버리스트 불러오는 함수 호출
    getUserlist() // 유저리스트 불러오는 함수 호출
  }, [open]) // open상태가 변할 때마다 반복

  const saveMemberList = () => {
    // 멤버리스트 생성 버튼 누르면 호출하는 함수
    if (submitable) {
      addMemberlist()
    }
  }

  const handleOpen = () => {
    // 모달 열기
    setOpen(true)
  }

  const handleClose = () => {
    // 모달 닫기
    setMemberList([])
    setSubmitable(false)
    setOpen(false)
  }

  const onChangeCheck = e => {
    // 체크한 데이터만 골라서 userId만 서버에 보낸다.
    setSubmitable(false) // 체크를 하면 일단 제출 불가능 상태로 만든다.
    const values = e.map(index =>
      rows.reduce((acc, row) => {
        if (row.id === index) {
          acc = acc.concat(row.userId)
        }
        return acc
      }, ''),
    )
    setMemberList([...values])
  }

  const onChangeSearchMember = e => {
    // 멤버 검색창
    const search = e.target.value
    setSearchMember(search)
  }

  const findByName = () => {
    // 검색어 입력 후 이벤트
    dispatch(findUserByName(searchMember))
      .then(data => {
        setRows(userlistReducer(data))
        setSearchMember('')
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const preMemberlist = [] // 서버에 있는 유저데이터와 코스의 멤버리스트 데이터 비교해서 겹치는 것을 추린 배열

  const selectionModel =
    // 서버에 있는 유저데이터와 코스의 멤버리스트 데이터 비교해서 겹치는 것을 추린다.
    useMemo(
      () =>
        rows.reduce((accu, row) => {
          const value = reduxmemberList.reduce((acc, member) => {
            if (member.userId === row.userId) {
              acc += row.id
              preMemberlist.push(row.userId)
            }
            return acc
          }, '')
          setMemberList(preMemberlist)
          return value !== '' ? [...accu, +value] : [...accu]
        }, []),
      [rows],
    )

  const body = ( // 모달에 들어갈 내용
    <div style={modalStyle} className={classes.paper}>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="수강생 이름을 입력해주세요."
            value={searchMember}
            onChange={onChangeSearchMember}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: '30vh', width: '100%' }}>
        {rows.length !== 0 ? (
          <DataGrid
            rows={rows}
            columns={columns.map(column => ({
              ...column,
              sortable: false,
            }))}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={e => {
              console.log(reduxmemberList)
              console.log(selectionModel)
              onChangeCheck(e)
            }}
            disableSelectionOnClick
          />
        ) : (
          <div>로딩 중..</div>
        )}
      </div>
      {submitable === true ? (
        <button type="submit" onClick={saveMemberList} className="btn btn-success">
          멤버 등록
        </button>
      ) : (
        <div>수강생을 추가해주세요.</div>
      )}
    </div>
  )

  return (
    <StyledAddmemberModal>
      <div>
        <div className="plusdiv">
          <button type="button" className="plusbutton" onClick={handleOpen}>
            <FiPlusSquare className="plus" />
          </button>
          <p className="plustext">학생명단을 등록 및 수정하려면 버튼을 눌러주세요.</p>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
      </div>
    </StyledAddmemberModal>
  )
}
