import { FiMinusSquare, FiCheckSquare, FiPenTool } from 'react-icons/fi'
import { BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledMember from './style'

function Member() {
  const [member, setMember] = useState({
    memberId: '',
    memberName: '',
  })
  const [submit, setSubmit] = useState(false)
  const [plus, setPlus] = useState(false)
  const [minus, setMinus] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setMember({
      ...member,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    if (!submit) {
      if (member.memberId === '' || member.memberName === '') {
        setSubmit(false)
      } else setSubmit(true)
    } else {
      setSubmit(false)
    }
  }

  const handleMinus = e => {
    if (!minus) setMinus(true)
  }

  return (
    <StyledMember>
      {!minus ? (
        !submit ? (
          <div className="add">
            <input
              type="text"
              onChange={handleChange}
              name="memberId"
              className="id"
              value={member.memberId}
              placeholder="학번"
            />
            <input
              type="text"
              onChange={handleChange}
              name="memberName"
              className="name"
              value={member.memberName}
              placeholder="이름"
            />
            <button type="button">
              <FiCheckSquare className="check" onClick={handleSubmit}></FiCheckSquare>
              <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
            </button>
          </div>
        ) : (
          <div className="add">
            <p id="memberId" className="submitted_id">
              {member.memberId}
            </p>
            <p id="userName" className="submitted_name">
              {member.memberName}
            </p>
            <button type="button">
              <BsPencilSquare className="modify" onClick={handleSubmit}></BsPencilSquare>
              <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
            </button>
          </div>
        )
      ) : (
        ``
      )}
    </StyledMember>
  )
}

export default Member
