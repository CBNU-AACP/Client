import React from 'react'
import StyedProfile from './style'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile() {
  const [cookies] = useCookies(['userId'])
  return (
    <StyedProfile>
      <div className="box">
        <header className="jumbotron">
          <h3>
            <strong>프로필</strong>
          </h3>
        </header>
        <section>
          <p>
            <strong>토큰:</strong>
          </p>
          <p>
            <strong>아이디:{cookies.userId}</strong>
          </p>
          <p>
            <strong>Email:</strong>
          </p>
        </section>
      </div>
    </StyedProfile>
  )
}

export default Profile
