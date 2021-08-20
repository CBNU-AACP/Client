/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import { retrieveCourses, findCoursesByName, deleteAllCourses } from '../../../actions/courses'
import Course from './course'
import MemberList from '../../addmemberList'
import QrScanner from '../../QrScanner'

const CoursesList = () => {
  const { url } = useRouteMatch()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState('')

  const courses = useSelector(state => state.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveCourses())
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
    dispatch(deleteAllCourses())
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
    dispatch(findCoursesByName(searchName))
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="강좌명으로 강좌 찾기"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>강좌 목록</h4>

        <ul className="list-group">
          {courses &&
            courses.map((course, index) => (
              <li
                className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setActiveCourse(course, index)}
                key={index}>
                {course.name}
              </li>
            ))}
        </ul>

        <button type="button" className="m-3 btn btn-sm btn-danger" onClick={removeAllCourses}>
          모두 삭제
        </button>
      </div>
      <div className="col-md-6">
        {currentCourse ? (
          <div>
            <div>
              <label>
                <strong>강좌명:</strong>
              </label>{' '}
              {currentCourse.name}
            </div>
            <div>
              <label>
                <strong>설명:</strong>
              </label>{' '}
              {currentCourse.description}
            </div>

            <div>
              <Link to={`${url}/${currentCourse.courseId}/qrscan`} className="badge-warning">
                출석체크
              </Link>

              <Link to={`${url}/${currentCourse.courseId}`} className="badge-warning">
                강좌 편집
              </Link>

              <Link to={`${url}/${currentCourse.courseId}/member`} className="badge-warning">
                멤버 등록
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>강좌를 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesList
