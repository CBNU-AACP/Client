/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCourse, deleteCourse } from '../../../../actions/courses'
import CourseDataService from '../../../../services/CourseService'

const Course = props => {
  Course.propTypes = {
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
    id: null,
    name: '',
    description: '',
  }
  const [currentCourse, setCurrentCourse] = useState(initialCourseState)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

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

  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  useEffect(() => {
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentCourse({ ...currentCourse, [name]: value })
  }

  const updateContent = () => {
    dispatch(updateCourse(currentCourse.courseId, currentCourse))
      .then(response => {
        console.log(response)

        setMessage('강좌가 성공적으로 업데이트되었습니다!')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const removeCourse = () => {
    dispatch(deleteCourse(currentCourse.courseId))
      .then(() => {
        props.history.push('/Course')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      {currentCourse ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">강좌명</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCourse.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">설명</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCourse.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button type="button" className="" onClick={removeCourse}>
            삭제
          </button>

          <button type="submit" className="" onClick={updateContent}>
            수정
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>강좌를 클릭해주세요.</p>
        </div>
      )}
    </div>
  )
}

export default withRouter(Course)
