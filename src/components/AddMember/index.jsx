import { FiPlusSquare } from 'react-icons/fi'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledAddMember from './style'
import MemberList from './memberList'

function AddMember() {
  const [member, setMember] = useState([])

  return (
    <StyledAddMember>
      <MemberList></MemberList>
    </StyledAddMember>
  )
}

export default AddMember
