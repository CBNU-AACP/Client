/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StyedRegister from './style'
import { Button, Checkbox, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './yup'
import FormErrorMessage from './FormErrorMessage'

import { RegisterUser, DpUsercheck } from '../../actions/auth'
import { event } from 'jquery'
// import queryString from 'query-string'

function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector(state => state.message)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  // 아임포트
  const callback = response => {
    console.log(2)
    if (response.success) {
      console.log('인증에 성공했습니다.')
    } else {
      console.log('인증에 실패했습니다.')
    }
  }

  // 인증번호 받기
  function VerifyVisible(e) {
    setVisible(true)
    e.preventDefault()

    const userCode = 'imp37713085'
    const { IMP } = window

    IMP.init(userCode)
    console.log(IMP)
    IMP.certification(
      {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        company: '아임포트', // 회사명 또는 URL
        carrier: 'SKT', // 통신사
        name: '홍길동',
      },
      callback,
    )
    console.log(IMP)
    console.log(1)
  }
  const visivel = {
    visibility: visible ? 'visible' : 'hidden',
  }

  // Id값
  const [dpUserIdcheck, setdpUserIdcheck] = useState({
    value: '',
  })
  // Email값
  const [dpUserEmailcheck, setdpUserEmailcheck] = useState({
    value: '',
  })
  //  아이디 중복 체크
  const [dpIdcheck, setdpIdcheck] = useState({
    state: false,
    message: '',
  })
  //  이메일 중복 체크
  const [dpEmailcheck, setdpEmailcheck] = useState({
    state: false,
    message: '',
  })
  const onChangeId = async e => {
    console.log(1)
    await setdpUserIdcheck(dpUserIdcheck => ({ ...dpUserIdcheck, value: e.target.value }))
    console.log(dpUserIdcheck)
  }
  const onChangeEmail = async e => {
    await setdpUserEmailcheck(dpUserEmailcheck => ({ ...dpUserEmailcheck, value: e.target.value }))
    console.log(dpUserEmailcheck)
  }

  const [checkUserId, setcheckUserId] = useState('')
  const [clicked, setClicked] = useState(false)
  // 아이디 중복확인
  const VerifyId = () => {
    setcheckUserId(document.getElementById('userId').value)
    setClicked(true)
  }
  // 이메일 중복확인
  const VerifyEmail = () => {
    console.log(dpUserEmailcheck)
    dispatch(DpUsercheck(dpUserEmailcheck.value))
      .then(e => {
        // 중복이 없을 경우
        console.log(e)
        setdpEmailcheck(dpEmailcheck => ({ ...dpEmailcheck, state: true, message: '사용 가능한 이메일입니다.' }))
      })
      .catch(e => {
        // 중복이 있을 경우
        console.log(e)
        setdpEmailcheck(dpEmailcheck => ({ ...dpEmailcheck, state: false, message: '존재하는 이메일입니다.' }))
      })
  }
  useEffect(() => {
    if (clicked === true) {
      dispatch(DpUsercheck(checkUserId))
        .then(e => {
          // 중복이 없을 경우
          console.log(e)
          setdpIdcheck(dpIdcheck => ({ ...dpIdcheck, state: true, message: '사용 가능한 아이디입니다.' }))
        })
        .catch(e => {
          // 중복이 있을 경우
          console.log(e)
          setdpIdcheck(dpIdcheck => ({ ...dpIdcheck, state: false, message: '존재하는 아이디입니다.' }))
        })
      setClicked(false)
    }
  }, [checkUserId, clicked])

  // 회원가입 버튼 클릭 시
  const handleRegister = data => {
    setSuccessful(false)
    const { userId, userPassword, studentId, userEmail, userPhoneNumber, name } = data
    const user = { userId, userPassword, studentId, userEmail, userPhoneNumber, name }
    console.log(user)
    if (user.userId !== checkUserId) {
      document.getElementById('userId').focus()
    } else
      dispatch(RegisterUser(user))
        .then(e => {
          console.log(e)
          setSuccessful(true)
        })
        .catch(e => {
          console.log(e)
          setSuccessful(false)
        })
  }

  const onchange = () => {
    console.log(false)
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
                  onChange={e => console.log(e)}
                  {...field}
                  id="userId"
                  placeholder="아이디를 입력해주세요."
                />
              )}
            />
            {errors.userId && <FormErrorMessage className="error" Message={errors.userId.message} />}
          </div>
          <div className="element">
            <Button variant="outlined" color="secondary" type="primary" onClick={VerifyId} block>
              중복확인
            </Button>
            {dpIdcheck.state ? (
              <FormErrorMessage className="error" Message={dpIdcheck.message} />
            ) : (
              <FormErrorMessage className="error" Message={dpIdcheck.message} />
            )}
          </div>
          <div className="element">
            <label htmlFor="name">이름</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="이름을 입력해주세요." />}
            />
            {errors.name && <FormErrorMessage className="error" Message={errors.name.message} />}
          </div>
          <div className="element">
            <label htmlFor="studentId">학번</label>
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="학번을 입력해주세요." />}
            />
            {errors.studentId && <FormErrorMessage className="error" Message={errors.studentId.message} />}
          </div>
          <div className="element">
            <label htmlFor="userEmail">이메일</label>
            <Controller
              name="userEmail"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="이메일을 입력해주세요." />}
            />
            {errors.userEmail && <FormErrorMessage className="error" Message={errors.userEmail.message} />}
          </div>
          <div className="element">
            <Button type="primary" onClick={VerifyEmail} block>
              중복확인
            </Button>
            {/* {dpEmailcheck.state ? (
              <FormErrorMessage className="error" Message={dpEmailcheck.message} />
            ) : (
              <FormErrorMessage className="error" Message={dpEmailcheck.message} />
            )} */}
          </div>
          <div className="element">
            <label htmlFor="userPassword">비밀번호</label>
            <Controller
              name="userPassword"
              control={control}
              render={({ field }) => <Input type="password" {...field} placeholder="비밀번호를 입력해주세요." />}
            />
            {errors.userPassword && <FormErrorMessage className="error" Message={errors.userPassword.message} />}
          </div>
          <div className="element">
            <label htmlFor="passWord2">비밀번호 확인</label>
            <Controller
              name="userPassword2"
              control={control}
              render={({ field }) => <Input type="password" {...field} placeholder="비밀번호를 확인해주세요." />}
            />
            {errors.userPassword2 && <FormErrorMessage className="error" Message={errors.userPassword2.message} />}
          </div>
          <div className="element">
            <label htmlFor="userPhoneNumber">전화번호</label>
            <Controller
              name="userPhoneNumber"
              control={control}
              render={({ field }) => <Input type="text" {...field} placeholder="전화번호를 입력해주세요." />}
            />
            <Button type="primary" htmlType="submit" onClick={VerifyVisible} block>
              인증번호 받기
            </Button>
            {errors.userPhoneNumber && <FormErrorMessage className="error" Message={errors.userPhoneNumber.message} />}
          </div>
          <div className="element">
            <Controller
              name="userVerifyNum"
              control={control}
              render={({ field }) => (
                <Input type="text" {...field} style={visivel} placeholder="인증번호를 입력해주세요." />
              )}
            />
            <Button
              type="primary"
              htmlType="submit"
              style={visivel}
              //  onClick={Verifysubmit}
              block>
              인증하기
            </Button>
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
          <div className="element">
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
