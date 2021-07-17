/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { retrieveCourses, findCoursesByTitle, deleteAllCourses } from '../../../actions/courses'

const CoursesList = () => {
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')

  const courses = useSelector(state => state.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveCourses())
  }, [])

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
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

  const findByTitle = () => {
    refreshData()
    dispatch(findCoursesByTitle(searchTitle))
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="강좌명으로 강좌 찾기"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
              검색
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
                {course.title}
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
              {currentCourse.title}
            </div>
            <div>
              <label>
                <strong>설명:</strong>
              </label>{' '}
              {currentCourse.description}
            </div>
            <div>
              <label>
                <strong>상태:</strong>
              </label>{' '}
              {currentCourse.published ? 'Published' : 'Pending'}
            </div>

            <Link to={`/courses/${currentCourse.id}`} className="badge badge-warning">
              편집
            </Link>
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
