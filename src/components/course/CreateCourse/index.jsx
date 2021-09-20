/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'

import { addschema } from './yup'
import FormErrorMessage from '../../Register/FormErrorMessage'
import StyledCrCourse from './style'
import { createCourse } from '../../../actions/courses'

import { GoBook, GoKeyboard } from 'react-icons/go'
import { AiFillCheckCircle } from 'react-icons/ai'

const AddCourse = ({ cookies }) => {
  AddCourse.propTypes = {
    cookies: PropTypes.objectOf(PropTypes.shape),
  }
  const { userId } = cookies
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(addschema),
    mode: 'onBlur',
  })

  // const initialCourseState = {
  //   id: null,
  //   name: '',
  //   description: '',
  // }
  // const [course, setCourse] = useState(initialCourseState)
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch()

  // const handleInputChange = event => {
  //   const { name, value } = event.target
  //   setCourse({ ...course, [name]: value })
  // }

  const saveCourse = data => {
    const { name, description } = data
    console.log(data)
    dispatch(createCourse(name, description, userId))
      .then(data => {
        setSubmitted(true)
        console.log(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const newCourse = () => {
    // setCourse(initialCourseState)
    const input = document.querySelectorAll('input').value
    // const input2 = document.querySelector('description')
    // console.log(input1.value, input2.value)
    console.log(input)
    input.value = ''
    // input2.value = ''
    setSubmitted(false)
  }

  return (
    <StyledCrCourse onSubmit={handleSubmit(saveCourse)}>
      {userId && userId !== 'undefined' ? (
        <div className="container">
          {submitted ? (
            <div>
              <h4>성공적으로 등록되었습니다!</h4>
              <button type="button" className="" onClick={newCourse}>
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
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" className="input" {...field} id="name" placeholder="강좌이름을 입력해주세요." />
                  )}
                />
                {errors.name && <FormErrorMessage className="error" Message={errors.name.message} />}
              </div>

              <div className="form">
                <div className="icons">
                  <GoKeyboard className="icon" />
                  <label htmlFor="description" className="label">
                    강좌설명
                  </label>
                </div>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className="input"
                      {...field}
                      id="description"
                      placeholder="강좌설명을 입력해주세요."
                    />
                  )}
                />
                {errors.description && <FormErrorMessage className="error" Message={errors.description.message} />}
              </div>

              <button type="submit" className="submit">
                <AiFillCheckCircle className="icon" />
                <p className="label">강좌등록</p>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </StyledCrCourse>
  )
}

export default React.memo(AddCourse)
