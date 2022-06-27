import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setToken, setName } from '../redux/slices/authSlice';

export default function Logout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!(dispatch && navigate)) return;
        
        dispatch(setToken(''));
        dispatch(setName(''));
        navigate('/')
    }, [dispatch, navigate])

    return (
        <div>
            Logging out...
        </div>
    )
}
