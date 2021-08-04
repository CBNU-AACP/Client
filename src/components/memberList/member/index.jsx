import { FiMinusSquare, FiCheckSquare } from 'react-icons/fi'
import { BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import StyledMember from './style'
import PropTypes from 'prop-types'

const Member = ({ member, updateMember, removeMember }) => {
  Member.propTypes = {
    member: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
  }

  const [userId, setUserId] = useState(member.userId)
  const [editMode, setEditMode] = useState(true)

  const handleChange = e => {
    setUserId(e.target.value)
  }

  const handleSubmit = e => {
    updateMember({
      ...member,
      userId,
    })
    setEditMode(false)
  }

  const handleMinus = () => {
    removeMember(member.id)
  }

  const activeEditMode = () => {
    setEditMode(true)
  }

  return (
    <StyledMember>
      {editMode ? (
        <div className="add">
          <input
            type="text"
            onChange={handleChange}
            name="userId"
            className="id"
            value={userId}
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
            {userId}
          </p>
          <button type="button">
            <BsPencilSquare className="modify" onClick={activeEditMode}></BsPencilSquare>
            <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
          </button>
        </div>
      )}
    </StyledMember>
  )
}

export default React.memo(Member)
