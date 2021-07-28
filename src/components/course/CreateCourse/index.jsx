/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createCourse } from '../../../actions/courses'
import MemberList from '../../memberList'

const AddCourse = () => {
  const initialCourseState = {
    id: null,
    name: '',
    description: '',
  }
  const [course, setCourse] = useState(initialCourseState)
  const [memberdata, setMemberdata] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(memberdata)
  }, [memberdata])

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

        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const updateMember = data => {
    setMemberdata(
      data.reduce((acc, obj) => {
        acc.push(obj.userId)
        return acc
      }, []),
    )
  }

  const newCourse = () => {
    setCourse(initialCourseState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>성공적으로 등록되었습니다!</h4>
          <button type="submit" className="btn btn-success" onClick={newCourse}>
            추가등록
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">강좌명</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={course.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={course.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <br />
          <MemberList memberdata={updateMember}></MemberList>

          <br />
          <button type="submit" onClick={saveCourse} className="btn btn-success">
            등록
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(AddCourse)
