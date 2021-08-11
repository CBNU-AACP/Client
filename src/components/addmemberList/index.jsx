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

  // const stateId = () => { // 현재 강좌가 일치하는 멤버리스트 데이터가 있는지 찾는 함수
  //   console.log(courseList)
  //   for (let i = 0; i < courseList.length; i += 1) {
  //     console.log(currentCourse.courseId, courseList[i].courseId)
  //     if (currentCourse.courseId === courseList[i].courseId) return i
  //   }
  //   return -1
  // }

  // const list = useSelector(state => state.memberlist[stateId()]) // 일치하는 멤버리스트 찾아서 변수로 넣어줌
  // const mockList = [] // 없으면 빈 배열로 대신한다.

  // function listdataGenerator(items) { // 일치하는 강좌의 멤버리스트의 members 배열에게 key, value로 reduce
  //   return items.map((userId, id) => {
  //     if (userId !== '') nextId.current += 1
  //     return [
  //       {
  //         id,
  //         userId,
  //       },
  //     ]
  //   }, [])
  // }

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

  // const saveMemberList = () => {
  //   // 멤버리스트 생성 버튼 누르면 호출하는 함수
  //   const members = memberList.reduce((acc, obj) => {
  //     acc.push(obj.userId)
  //     return acc
  //   }, [])
  //   dispatch(createMemberlist(members, currentCourse.courseId))
  //     .then(data => {
  //       setMemberData({
  //         memberlist: data,
  //       })
  //       console.log(data)
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  // }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    // 멤버리스트 배열과 nextId값이 바뀌면 실행
    console.log(memberList)
    console.log(nextId)
  }, [memberList, nextId])

  // useEffect(() => { // 최초 이 페이지에 들어왔을 때, 현재 강좌의 id가 바뀌면 실행, +, - 할 때마다 실행됨 최적화 필요
  //   if (currentCourse.courseId != null) {
  //     console.log(currentCourse)
  //     console.log(stateId())
  //     console.log(list)
  //     if (stateId() !== -1) setMemberList(listdataGenerator(list.members))
  //     else setMemberList(listdataGenerator(mockList))
  //   }
  // }, [currentCourse.courseId])

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
      {currentCourse.courseId !== null ? (
        <div>
          <div>
            <p>강좌id: {currentCourse.courseId}</p>
            <p>강좌명: {currentCourse.name}</p>
            <p>설명: {currentCourse.description}</p>
          </div>
          {/* <div className="plusdiv">
          <button type="button" className="plusbutton" onClick={addMember}>
            <FiPlusSquare className="plus"></FiPlusSquare>
          </button>
          <p className="plustext">학생을 추가하려면 버튼을 눌러주세요.</p>
        </div> */}
          <AddmemberModal courseId={currentCourse.courseId} />
          <div className="member">
            {memberList.map(member => (
              <Member key={member.id} member={member} updateMember={updateMember} removeMember={removeMember} />
            ))}
          </div>

          {/* <button type="submit" onClick={saveMemberList} className="btn btn-success">
          멤버 등록
        </button> */}
        </div>
      ) : (
        <div>로딩 중..</div>
      )}
    </StyledAddMember>
  )
}

export default React.memo(withRouter(MemberList))
