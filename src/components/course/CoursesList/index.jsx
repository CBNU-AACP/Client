/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Link, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { HiOutlineTrash } from 'react-icons/hi'
import { CgList } from 'react-icons/cg'
import { RiCamera2Line, RiContactsBook2Fill } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { BsPeopleFill } from 'react-icons/bs'
import PropTypes from 'prop-types'

import { retrieveCourses, findCoursesByName, deleteAllCourses } from '../../../actions/courses'

import StyledCoursesList from './style'

const CoursesList = ({ cookies }) => {
  CoursesList.propTypes = {
    cookies: PropTypes.objectOf(PropTypes.shape),
  }
  const { userId } = cookies
  const { url } = useRouteMatch()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState('')

  const courses = useSelector(state => state.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(userId)
    dispatch(retrieveCourses(userId))
  }, [])

  const onChangeSearchName = e => {
    const search = e.target.value
    setSearchName(search)
  }

  const refreshData = () => {
    setCurrentCourse(null)
    setCurrentIndex(-1)
  }

  const setActiveCourse = (course, index) => {
    setCurrentCourse(course)
    setCurrentIndex(index)
  }

  const removeAllCourses = () => {
    dispatch(deleteAllCourses(userId))
      .then(response => {
        console.log(response)
        refreshData()
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findByName = () => {
    refreshData()
    dispatch(findCoursesByName(searchName, userId))
  }

  return (
    <StyledCoursesList>
      {userId && userId !== 'undefined' ? (
        <div className="container">
          <div className="searchset">
            <input
              type="text"
              className="searchtext"
              placeholder="강좌이름으로 강좌 찾기"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="search">
              <button className="" type="button" onClick={findByName}>
                <FaSearch className="icon" />
              </button>
            </div>
          </div>

          <div className="set">
            <div className="left">
              <div className="courseTitle">
                <CgList className="icon" />
                <p className="listtitle">강좌목록</p>
              </div>
              <ul className="list">
                {courses &&
                  courses.map((course, index) => (
                    <li
                      className={`item ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setActiveCourse(course, index)}
                      key={index}>
                      <span className="liText">{course.name}</span>
                    </li>
                  ))}
              </ul>
              <button type="button" className="delete" onClick={removeAllCourses}>
                <HiOutlineTrash />
                <p className="deleteText">모두삭제</p>
              </button>
            </div>

            <div className="right">
              {currentCourse ? (
                currentCourse.courseId !== null ? (
                  <div className="courseData">
                    <div className="course">
                      <label>
                        <strong>강좌이름:</strong>
                      </label>
                      {` ${currentCourse.name}`}
                    </div>
                    <div className="course">
                      <label>
                        <strong>강좌설명:</strong>
                      </label>
                      {` ${currentCourse.description}`}
                    </div>

                    <div className="iconlist">
                      <Link to={`${url}/${currentCourse.courseId}/qrscan`} className="icons">
                        <RiCamera2Line className="icon" />
                        <p className="text">출석체크</p>
                      </Link>

                      <Link to={`${url}/${currentCourse.courseId}/attendance`} className="icons">
                        <RiContactsBook2Fill className="icon" />
                        <p className="text">출석부</p>
                      </Link>

                      <Link to={`${url}/${currentCourse.courseId}`} className="icons">
                        <FiEdit className="icon" />
                        <p className="text">강좌편집</p>
                      </Link>

                      <Link to={`${url}/${currentCourse.courseId}/member`} className="icons">
                        <BsPeopleFill className="icon" />
                        <p className="text">멤버등록</p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="courseData">
                    <p>로딩 중...</p>
                  </div>
                )
              ) : (
                <div className="courseData">
                  <p>강좌를 선택해주세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </StyledCoursesList>
  )
}

export default CoursesList
