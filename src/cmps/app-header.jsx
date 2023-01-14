import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from '../services/user.service.js'


export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const [isSignupState, setIsSignupState] = useState(false)

    useEffect(() => {
        onToggleSignupState()
        console.log('sate', isSignupState);

    }, [])

    function onToggleSignupState() {
        if (user) {
            setIsSignupState(true)
        } else {
            setIsSignupState(false)
        }
    }

    return (
        <header className="app-header">
            <div className="header-container">

                <Link to="/">
                    <h2>Mister Toy</h2>
                </Link>

                <nav>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/statistic">Statistics</NavLink>
                    {user ? <NavLink onClick={logout}>Sign out</NavLink> : <NavLink to="/signLog">Login</NavLink>}
                    {/* {!user && <NavLink to="/signLog">Login</NavLink>} */}
                </nav>

            </div>
        </header>
    )
}
