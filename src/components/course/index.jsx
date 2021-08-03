import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withCookies, useCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddCourse from './CreateCourse'
import Course from './CoursesList/course'
import CoursesList from './CoursesList'
import MemberList from '../memberList'

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
    <Router>
      {/* {hasCookie ? ( */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={`${url}/courses`} className="nav-link">
              강좌 목록
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`${url}/add`} className="nav-link">
              강좌 추가
            </Link>
          </li>
        </div>
      </nav>
      {/* ) : (
        <Redirect to="/" />
      )} */}

      <div className="container mt-3">
        <Switch>
          <Route exact path={[path, `${path}/courses`]} component={CoursesList} />
          <Route exact path={`${path}/add`} component={AddCourse} />
          <Route exact path={`${path}/courses/:id/memberlist`} component={MemberList} />
          <Route exact path={`${path}/courses/:id`} component={Course} />
        </Switch>
      </div>
    </Router>
  )
}

export default Courses
