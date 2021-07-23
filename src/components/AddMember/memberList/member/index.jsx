import { FiMinusSquare, FiCheckSquare } from 'react-icons/fi'
import { BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledMember from './style'
import PropTypes from 'prop-types'

const Member = ({ id, mem }) => {
  Member.propTypes = {
    id: PropTypes.func.isRequired,
    mem: PropTypes.func.isRequired,
  }
  const [member, setMember] = useState({
    userId: '',
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
      if (member.userId === '') {
        setSubmit(false)
      } else {
        setSubmit(true)
        mem(member)
      }
    } else {
      setSubmit(false)
    }
  }

  const handleMinus = e => {
    if (!minus) {
      id(id)
      setMember(``)
      setMinus(true)
    }
  }

  return (
    <StyledMember>
      {!minus ? (
        !submit ? (
          <div className="add">
            <input
              type="text"
              onChange={handleChange}
              name="userId"
              className="id"
              value={member.userId}
              placeholder="학생의 아이디"
            />
            <button type="button">
              <FiCheckSquare className="check" onClick={handleSubmit}></FiCheckSquare>
              <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
            </button>
          </div>
        ) : (
          <div className="add">
            <p id="userId" className="submitted_id">
              {member.userId}
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
