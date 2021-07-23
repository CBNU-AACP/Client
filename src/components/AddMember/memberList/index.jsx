import { FiPlusSquare } from 'react-icons/fi'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledAddMember from './style'
import Member from './member'

function MemberList() {
  const [member, setMember] = useState([])
  const [userId, setUserId] = useState('')
  //   const [add, setAdd] = useState({
  //     members: [`${userId}`],
  //   })
  const [add, setAdd] = useState([])
  const [id, setId] = useState(0)
  const [test, setTest] = useState('')

  const updateId = data => {
    if (data) {
    }
    setId(id + 1)
  }
  const updateMember = data => {
    console.log(data.userId)
    setAdd({ members: [...userId, data.userId] })
    // setAdd([...add,data.userId])
    setTest(data.userId)
    console.log(add)
    console.log(test)
  }

  const addmember = () => {
    setMember([...member, <Member id={updateId} mem={updateMember}></Member>])
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

export default MemberList
