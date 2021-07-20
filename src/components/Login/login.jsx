/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import { login } from '../../actions/auth'

const Login = props => {
  Login.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

//   const form = useRef()
//   const checkBtn = useRef()

//   const [userId, setUserId] = useState('')
//   const [passWord, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth)
  const { message } = useSelector(state => state.message)

  const dispatch = useDispatch()

//   const onChangeUserid = e => {
//     const [name, value] = e.target
//     console.log(name, value)
//     setUserId(value)
//   }

//   const onChangePassword = e => {
//     const password = e.target.value
//     setPassword(password)
//   }

  const handleLogin = data => {
    setLoading(true)
    console.log(data.userId, data.passWord)
    // setUserId(data.userId)
    // setPassword(data.passWord)
    dispatch(login(data.userId, data.passWord))
      .then(() => {
        props.history.push('/profile')
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="">
      <div className="card card-container">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label htmlFor="userId">id</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              placeholder="아이디"
              onChange={e => setValue('userId', e.target.value)}
              //   onChange={onChangeUserid}
              {...register('userId', { required: true })}
            />
            {errors.userId && <span>아이디를 입력해주세요.</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passWord">password</label>
            <input
              type="password"
              className="form-control"
              id="passWord"
              name="passWord"
              placeholder="비밀번호"
              //   onChange={onChangePassword}
              {...register('passWord', { required: true })}
            />
            {errors.passWord && <span>비밀번호를 입력해주세요.</span>}
          </div>

          <div className="form-group">
            <button type="submit" value="Login" className="btn btn-primary btn-block" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
