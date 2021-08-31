/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import StyedLogin from './style'
// import { setCookie, getCookie } from './cookies'
import { useCookies } from 'react-cookie'
import { LoginUser } from '../../actions/auth'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Typography } from '@material-ui/core'

function Login(props, { match }) {
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
  const dispatch = useDispatch()
  const [successful, setSuccessful] = useState(false)

  const [userInfo, setUserInfo] = useState({
    userId: '',
    userPassword: '',
  })
  Login.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth)
  const { message } = useSelector(state => state.message)

  const [cookies, setCookie] = useCookies(['userId'])

  const handleLogin = data => {
    setSuccessful(false)
    console.log('submit', data)
    const { userId, userPassword } = data
    const user = { userId, userPassword }
    setCookie('userId', userId, { path: '/' })
    dispatch(LoginUser(user))
      .then(e => {
        console.log(e)
        setSuccessful(true)
      })
      .catch(e => {
        console.log(e)
        setSuccessful(false)
      })
  }

  if (isLoggedIn) {
    return <Redirect to="/profile" />
  }

  const classes = useStyles()
  const [values, setValues] = useState({
    userId: '',
    userPassword: '',
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
      {!successful && (
        <div className={classes.root}>
          <div className="login">
            <Typography variant="h5" align="center">
              로그인
            </Typography>
            <div className="element">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-userid">아이디</InputLabel>
                <Controller
                  name="userId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="standard-adornment-userid"
                      className="input-login"
                      type="text"
                      value={values.userId || ''}
                      name="userId"
                      onChange={handleChange('userId')}
                      {...field}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="element">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                <Controller
                  name="userPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="standard-adornment-password"
                      className="input-login"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.userPassword || ''}
                      name="userPassword"
                      onChange={handleChange('userPassword')}
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
                      {...field}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="element">
              <Button value="Login" className="login-btn" disabled={loading} type="primary" htmlType="submit" block>
                로그인
              </Button>
            </div>
            <div className="element-btn">
              <Link to="/register" className="iconList">
                <p className="label">회원가입</p>
              </Link>
            </div>
            <div className="element-btn">
              <Link to="/find" className="iconList">
                <p className="label">아이디 찾기</p>
              </Link>
            </div>
            <div className="element-btn">
              <Link to="/find" className="iconList">
                <p className="label">비밀번호 찾기</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </StyedLogin>
  )
}

export default Login
