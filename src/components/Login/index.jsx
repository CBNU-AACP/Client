/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import { login } from '../../actions/auth'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import { Button } from 'bootstrap'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}))
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

  const classes = useStyles()
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <div className={classes.root}>
      <div className="card card-container">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label htmlFor="userId">아이디</label>
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
            <label htmlFor="passWord">비밀번호</label>
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
          <div>
            <TextField
              label="With normal TextField"
              id="standard-start-adornment"
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: <InputAdornment position="start">아이디</InputAdornment>,
              }}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <div className="form-group">
            <Button type="submit" value="Login" className="btn btn-primary btn-block" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </Button>
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
