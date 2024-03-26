import React, { useState } from 'react';

import s from './SignUpPage.module.scss'
import {Link, useNavigate} from "react-router-dom";
import Toasts from "@/utils/Toasts";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "@hooks/store";
import {useDispatch} from "react-redux";
import {setIsAuth} from "@store/reducers/authReducer";

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {t} = useTranslation()

    const handleSignUp = (e: any) => {
        e.preventDefault();
        if (!username || !password) {
            Toasts.error(t('alerts.authorization.error1'))
            return;
        }
        if (localStorage.getItem(username)) {
            Toasts.error(t('alerts.authorization.error1'))
            return;
        }
        localStorage.setItem(username, password);
        Toasts.success(t('alerts.authorization.success1'))
        dispatch(setIsAuth(true))
        navigate("/")
        setUsername('');
        setPassword('');
    };

    return (
        <div className={s.container}>
            <h1>{t('asideNavigation.regPage')}</h1>
            <form onSubmit={handleSignUp}>

                {message && <p>{message}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{t('asideNavigation.reg')}</button>
            </form>
            <Link to="/login">
                {t('asideNavigation.gotoLog')}
            </Link>
        </div>
    );
}
