/* eslint-disable react/destructuring-assignment */
import { FiPlusSquare } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import StyledAddMember from './style'
import PropTypes from 'prop-types'

import CourseDataService from '../../services/CourseService'
import Member from './member'
import { createMemberlist } from '../../actions/memberlist'

function MemberList(props) {
  MemberList.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  }
  const initialCourseState = {
    courseId: null,
    name: '',
    description: '',
  }

  const [currentCourse, setCurrentCourse] = useState(initialCourseState)
  const [memberList, setMemberList] = useState([])
  const [memberData, setMemberData] = useState([])
  const nextId = useRef(0)

  const dispatch = useDispatch()

  // const list = useSelector(state => state.memberlist)
  const list = ['1', '2', '3']
  // list.reduce((acc, cur) => cur, { id: nextId.current, userId: cur })

  const getCourse = id => {
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
        console.log(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  function listdataGenerator(items) {
    let index = 0
    return function getNextData() {
      const item = items[index % items.length]
      index += 1
      return { id: index, userId: item }
    }
  }

  const saveMemberList = () => {
    const members = memberList.reduce((acc, obj) => {
      acc.push(obj.userId)
      return acc
    }, [])
    dispatch(createMemberlist(members, currentCourse.courseId))
      .then(data => {
        setMemberData({
          memberlist: data,
        })
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    console.log(memberList)
  }, [memberList])

  useEffect(() => {
    console.log(list)
    setMemberList(listdataGenerator(list))
  }, [list])

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
      {list === '' ? (
        <div>
          <div>
            <p>강좌id: {currentCourse.courseId}</p>
            <p>강좌명: {currentCourse.name}</p>
            <p>설명: {currentCourse.description}</p>
          </div>
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

          <button type="submit" onClick={saveMemberList} className="btn btn-success">
            멤버 등록
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p>강좌id: {currentCourse.courseId}</p>
            <p>강좌명: {currentCourse.name}</p>
            <p>설명: {currentCourse.description}</p>
          </div>
          <div className="plusdiv">
            <button type="button" className="plusbutton" onClick={addMember}>
              <FiPlusSquare className="plus"></FiPlusSquare>
            </button>
            <p className="plustext">학생을 추가하려면 버튼을 눌러주세요.</p>
          </div>

          <div className="member">
            {list.map(member => (
              <Member key={member.id} member={member} updateMember={updateMember} removeMember={removeMember} />
            ))}
          </div>

          <button type="submit" onClick={saveMemberList} className="btn btn-warning">
            멤버 수정
          </button>
        </div>
      )}
    </StyledAddMember>
  )
}

export default React.memo(withRouter(MemberList))
