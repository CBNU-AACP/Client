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
import Find from './components/Login/find'
import Register from './components/Register'
import Home from './components/content/home'
import Profile from './components/profile'
import Courses from './components/course'
import StyledApp from './style'

import { clearMessage } from './actions/message'
import { history } from './helpers/history'
import { Button } from 'antd'

function App() {
  const [cookies, removeCookie] = useCookies(['userId'])
  const [hasCookie, setHasCookie] = useState(false)

  // const { user: currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(location => dispatch(clearMessage()))
  }, [dispatch])

  const Logout = async () => {
    removeCookie('userId')
    await setHasCookie(false)
  }

  useEffect(() => {
    if (cookies.userId && cookies.userId !== 'undefined') {
      setHasCookie(true)
    } else {
      setHasCookie(false)
    }
  }, [cookies.userId])

  return (
    <StyledApp>
      <BrowserRouter history={history}>
        {/* {!hasCookie ? <Redirect to="/login" /> : <Redirect to="QrScan" />} */}
        <Switch>
          <Route exact path={['/', '/home']} render={props => <Home {...props} cookies={cookies} />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/find" component={Find} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" render={props => <Profile {...props} cookies={cookies} />} />
          <Route exact path="/qrgen" render={props => <QrGenerator {...props} cookies={cookies} />} />
          <Route exact path="/courses" render={props => <Courses {...props} cookies={cookies} />} />
        </Switch>
        {hasCookie ? (
          <div>
            <div className="navbar">
              <Button onClick={Logout}>로그아웃</Button>
            </div>
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
                <Link to="/profile" className="iconList">
                  <BsFillPersonFill className="icon" />
                  <p className="label">마이페이지</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Redirect to="/login" />
            <div className="appbar">
              <div className="bar">
                <Link to="/home" className="iconList">
                  <IoHome className="icon" />
                  <p className="label">홈</p>
                </Link>
                <Link to="/login" className="iconList">
                  <BsFillPersonFill className="icon" />
                  <p className="label">마이페이지</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </StyledApp>
  )
}

export default App
