import { FiMinusSquare, FiCheckSquare } from 'react-icons/fi'
import { BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import StyledMember from './style'
import PropTypes from 'prop-types'

const Member = ({ member, removeMember }) => {
  Member.propTypes = {
    member: PropTypes.objectOf(PropTypes.shape).isRequired,
    removeMember: PropTypes.func.isRequired,
  }

  const handleMinus = () => {
    removeMember(member.id)
  }

  return (
    <StyledMember>
      <div className="add">
        <p id="userId" className="submitted_id">
          {member.studentId}
        </p>
        <p id="userId" className="submitted_id">
          {member.name}
        </p>
        <button type="button">
          <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
        </button>
      </div>
    </StyledMember>
  )
}

export default React.memo(Member)
