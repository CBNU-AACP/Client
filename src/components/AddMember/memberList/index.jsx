import { FiPlusSquare } from 'react-icons/fi'
import axios from 'axios'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import StyledAddMember from './style'
import Member from './member'
import PropTypes from 'prop-types'

function MemberList({ memberdata }) {
  MemberList.propTypes = {
    memberdata: PropTypes.func.isRequired,
  }

  const [memberList, setMemberList] = useState([])
  const nextId = useRef(0)

  useEffect(() => {
    console.log(memberList)
  }, [memberList])

  const addMember = () => {
    setMemberList([...memberList, { id: nextId.current, userId: '' }])
    nextId.current += 1
  }

  const updateMember = member => {
    const target = memberList.find(m => m.id === member.id)
    target.userId = member.userId
    setMemberList([...memberList])
  }

  const removeMember = remove => {
    console.log(remove)
    setMemberList(memberList.filter(member => member.id !== remove))
  }

  return (
    <StyledAddMember>
      <div className="plusdiv">
        <button type="button" className="plusbutton" onClick={addMember}>
          <FiPlusSquare className="plus"></FiPlusSquare>
        </button>
        <p className="plustext">학생을 추가하려면 버튼을 눌러주세요.</p>
      </div>

      <div className="member">
        {memberList.map(member => (
          <Member key={member.id} member={member} updateMember={updateMember} removeMember={removeMember} />
        ))}
      </div>
    </StyledAddMember>
  )
}

export default React.memo(MemberList)
