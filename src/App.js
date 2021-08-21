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
import StyledApp from './style'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'
import { history } from './helpers/history'

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
    <StyledApp>
      <BrowserRouter history={history}>
        {/* {!hasCookie ? <Redirect to="/login" /> : <Redirect to="QrScan" />} */}
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/qrgen" component={QrGenerator} />
          <Route exact path="/courses" component={Courses} />
        </Switch>

        <div className="appbar">
          <div className="bar">
            <Link to="/home" className="iconList">
              <IoHome className="icon" />
              <p className="label">홈</p>
            </Link>
            <Link to="/qrgen" className="iconList">
              <ImQrcode className="icon" />
              <p className="label">출석하기</p>
            </Link>
            <Link to="/courses" className="iconList">
              <GiArchiveResearch className="icon" />
              <p className="label">강좌보기</p>
            </Link>
            <a href="/" onClick={logOut} className="iconList">
              <BsFillPersonFill className="icon" />
              <p className="label">마이페이지</p>
            </a>
          </div>
        </div>
      </BrowserRouter>
    </StyledApp>
  )
}

export default App
