import React from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/slices/authSlice'

export default function Login() {

  const dispatch = useDispatch();

  const purakPurakLogin = () => {
    const token = "purakPurakToken";
    dispatch(setToken(token));
  }

  return (
    <div>
      <button onClick={ purakPurakLogin }>Login</button>
    </div>
  )
}
