import React from 'react'

const state = {
  user: null
}

const UserContext = React.createContext(state.user)

export default UserContext