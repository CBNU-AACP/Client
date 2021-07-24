/* eslint-disable prefer-const */
import { FiPlusSquare } from 'react-icons/fi'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import StyledAddMember from './style'
import Member from './member'
import PropTypes from 'prop-types'

const users = []
function MemberList({ memberdata }) {
  MemberList.propTypes = {
    memberdata: PropTypes.func.isRequired,
  }
  const [member, setMember] = useState([])
  //   const [add, setAdd] = useState({
  //     members: [`${userId}`],
  //   })

  const [add, setAdd] = useState(users)
  const [minus, setMinus] = useState(0)

  const updateMinus = data => {
    if (data) {
      console.log(data)
      if (data.userId === '') {
        console.log(add)
      } else {
        const idx = users.indexOf(data.userId)
        users.splice(idx, 1)
        setAdd(users)
        memberdata(add)
        console.log(add)
      }
    }
    setMinus(minus + 1)
  }
  const updateMember = data => {
    users.push(data.userId)
    setAdd(users)
    memberdata(add)
    console.log(add)
  }

  const Update = (data) => {
    console.log(data)
    const idx = users.indexOf(data.userId)
    users.splice(idx, 1, data.userId)
    setAdd(users)
    console.log(add)
  }

  const addmember = () => {
    setMember([...member, <Member id={updateMinus} mem={updateMember} update={Update}></Member>])
  }

  const ad = () => {
    console.log(add)
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
