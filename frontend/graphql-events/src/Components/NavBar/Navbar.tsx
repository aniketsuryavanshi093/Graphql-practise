import React from 'react'
import { Link as Navlink, useLocation, useNavigate } from "react-router-dom"
import { Navbar, NavbarBrand, NavbarContent, Spacer, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { AcmeLogo } from '../../assets/AcmeLogo';
import "./navbar.css"
import useAuthContext from '../../Context/AuthCOntext/useAuthContext';
const NavigationBar = ({ isAuth }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { logout } = useAuthContext()
    const routes = [
        { path: "/booking", Label: "Bookings" },
    ]
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Navbar className='w-full navbarcustom' onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent >
                <div>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <AcmeLogo />
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                </div>
                <Spacer x={4}></Spacer>
                <NavbarContent className="hidden sm:flex gap-4 sm:w-full" justify="start">

                    {
                        isAuth && routes.map((el) => (
                            <>
                                <NavbarItem>
                                    <Navlink to={el.path} >
                                        <p className={`mb-0 ${location.pathname === el.path ? "text-primary-700" : "text-foreground-800"} `}>
                                            {el.Label}
                                        </p>

                                    </Navlink>
                                </NavbarItem>
                                <Spacer x={4} />
                            </>
                        ))
                    }
                    <NavbarItem>
                        <Navlink to={'/event'} >
                            <p className={`mb-0 ${location.pathname === "/event" ? "text-primary-700" : "text-foreground-800"} `}>
                                Events
                            </p>
                        </Navlink>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    !isAuth ?
                        (
                            <>
                                <NavbarItem className="hidden lg:flex">
                                    <Link onClick={() => navigate("/auth")}>Login</Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button as={Link} color="primary" href="#" variant="flat">
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </>
                        )
                        :
                        (
                            <NavbarItem className="hidden lg:flex">
                                <Link onClick={logout}>Logout</Link>
                            </NavbarItem>
                        )
                }
            </NavbarContent>
            <NavbarMenu>
                {routes.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Navlink to={item.path} >
                            <Link
                                color={location.pathname === item.path ? "primary" : "foreground"}
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item.Label}
                            </Link>
                        </Navlink>

                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    )
}

export default NavigationBar