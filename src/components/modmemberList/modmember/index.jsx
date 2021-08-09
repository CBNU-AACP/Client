import { FiMinusSquare, FiCheckSquare } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import React, { useState, useEffect, useCallback } from 'react'
import StyledMember from './style'
import PropTypes from 'prop-types'

const modMember = ({ member, removeMember }) => {
  modMember.propTypes = {
    member: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
  }

  const userId = member.userId

  const handleMinus = () => {
    removeMember(member.id)
  }

  return (
    <StyledMember>
      <div className="add">
        <p id="userId" className="submitted_id">
          {userId}
        </p>
        <button type="button">
          <FiMinusSquare className="minus" onClick={handleMinus}></FiMinusSquare>
        </button>
      </div>
    </StyledMember>
  )
}

export default React.memo(modMember)
