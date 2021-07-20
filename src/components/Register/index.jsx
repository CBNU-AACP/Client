/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StyedRegister from './style'
import { Button, Checkbox, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './yup'
import FormErrorMessage from './FormErrorMessage'

import { register } from '../../actions/auth'

function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  // const initialCourseState = {
  //   userId: '',
  //   userName: '',
  //   email: '',
  //   passWord: '',
  // }
  // const [Register, setRegister] = useState(initialCourseState)

  // const handleInputChange = event => {
  //   const { name, value } = event.target
  //   setRegister({ ...Register, [name]: value })
  // }

  // const form = useRef()
  // const checkBtn = useRef()

  // const [userId, setUserId] = useState('')
  // const [userName, setUserName] = useState('')
  // const [email, setEmail] = useState('')
  // const [passWord, setPassWord] = useState('')
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector(state => state.message)
  const dispatch = useDispatch()

  // const onChangeUserid = e => {
  //   const userid = e.target.value
  //   setUserId(userid)
  //   console.log(userId)
  // }

  // const onChangeUsername = e => {
  //   const username = e.target.value
  //   setUserName(username)
  // }

  // const onChangeEmail = e => {
  //   const email = e.target.value
  //   setEmail(email)
  // }

  // const onChangePassword = e => {
  //   const password = e.target.value
  //   setPassWord(password)
  // }

  const handleRegister = data => {
    setSuccessful(false)
    // const { userId, userName, email, passWord } = Register
    console.log(data.userId, data.userName, data.email, data.passWord)
    dispatch(register(data.userId, data.userName, data.email, data.passWord))
      .then(() => {
        setSuccessful(true)
      })
      .catch((e) => {
        console.log(e)
        setSuccessful(false)
      })
  }

  return (
    <StyedRegister onFinish={handleSubmit(handleRegister)} size="large">
      {!successful && (
        <div className="register">
          <div className="element">
            <label htmlFor="userId">아이디</label>
            <Controller
              name="userId"
              control={control}
              placeholder="아이디를 입력해주세요."
              // value={Register.userId}

              render={({ field }) => (
                <Input
                  type="text"
                  // onChange={onChangeUserid}
                  {...field}
                />
              )}
            />
            {errors.userId && <FormErrorMessage className="error" Message={errors.userId.message} />}
          </div>
          <div className="element">
            <label htmlFor="userName">이름</label>
            <Controller
              name="userName"
              control={control}
              placeholder="이름을 정확하게 입력해주세요."
              // value={Register.userName}
              // onChange={onChangeUsername}
              render={({ field }) => <Input type="text" {...field} />}
            />
            {errors.userName && <FormErrorMessage className="error" Message={errors.userName.message} />}
            <div className="element">
              <label htmlFor="email">이메일</label>
              <Controller
                name="email"
                control={control}
                placeholder="이메일을 입력해주세요."
                // value={Register.email}
                // onChange={onChangeEmail}
                render={({ field }) => <Input type="text" {...field} />}
              />
              {errors.email && <FormErrorMessage className="error" Message={errors.email.message} />}
            </div>
          </div>
          <div className="element">
            <label htmlFor="passWord">비밀번호</label>
            <Controller
              name="passWord"
              control={control}
              placeholder="비밀번호를 입력해주세요."
              // value={Register.passWord}
              // onChange={onChangePassword}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.passWord && <FormErrorMessage className="error" Message={errors.passWord.message} />}
          </div>
          <div className="element">
            <label htmlFor="passWord2">비밀번호 확인</label>
            <Controller
              name="passWord2"
              control={control}
              placeholder="비밀번호를 확인해주세요."
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.passWord2 && <FormErrorMessage className="error" Message={errors.passWord2.message} />}
          </div>
          <div className="element">
            <Controller
              name="term"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox id="term" onChange={e => onChange(e.target.checked)} checked={value}>
                  회원님의 개인정보가 활용됩니다.
                </Checkbox>
              )}
            />
            {errors.term && <FormErrorMessage className="error" Message={errors.term.message} />}
          </div>
          <div>
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </div>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
            {message}
          </div>
        </div>
      )}
    </StyedRegister>
  )
}

export default RegisterForm
