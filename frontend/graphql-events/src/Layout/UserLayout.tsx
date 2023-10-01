import React, { ReactNode } from 'react'
import NavigationBar from '../Components/NavBar/Navbar'

const UserLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <NavigationBar isAuth />
            {children}
        </>
    )
}

export default UserLayout