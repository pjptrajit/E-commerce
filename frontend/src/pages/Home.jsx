import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../store/UserContext'

function Home() {

  const { user, setUser } = useContext(GlobalContext)
 
  return (
    <div>{user.name}</div>

  )
}

export default Home