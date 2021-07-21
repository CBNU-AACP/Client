import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth)

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.userName}</strong> 프로필
        </h3>
      </header>
      <p>
        <strong>토큰:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>아이디:</strong> {currentUser.userId}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  )
}

export default Profile
