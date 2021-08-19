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

  const [visible, setVisible]= useState(false);

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

  const VerifyVisible = () => {
    setVisible(true)
  }
  const visivel= {
    visibility: visible ? 'visible' : 'hidden',
  };

  const handleRegister = data => {
    setSuccessful(false)
    const { userId, userName, studentId, email, passWord } = data
    const user = { userId, userName, studentId, email, passWord }
    console.log(user)
    dispatch(register(user))
      .then(() => {
        setSuccessful(true)
      })
      .catch(e => {
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
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="아이디를 입력해주세요."
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
              render={({ field }) => <Input type="text" {...field} placeholder="이름을 정확하게 입력해주세요."/>}
            />
            {errors.userName && <FormErrorMessage className="error" Message={errors.userName.message} />}
          </div>
          <div className="element">
            <label htmlFor="studentId">학번</label>
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => (
                <Input type="text" // onChange={onChangeUserid}
                  {...field}
                  placeholder="학번을 입력해주세요."/>
              )}
            />
            {errors.studentId && <FormErrorMessage className="error" Message={errors.studentId.message} />}
          </div>
          <div className="element">
            <label htmlFor="email">이메일</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="이메일을 입력해주세요."/>}
            />
            {errors.email && <FormErrorMessage className="error" Message={errors.email.message} />}
          </div>

          <div className="element">
            <label htmlFor="passWord">비밀번호</label>
            <Controller
              name="passWord"
              control={control}
              render={({ field }) => <Input type="password" {...field} placeholder="비밀번호를 입력해주세요."/>}
            />
            {errors.passWord && <FormErrorMessage className="error" Message={errors.passWord.message} />}
          </div>
          <div className="element">
            <label htmlFor="passWord2">비밀번호 확인</label>
            <Controller
              name="passWord2"
              control={control}
              render={({ field }) => <Input type="password" {...field} placeholder="비밀번호를 확인해주세요."/>}
            />
            {errors.passWord2 && <FormErrorMessage className="error" Message={errors.passWord2.message} />}
          </div>
          <div className="element">
            <label htmlFor="userPhoneNum">전화번호</label>
            <Controller
              name="userPhoneNum"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="전화번호를 입력해주세요."/>}
            />
            <Button type="primary" htmlType="submit" onClick={VerifyVisible} block>인증번호 받기</Button>
            {errors.userPhoneNum && <FormErrorMessage className="error" Message={errors.userPhoneNum.message} />}
          </div>
          <div className="element">
            <Controller
              name="userVerifyNum"
              control={control}
              render={({ field }) => <Input type="text" {...field} style={visivel} placeholder="인증번호를 입력해주세요." />}
            />
            <Button type="primary" htmlType="submit"
            //  onClick={Verifysubmit} 
             block>인증하기</Button>
            {errors.userVerifyNum && <FormErrorMessage className="error" Message={errors.userVerifyNum.message} />}
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
