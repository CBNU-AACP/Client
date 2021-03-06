/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react'
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
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'

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
  const [cookies, setCookie, removeCookie] = useCookies(['userId'])
  const [cookieExpires] = useState({
    now: new Date(),
    after1h: new Date(),
  })

  const handleLogin = data => {
    console.log('submit', data)
    const { userId, userPassword } = data
    const user = { userId, userPassword }
    cookieExpires.after1h.setHours(cookieExpires.now.getHours() + 1)
    console.log(cookieExpires.after1h)
    dispatch(LoginUser(user))
      .then(e => {
        console.log(e)
        setCookie('userId', user.userId, { path: '/', expires: cookieExpires.after1h })
      })
      .catch(e => {
        console.log('error', e)
        removeCookie('userId')
        alert('????????? ?????? ??????????????? ?????? ??????????????????.')
      })
  }

  return (
    <StyedLogin onFinish={handleSubmit(handleLogin)} size="large">
      {!cookies.userId || cookies.userId === 'undefined' ? (
        <div className={classes.root}>
          <div className="box">
            <Typography variant="h5" align="center">
              ?????????
            </Typography>
            <div className="element">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-userid">?????????</InputLabel>
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
                <InputLabel htmlFor="standard-adornment-password">????????????</InputLabel>
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
              <Button value="Login" className="login-btn" type="primary" htmlType="submit" block>
                ?????????
              </Button>
            </div>
            <div className="element-btn">
              <LockIcon style={{ width: 20, margin: '0 5' }}></LockIcon>
              <Link to="/find" className="iconList">
                <p className="label">???????????????????????? ??????</p>
              </Link>
            </div>
            <div className="element-btn">
              <PersonIcon style={{ width: 20, margin: '0 5' }}></PersonIcon>
              <Link to="/register" className="iconList">
                <p className="label">????????????</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </StyedLogin>
  )
}

export default Login
