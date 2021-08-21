import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withCookies, useCookies } from 'react-cookie'
import { BsCardChecklist } from 'react-icons/bs'
import { RiPlayListAddLine } from 'react-icons/ri'

import AddCourse from './CreateCourse'
import Course from './CoursesList/course'
import CoursesList from './CoursesList'
import MemberList from '../addmemberList'
import QrScanner from '../QrScanner'
import StyledCourse from './style'
import { history } from '../../helpers/history'

function Courses() {
  // const { user: currentUser } = useSelector(state => state.auth)
  const { path, url } = useRouteMatch()
  const [cookies, removeCookie, setCookie, getCookie] = useCookies(['user'])
  const [hasCookie, setHasCookie] = useState(false)

  useEffect(() => {
    if (cookies.user && cookies.user !== 'undefined') {
      setHasCookie(true)
    } else {
      setHasCookie(false)
    }
  }, [cookies])
  return (
    <StyledCourse>
      <BrowserRouter history={history}>
        <div className="container">
          <div className="topbar">
            <div className="icons">
              <li className="iconList">
                <Link to={`${url}`} className="">
                  <BsCardChecklist className="icon" />
                  <p>강좌목록</p>
                </Link>
              </li>
              <li className="iconList">
                <Link to={`${url}/add`} className="">
                  <RiPlayListAddLine className="icon" />
                  <p>강좌추가</p>
                </Link>
              </li>
            </div>
          </div>
          <div className="components">
            <Switch>
              <Route exact path={`${path}`} component={CoursesList} />
              <Route exact path={`${path}/add`} component={AddCourse} />
              <Route exact path={`${path}/:id/member`} component={MemberList} />
              <Route exact path={`${path}/:id/qrscan`} component={QrScanner} />
              <Route exact path={`${path}/:id`} component={Course} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </StyledCourse>
  )
}

export default Courses
