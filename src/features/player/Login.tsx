import React, { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import styles from './Player.module.css';
import { login, logout } from './playersSlice';

interface LoginProps {
  isLoggedIn: boolean;
}

export function Login(props : LoginProps) {
  const isLoggedIn = props.isLoggedIn;
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');

  return isLoggedIn ? (
    <button className={styles.button} onClick={() => dispatch(logout())} >Logout</button>
  ) : (
    <div>
      <span>Log in with confidence with our zero factor authentication system</span>
      <form onSubmit={() => dispatch(login({username: name}))}>
        <input name='username' type='text' onChange={(event) => setName(event.target.value)}></input>
        <button className={styles.button}>Login</button>
      </form>
    </div>
  )
};
