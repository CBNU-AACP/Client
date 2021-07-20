/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect, useParams } from 'react-router-dom'
import StyedLogin from './style'

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState(null)
  const [login, setLogin] = useState('')
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  const sendInfo = async data => {
    setInputId(data.userId)
    setInputPw(data.userPassword)
    console.log('click login')
    console.log('ID : ', data.userId)
    console.log('PW : ', data.userPassword)
    axios
      .post('http://6f30e35bfe80.ngrok.io/v1/users/login', null, {
        params: {
          userId: inputId,
          user_pw: inputPw,
        },
      })
      .then(response => {
        console.log(response)
        console.log('response.data.userId :: ', response.data.userId)
        console.log('response.data.msg :: ', response.data.message)
        if (response.data.userId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log('======================', response.data.msg)
          alert('입력하신 id 가 일치하지 않습니다.')
        } else if (response.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , message = undefined
          console.log('======================', '입력하신 비밀번호 가 일치하지 않습니다.')
          alert('입력하신 비밀번호 가 일치하지 않습니다.')
        } else if (response.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, message = undefined
          console.log('로그인 성공')
          sessionStorage.setItem('user_id', inputId)
        }
        // 작업 완료 되면 페이지 이동(Qr생성)
        document.location.href = '/QrGen'
      })
      .catch()
  }

  const onSubmit = data => {
    sendInfo(data)
  }

  return (
    <StyedLogin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>로그인</label>
        <input id="id" type="text" placeholder="아이디" {...register('userId', { required: true })} />
        {errors.userId && <span>아이디를 입력해주세요.</span>}
        <input id="password" type="password" placeholder="비밀번호" {...register('userPassword', { required: true })} />
        {errors.userPassword && <span>비밀번호를 입력해주세요.</span>}
        <input type="submit" value="로그인" />
      </form>
    </StyedLogin>
  )
}
