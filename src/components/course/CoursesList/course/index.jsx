/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCourse, deleteCourse } from '../../../../actions/courses'
import CourseDataService from '../../../../services/CourseService'

const Course = props => {
  Course.propTypes = {
    history: PropTypes.shape.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }),
  }
  const initialCourseState = {
    id: null,
    title: '',
    description: '',
    published: false,
  }
  const [currentCourse, setCurrentCourse] = useState(initialCourseState)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const getCourse = id => {
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getCourse(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentCourse({ ...currentCourse, [name]: value })
  }

  const updateStatus = status => {
    const data = {
      id: currentCourse.id,
      title: currentCourse.title,
      description: currentCourse.description,
      published: status,
    }

    dispatch(updateCourse(currentCourse.id, data))
      .then(response => {
        console.log(response)

        setCurrentCourse({ ...currentCourse, published: status })
        setMessage('상태가 성공적으로 업데이트되었습니다!')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const updateContent = () => {
    dispatch(updateCourse(currentCourse.id, currentCourse))
      .then(response => {
        console.log(response)

        setMessage('강좌가 성공적으로 업데이트되었습니다!')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const removeCourse = () => {
    dispatch(deleteCourse(currentCourse.id))
      .then(() => {
        props.history.push('/courses')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      {currentCourse ? (
        <div className="edit-form">
          <h4>강좌</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">강좌명</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCourse.title}
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

            <div className="form-group">
              <label>
                <strong>상태:</strong>
              </label>
              {currentCourse.published ? 'Published' : 'Pending'}
            </div>
          </form>

          {currentCourse.published ? (
            <button type="button" className="badge badge-primary mr-2" onClick={() => updateStatus(false)}>
              UnPublish
            </button>
          ) : (
            <button type="button" className="badge badge-primary mr-2" onClick={() => updateStatus(true)}>
              Publish
            </button>
          )}

          <button type="button" className="badge badge-danger mr-2" onClick={removeCourse}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updateContent}>
            Update
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

export default Course
