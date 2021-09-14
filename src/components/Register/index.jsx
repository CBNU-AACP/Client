/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StyedRegister from './style'
import { Button, Checkbox, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './yup'
import FormErrorMessage from './FormErrorMessage'
import { RegisterUser, DpUsercheck, GetPhoneVerifyNum, PhoneVerify } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

function Register() {
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
  const [minutes, setMinutes] = useState(parseInt(1))
  const [seconds, setSeconds] = useState(parseInt(0))
  const [countdown, setCountdown] = useState(null)

  //  전화번호 인증 확인 메세지
  const [isNumPosted, setisNumPosted] = useState('')
  //  인증 성공 유무 메세지
  const [isNumSuccessful, setisNumSuccessful] = useState('')

  useEffect(() => {
    if (visible && isNumSuccessful !== '인증성공') {
      setCountdown(
        setInterval(() => {
          if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1)
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
              clearInterval(countdown)
            } else {
              setMinutes(parseInt(minutes) - 1)
              setSeconds(59)
            }
          }
        }, 1000),
      )
    } else if ((!visible && seconds !== 0) || isNumSuccessful === '인증성공') {
      clearInterval(countdown)
    }
    return () => clearInterval(countdown)
  }, [isNumSuccessful, visible, seconds, minutes])

  // 인증번호 받기
  const VerifyVisible = () => {
    const userId = document.getElementById('userId').value
    const userPhoneNumber = document.getElementById('userPhoneNumber').value

    if (!userPhoneNumber) {
      document.getElementById('userPhoneNumber').focus()
      setVisible(false)
    } else {
      if (userId !== dpIdcheck.userId || dpIdcheck.state === false) {
        document.getElementById('userId').focus()
        setdpIdcheck({ ...dpIdcheck, state: false, message: '중복확인을 해주세요.' })
        return
      }
      setVisible(true)
      console.log(userId, userPhoneNumber)
      GetPhoneVerifyNum(userId, userPhoneNumber)
        .then(e => {
          console.log(e)
          setisNumPosted('인증번호가 전송되었습니다.')
          setisNumSuccessful('')
          setMinutes(parseInt(1))
          setSeconds(parseInt(0))
        })
        .catch(e => {
          setisNumPosted('인증 개수 초과입니다. 다른 아이디로 시도해주세요.')
          console.log(e)
        })
    }
  }
  const isVisible = {
    display: visible ? 'inline' : 'none',
  }
  // 인증번호 인증
  function Verifysubmit() {
    const userId = document.getElementById('userId').value
    const Verifykey = document.getElementById('userPhoneVerify').value
    console.log(userId, Verifykey)
    PhoneVerify(userId, Verifykey)
      .then(e => {
        console.log(e)
        setisNumSuccessful('인증성공')
      })
      .catch(e => {
        console.log(e)
        setisNumSuccessful('인증번호가 틀렸습니다.')
      })
  }

  //  아이디 중복 체크
  const [dpIdcheck, setdpIdcheck] = useState({
    userId: '',
    state: false,
    message: '',
  })
  //  이메일 중복 체크
  const [dpEmailcheck, setdpEmailcheck] = useState({
    userEmail: '',
    state: false,
    message: '',
  })
  // 아이디 중복확인
  const VerifyId = () => {
    setdpIdcheck({ ...dpIdcheck, state: true, userId: document.getElementById('userId').value })
  }
  // 이메일 중복확인
  const VerifyEmail = () => {
    setdpEmailcheck({ ...dpEmailcheck, state: true, userEmail: document.getElementById('userEmail').value })
  }
  useEffect(() => {
    if (dpIdcheck.state === true && dpIdcheck.userId !== '') {
      dispatch(DpUsercheck(dpIdcheck.userId))
        .then(e => {
          // 중복이 없을 경우
          console.log(e)
          setdpIdcheck({ ...dpIdcheck, message: '사용 가능한 아이디입니다.' })
        })
        .catch(e => {
          // 중복이 있을 경우
          console.log(e)
          setdpIdcheck({ ...dpIdcheck, state: false, message: '존재하는 아이디입니다.' })
        })
    }
  }, [dpIdcheck.state, dpIdcheck.userId])

  useEffect(() => {
    if (dpEmailcheck.state === true && dpEmailcheck.userEmail !== '') {
      dispatch(DpUsercheck(dpEmailcheck.userEmail))
        .then(e => {
          // 중복이 없을 경우
          console.log(e)
          setdpEmailcheck({ ...dpEmailcheck, message: '사용 가능한 이메일입니다.' })
        })
        .catch(e => {
          // 중복이 있을 경우
          console.log(e)
          setdpEmailcheck({ ...dpEmailcheck, state: false, message: '이미 사용 중인 이메일입니다.' })
        })
    }
  }, [dpEmailcheck.state, dpEmailcheck.userEmail])

  // 회원가입 버튼 클릭 시
  const handleRegister = data => {
    setSuccessful(false)
    const { userId, userPassword, studentId, userEmail, userPhoneNumber, name } = data
    const user = { userId, userPassword, studentId, userEmail, userPhoneNumber, name }
    console.log(user)
    if (user.userId !== dpIdcheck.userId) {
      document.getElementById('userId').focus()
      setdpIdcheck({ ...dpIdcheck, message: '중복확인을 해주세요.' })
    }
    if (user.userEmail !== dpIdcheck.userEmail) {
      document.getElementById('userEmail').focus()
      setdpEmailcheck({ ...dpEmailcheck, message: '중복확인을 해주세요.' })
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

  return (
    <StyedRegister onFinish={handleSubmit(handleRegister)} size="large">
      {!successful ? (
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
            <FormErrorMessage className="error" Message={dpIdcheck.message} />
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
              render={({ field }) => (
                <Input type="text" {...field} id="userEmail" placeholder="이메일을 입력해주세요." />
              )}
            />
            {errors.userEmail && <FormErrorMessage className="error" Message={errors.userEmail.message} />}
          </div>
          <div className="element">
            <Button type="primary" onClick={VerifyEmail} block>
              중복확인
            </Button>
            <FormErrorMessage className="error" Message={dpEmailcheck.message} />
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
              render={({ field }) => (
                <Input type="text" {...field} id="userPhoneNumber" placeholder="'-'제외하고 숫자만 입력" />
              )}
            />
            {errors.userPhoneNumber && <FormErrorMessage className="error" Message={errors.userPhoneNumber.message} />}
          </div>
          <div className="element">
            <Button type="primary" htmlType="button" onClick={VerifyVisible} block>
              인증번호 받기
            </Button>
            <FormErrorMessage className="error" Message={isNumPosted} />
          </div>
          <div className="element">
            <Controller
              name="userVerifyNum"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  id="userPhoneVerify"
                  style={isVisible}
                  placeholder="인증번호를 입력해주세요."
                />
              )}
            />
            {errors.userVerifyNum && <FormErrorMessage className="error" Message={errors.userVerifyNum.message} />}
          </div>
          <div className="element">
            {/* <Timer /> */}
            <p className="timer" style={isVisible}>
              유효시간 : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}초
            </p>
            <Button type="primary" htmlType="button" style={isVisible} onClick={Verifysubmit} block>
              인증하기
            </Button>
            <FormErrorMessage className="error" Message={isNumSuccessful} />
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
              가입하기
            </Button>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
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

export default Register
