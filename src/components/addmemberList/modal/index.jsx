/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { DataGrid } from '@material-ui/data-grid'
import { FiPlusSquare } from 'react-icons/fi'
import PropTypes from 'prop-types'
import StyledAddmemberModal from './style'

import { createMemberlist, findMemberByName } from '../../../actions/memberlist'

function rand() {
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
    height: '40vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const columns = [
  {
    field: 'studentId',
    headerName: '학번',
    // width: '20rem',
  },
  {
    field: 'userName',
    headerName: '이름',
    // width: '20rem',
  },
  {
    field: 'userId',
    headerName: '학생 ID',
    // width: '20rem',
  },
]

const rows = [
  { id: 1, studentId: '2017038064', userName: '김동용', userId: 'test1' },
  { id: 2, studentId: '2019038044', userName: '신주영', userId: 'test4' },
  { id: 3, studentId: '2017038063', userName: '박성진', userId: 'test2' },
  { id: 4, studentId: '2017038069', userName: '이동우', userId: 'test3' },
  { id: 5, studentId: '2017038064', userName: '차재현', userId: 'test5' },
  { id: 6, studentId: '2017038064', userName: '몰라유', userId: 'tes6' },
  { id: 7, studentId: '2017038064', userName: '몰라', userId: 'test7' },
  { id: 8, studentId: '2017038064', userName: '피자', userId: 'test8' },
  { id: 9, studentId: '2017038064', userName: '치킨', userId: 'test9' },
]

export default function AddmemberModal({ courseId }) {
  AddmemberModal.propTypes = {
    courseId: PropTypes.func.isRequired,
  }

  const [memberList, setMemberList] = useState([])

  useEffect(() => {
    console.log(memberList)
  }, [memberList])

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

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
    setOpen(true)
  }

  const handleClose = () => {
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

  const body = (
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
