/* eslint-disable react/destructuring-assignment */
import { FiPlusSquare } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import StyledAddMember from './style'
import PropTypes from 'prop-types'

import CourseDataService from '../../services/CourseService'
import Member from './addmember'
import { createMemberlist } from '../../actions/memberlist'
import AddmemberModal from './modal'

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

  const [currentCourse, setCurrentCourse] = useState(initialCourseState) // 현재 강좌 정보 저장
  const [memberList, setMemberList] = useState([]) // 멤버리스트 배열 저장
  const [memberData, setMemberData] = useState([])
  const nextId = useRef(0) // 멤버리스트의 다음 id값을 저장할 변수

  const dispatch = useDispatch()

  const courseList = useSelector(state => state.memberlist)

  const getCourse = id => {
    // 현재 강좌를 찾는 함수
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
        console.log(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    // 멤버리스트 배열과 nextId값이 바뀌면 실행
    console.log(memberList)
    console.log(nextId)
  }, [memberList, nextId])

  const addMember = () => {
    setMemberList([...memberList, { id: nextId.current, userId: '' }])
    nextId.current += 1
  }

  const removeMember = remove => {
    console.log(remove)
    setMemberList(memberList.filter(member => member.id !== remove))
  }

  return (
    <StyledAddMember>
      {currentCourse.courseId !== null ? (
        <div>
          <div>
            <p>강좌id: {currentCourse.courseId}</p>
            <p>강좌명: {currentCourse.name}</p>
            <p>설명: {currentCourse.description}</p>
          </div>
          <AddmemberModal courseId={currentCourse.courseId} members={memberList} />
          <div className="member">
            {memberList.map(member => (
              <Member key={member.id} member={member} removeMember={removeMember} />
            ))}
          </div>
        </div>
      ) : (
        <div>로딩 중..</div>
      )}
    </StyledAddMember>
  )
}

export default React.memo(withRouter(MemberList))
