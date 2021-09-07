import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsCardChecklist } from 'react-icons/bs'
import { RiPlayListAddLine } from 'react-icons/ri'
import PropTypes from 'prop-types'

import AddCourse from './CreateCourse'
import Course from './CoursesList/course'
import CoursesList from './CoursesList'
import MemberList from '../addmemberList'
import QrScanner from '../QrScanner'
import Attendance from '../Attendance'
import StyledCourse from './style'
import { history } from '../../helpers/history'

function Courses({ cookies }) {
  Courses.propTypes = {
    cookies: PropTypes.objectOf(PropTypes.shape),
  }

  const { path, url } = useRouteMatch()

  const { userId } = cookies

  return (
    <StyledCourse>
      {userId && userId !== 'undefined' ? (
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
                <Route exact path={`${path}`} render={() => <CoursesList cookies={cookies} />} />
                <Route exact path={`${path}/add`} render={() => <AddCourse cookies={cookies} />} />
                <Route exact path={`${path}/:id/member`} render={() => <MemberList cookies={cookies} />} />
                <Route exact path={`${path}/:id/qrscan`} render={() => <QrScanner cookies={cookies} />} />
                <Route exact path={`${path}/:id/attendance`} render={() => <Attendance cookies={cookies} />} />
                <Route exact path={`${path}/:id`} render={() => <Course cookies={cookies} />} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      ) : (
        <Redirect to="/login" />
      )}
    </StyledCourse>
  )
}

export default Courses
