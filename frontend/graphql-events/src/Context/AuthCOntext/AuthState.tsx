import React, { ReactNode, useState } from 'react'
import AuthContext from "./AuthContext"

type userType = {
    token: ""
    userId: ""
}

const AuthState: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setuser] = useState<userType | null>()
    const logout = () => {
        sessionStorage.clear()
        setuser(null)
    }
    return <AuthContext.Provider value={{
        user, setuser, logout
    }}> {children} </AuthContext.Provider>
}

export default AuthState