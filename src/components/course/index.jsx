import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddCourse from './CreateCourse'
import Course from './CoursesList/course'
import CoursesList from './CoursesList'

function Courses() {
  const { user: currentUser } = useSelector(state => state.auth)
  const { path, url } = useRouteMatch()
  return (
    <Router>
      {currentUser ? (
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
      ) : (
        <Redirect to="/" />
      )}

      <div className="container mt-3">
        <Switch>
          <Route exact path={[path, `${path}/courses`]} component={CoursesList} />
          <Route exact path={`${path}/add`} component={AddCourse} />
          <Route path={`${path}/courses/:id`} component={Course} />
        </Switch>
      </div>
    </Router>
  )
}

export default Courses
