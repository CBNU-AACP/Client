/* eslint-disable react/destructuring-assignment */
import { FiPlusSquare } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import StyledAddMember from './style'
import PropTypes from 'prop-types'

import CourseDataService from '../../services/CourseService'
import Member from './modmember'
import { createMemberlist, findMemberByName } from '../../actions/memberlist'

function modMemberList(props) {
  modMemberList.propTypes = {
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
  
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchMember, setSearchMember] = useState('')

  const nextId = useRef(0) // 멤버리스트의 다음 id값을 저장할 변수

  const dispatch = useDispatch()

  const courseList = useSelector(state => state.memberlist) // 강좌목록 찾기

  const stateId = () => { // 현재 강좌가 일치하는 멤버리스트 데이터가 있는지 찾는 함수
    console.log(courseList)
    for (let i = 0; i < courseList.length; i += 1) {
      console.log(currentCourse.courseId, courseList[i].courseId)
      if (currentCourse.courseId === courseList[i].courseId) return i
    }
    return -1
  }

  const list = useSelector(state => state.memberlist[stateId()]) // 일치하는 멤버리스트 찾아서 변수로 넣어줌
  const mockList = [] // 없으면 빈 배열로 대신한다.

  function listdataGenerator(items) { // 일치하는 강좌의 멤버리스트의 members 배열에게 key, value로 reduce
    return items.map((userId, id) => {
      if (userId !== '') nextId.current += 1
      return [
        {
          id,
          userId,
        },
      ]
    }, [])
  }

  const getCourse = id => { // 현재 강좌를 찾는 함수
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
        console.log(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => { // router의 params가 바뀌면 실행
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => { // 멤버리스트 배열과 nextId값이 바뀌면 실행
    console.log(memberList)
    console.log(nextId)
  }, [memberList, nextId])

  useEffect(() => { // 최초 이 페이지에 들어왔을 때, 현재 강좌의 id가 바뀌면 실행, +, - 할 때마다 실행됨 최적화 필요
    if (currentCourse.courseId != null) {
      console.log(currentCourse)
      console.log(stateId())
      console.log(list)
      if (stateId() !== -1) setMemberList(listdataGenerator(list.members))
      else setMemberList(listdataGenerator(mockList))
    }
  }, [currentCourse.courseId])


  const refreshData = () => {
    setCurrentCourse(null)
    setCurrentIndex(-1)
  }

  const onChangeSearchMember = e => {
    const search = e.target.value
    setSearchMember(search)
  }
  const findByName = () => {
    refreshData()
    dispatch(findMemberByName(searchMember))
  }

  const modList = () => {
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
    console.log(nextId)
  }, [memberList, nextId])

  useEffect(() => {
    console.log(stateId())
    console.log(list)
    console.log(listdataGenerator(list))
    setMemberList(listdataGenerator(list))
  }, [list])

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
      <div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="강좌명으로 강좌 찾기"
              value={searchMember}
              onChange={onChangeSearchMember}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
                검색
              </button>
            </div>
          </div>
        </div>
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
            <Member key={member.id} member={member} removeMember={removeMember} />
          ))}
        </div>

        <button type="submit" onClick={modList} className="btn btn-warning">
          멤버 수정
        </button>
      </div>
    </StyledAddMember>
  )
}

export default React.memo(withRouter(modMemberList))
