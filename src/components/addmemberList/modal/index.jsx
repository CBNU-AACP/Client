/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { DataGrid } from '@material-ui/data-grid'
import { FiPlusSquare } from 'react-icons/fi'
import PropTypes from 'prop-types'
import StyledAddmemberModal from './style'

import { createMemberlist, findMemberByName } from '../../../actions/memberlist'
import { retrieveUsers, findUserByName } from '../../../actions/userlist'
import UserService from '../../../services/UserService'

function rand() {
  // 여기서부터 modal style
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80vw',
    max_width: '100%',
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

export default function AddmemberModal({ courseId }) {
  AddmemberModal.propTypes = {
    courseId: PropTypes.string.isRequired,
  }

  const [rows, setRows] = useState([]) // 서버로부터 모든 유저들의 정보를 담을 상태변수
  const [memberList, setMemberList] = useState([]) // 멤버리스트 서버에 보낸 후 모달 밖의 컴포넌트에 보낼 멤버리스트 id배열

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  useEffect(() => { // 체크박스에서 체크해서 멤버리스트 구성
    console.log(memberList, courseId)
  }, [memberList])

  useEffect(() => {
    console.log(rows)
  }, [rows])

  // const userlist = useSelector(state => state.userlist[0]) // userlist 목록 가져온다.

  const userlistReducer = users => users.reduce((acc, cur, index) => [...acc, { id: index, ...cur }], []) // id 넘버를 포함한 객체 배열 반환

  useEffect(() => {
    const userList = () => {
      // 유저리스트 불러오는 함수
      dispatch(retrieveUsers())
        .then(data => {
          setRows(userlistReducer(data))
        })
        .catch(e => {
          console.log(e)
        })
    }
    userList()
  }, [open]) // open상태가 변할 때마다 반복

  const [pageSize, setPageSize] = useState(10)
  const [searchMember, setSearchMember] = useState('')

  const dispatch = useDispatch()

  const saveMemberList = () => {
    // 멤버리스트 생성 버튼 누르면 호출하는 함수
    dispatch(createMemberlist(memberList, courseId))
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleOpen = () => {
    // 모달 열기
    setOpen(true)
  }

  const handleClose = () => {
    // 모달 닫기
    setOpen(false)
  }

  const onChangeCheck = e => {
    // 체크한 데이터만 골라서 userId만 서버에 보낸다.
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
    dispatch(findMemberByName(searchMember))
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

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
              검색
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: '30vh', width: '100%' }}>
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
          onSelectionModelChange={e => {
            onChangeCheck(e)
          }}
          disableSelectionOnClick
        />
      </div>
      <button type="submit" onClick={saveMemberList} className="btn btn-success">
        멤버 등록
      </button>
    </div>
  )

  return (
    <StyledAddmemberModal>
      <div>
        <div className="plusdiv">
          <button type="button" className="plusbutton" onClick={handleOpen}>
            <FiPlusSquare className="plus" />
          </button>
          <p className="plustext">학생을 추가하려면 버튼을 눌러주세요.</p>
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
