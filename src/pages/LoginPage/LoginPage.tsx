import React, {useState} from 'react';
import s from "@/pages/SignUpPage/SignUpPage.module.scss";
import {Link, useNavigate} from "react-router-dom";
import Toasts from "@/utils/Toasts";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setIsAuth} from "@store/reducers/authReducer";

export default function LoginPage() {
    const {t} = useTranslation()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: any) => {
        e.preventDefault();
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            dispatch(setIsAuth(true))
            Toasts.success(t('alerts.authorization.success'))
            navigate("/")
        } else {
            Toasts.error(t('alerts.authorization.error'))
        }
    };

    return (
        <div className={s.container}>
            <h1>{t('asideNavigation.logPage')}</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">{t('asideNavigation.log')}</button>
            </form>
            <Link to="/">
                {t('asideNavigation.gotoReg')}
            </Link>
        </div>
    );
}
