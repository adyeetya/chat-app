import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  // parse will convert the string to object
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('chatter-user')) || null
  )

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
  )
}
