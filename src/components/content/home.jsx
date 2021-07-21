import React, { useState, useEffect } from 'react'

import UserService from '../../services/auth/user_service'

const Home = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent(response.data)
      },
      error => {
        const contents = (error.response && error.response.data) || error.message || error.toString()

        setContent(contents)
      },
    )
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  )
}

export default Home
