import { FiPlusSquare } from 'react-icons/fi'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledAddMember from './style'
import Member from './memberList/member'

function AddMember() {
  const [member, setMember] = useState([])
  const addmember = () => {
    setMember([...member, <Member></Member>])
  }
  return (
    <StyledAddMember>
      <div className="plusdiv">
        <button type="button" className="plusbutton" onClick={addmember}>
          <FiPlusSquare className="plus"></FiPlusSquare>
        </button>
        <p className="plustext">학생을 추가하려면 버튼을 눌러주세요.</p>
      </div>

      <div className="member">{member}</div>
    </StyledAddMember>
  )
}

export default AddMember
