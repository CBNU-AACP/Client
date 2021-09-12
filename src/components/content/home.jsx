import React, { useState, useEffect } from 'react'
import StyedHome from './style'
import PropTypes from 'prop-types'
import UserService from '../../services/auth/user_service'

const Home = ({ cookies }) => {
  Home.propTypes = {
    cookies: PropTypes.objectOf(PropTypes.shape),
  }
  const { userId } = cookies
  const [content, setContent] = useState('몰라유~여긴 home이에유 ~')

  return (
    <StyedHome>
      <div className="container">
        {userId && userId !== 'undefined' ? (
          <header className="jumbotron">
            <h3>{content}</h3>
          </header>
        ) : (
          <div>
            <h3>{content}</h3>
          </div>
        )}
      </div>
    </StyedHome>
  )
}

export default Home
