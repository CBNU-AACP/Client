import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import { withCookies, useCookies } from 'react-cookie'
import PropTypes from 'prop-types'
import { IoHome } from 'react-icons/io5'
import { ImQrcode } from 'react-icons/im'
import { GiArchiveResearch } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'

import QrGenerator from './components/QrGenerator'
import Login from './components/Login/login'
import RegisterForm from './components/Register'
import Home from './components/content/home'
import Profile from './components/profile'
import Courses from './components/course'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'
import { history } from './helpers/history'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [cookies, removeCookie, setCookie, getCookie] = useCookies(['user'])
  const [hasCookie, setHasCookie] = useState(false)

  // const { user: currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(location => dispatch(clearMessage()))
  }, [dispatch])

  const logOut = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (cookies.user && cookies.user !== 'undefined') {
      setHasCookie(true)
    } else {
      setHasCookie(false)
    }
  }, [cookies])

  return (
    <BrowserRouter history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {/* {hasCookie ? ( */}
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                <IoHome />
              </Link>
            </li>
            {/* <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {cookies.user.userName}
                </Link>
              </li> */}
            <li className="nav-item">
              <Link to="/qrgen" className="nav-link">
                <ImQrcode />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link">
                <GiArchiveResearch />
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                <BsFillPersonFill />
              </a>
            </li>
          </div>
          {/* ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  로그인
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  회원가입
                </Link>
              </li>
            </div>
          )} */}
        </nav>
      </div>
      {/* {!hasCookie ? <Redirect to="/login" /> : <Redirect to="QrScan" />} */}
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/qrgen" component={QrGenerator} />
        <Route exact path="/courses" component={Courses} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
