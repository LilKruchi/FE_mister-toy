
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login, signup } from '../services/user.service.js'

// const { useState, useEffect } = React

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

export function LoginSignup({ setUser }) {
    const user = useSelector((storeState => storeState.userModule.user))
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    useEffect(() => {
        if (user) navigate('/toy')
    }, [])

    function onSubmit(ev) {
        ev.preventDefault()
        const funcs = { signup, login }
        const method = isSignupState ? 'signup' : 'login'
        return funcs[method](credentials)
            .then((user) => {
                console.log(user)
                navigate('/toy')
                // showSuccessMsg(`Welcome ${user.fullname}`)
            })
            .catch(err => {
                // showErrorMsg('OOps try again')
            })
    }
    console.log(isSignupState);
    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }


    const { username, password, fullname } = credentials
    return <div className="login-page">

        <form className="login-form" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />

            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
            />

            {isSignupState && <input
                type="text"
                name="fullname"
                value={fullname}
                placeholder="Full name"
                onChange={handleCredentialsChange}
                required
            />}

            <button>{isSignupState ? 'Signup' : 'Login'}</button>
        </form>

        <div className="btns">
            <a onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
            </a >
        </div>
    </div >

}

