/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import StyedLogin from './style'

import { login } from '../../actions/auth'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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

  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth)
  const { message } = useSelector(state => state.message)

  const dispatch = useDispatch()

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
    <StyedLogin onFinish={handleSubmit(handleLogin)} size="large">
      <div className={classes.root}>
        <div className="login">
          <div className="form-group">
            <TextField
              id="standard-start-adornment"
              className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: <InputAdornment position="start">아이디</InputAdornment>,
              }}
            />
          </div>
          <div className="form-group">
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
            <Button value="Login" className="login-btn" disabled={loading}>
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
        </div>
      </div>
    </StyedLogin>
  )
}

export default Login
