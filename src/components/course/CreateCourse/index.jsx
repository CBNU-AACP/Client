/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createCourse } from '../../../actions/courses'
import StyledCrCourse from './style'

import { GoBook, GoKeyboard } from 'react-icons/go'
import { AiFillCheckCircle } from 'react-icons/ai'

const AddCourse = () => {
  const initialCourseState = {
    id: null,
    name: '',
    description: '',
  }
  const [course, setCourse] = useState(initialCourseState)
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { name, value } = event.target
    setCourse({ ...course, [name]: value })
  }

  const saveCourse = () => {
    const { name, description } = course
    dispatch(createCourse(name, description))
      .then(data => {
        setCourse({
          id: data.id,
          name: data.name,
          description: data.description,
        })
        setSubmitted(true)

        console.log(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const newCourse = () => {
    setCourse(initialCourseState)
    setSubmitted(false)
  }

  return (
    <StyledCrCourse>
      <div className="container">
        {submitted ? (
          <div>
            <h4>성공적으로 등록되었습니다!</h4>
            <button type="submit" className="" onClick={newCourse}>
              추가등록
            </button>
          </div>
        ) : (
          <div className="formGroup">
            <div className="form">
              <div className="icons">
                <GoBook className="icon" />
                <label htmlFor="name" className="label">
                  강좌이름
                </label>
              </div>

              <input
                type="text"
                className=""
                id="name"
                required
                value={course.name}
                placeholder="강좌이름을 입력해주세요."
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form">
              <div className="icons">
                <GoKeyboard className="icon" />
                <label htmlFor="description" className="label">
                  강좌설명
                </label>
              </div>
              <input
                type="text"
                className=""
                id="description"
                required
                value={course.description}
                placeholder="강좌설명을 입력해주세요."
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <button type="submit" onClick={saveCourse} className="submit">
              <AiFillCheckCircle className="icon" />
              <p className="label">강좌등록</p>
            </button>
          </div>
        )}
      </div>
    </StyledCrCourse>
  )
}

export default React.memo(AddCourse)
