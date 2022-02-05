import React, { useEffect, useState } from 'react'

import { useCookies } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './Player.module.css'
import { login, logout, selectPlayers } from './playersSlice'

interface LoginProps {
  isLoggedIn: boolean
}

export function Login (props: LoginProps) {
  const isLoggedIn = props.isLoggedIn
  const dispatch = useAppDispatch()
  const players = useAppSelector(selectPlayers)

  const [name, setName] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['username'])

  const doLogout = () => {
    removeCookie('username')
    dispatch(logout())
  }

  useEffect(() => {
    if (players.username && cookies.username === undefined) {
      setCookie('username', players.username, { path: '/' })
    } else if (!players.username && cookies.username !== undefined) {
      dispatch(login({ username: cookies.username }))
    }
  })

  return isLoggedIn
    ? (
      <button className={styles.button} onClick={() => doLogout()}>Logout</button>
      )
    : (
      <div>
        <span>Log in with confidence with our zero factor authentication system</span>
        <form onSubmit={() => dispatch(login({ username: name }))}>
          <input name='username' type='text' onChange={(event) => setName(event.target.value)} />
          <button className={styles.button}>Login</button>
        </form>
      </div>
      )
};
