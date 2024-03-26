import React, {useContext, useEffect, useMemo, useState} from 'react';
import s from './LayoutHeader.module.scss'
import {ModalContext} from '@/providers/ModalProvider';
import Home from "@/icons/Home";
import Settings from "@/icons/Settings";
import Bug from "@/icons/Bug";
import Chat from "@/icons/Chat";
import {NavLink} from "react-router-dom";
import Menu from "@/icons/Menu";
import Close from "@/icons/Close";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import Folder from "@/icons/Folder";
import Exit from "@/icons/Exit";
import {setIsAuth} from "@store/reducers/authReducer";
import {useDispatch} from "react-redux";

export default function LayoutHeader() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState('');
    const {modals, open, close} = useContext(ModalContext);

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 450)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const {t} = useTranslation()

    const routeLinks = useMemo(() => [
        {text: `${t('asideNavigation.main')}`, id: 1, icon: <Home/>, url: '/'},
        {text: `${t('asideNavigation.textEncryptor')}`, id: 2, icon: <Chat/>, url: '/textencryptor'},
        {text: `${t('asideNavigation.passwordGenerator')}`, id: 3, icon: <Bug/>, url: '/passwordgenerator'},
        {text: `${t('asideNavigation.settings')}`, id: 4, icon: <Settings/>, url: '/settings'},
        {text: `${t('asideNavigation.instruction')}`, id: 5, icon: <Folder/>, url: '/instruction'},
    ], []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('bodyNoScroll');
        } else {
            document.body.classList.remove('bodyNoScroll');
        }
    }, [isMenuOpen]);

    const handleLogout = () => {
        dispatch(setIsAuth(false))
        setUsername('');
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [localStorage]);


    const headerContent = useMemo(() => (
        <>
            <div className={s.header__container__content}>
                <button className={s.menuButton} onClick={toggleMenu}>{isMenuOpen ? <Close/> : <Menu/>}</button>
                <div className={s.header__container__content__user} onClick={() => open({key: 'UserProfileModal'})}>
                    <div className={s.header__container__content__user__info}>{username}</div>
                    <button onClick={handleLogout}><Exit/></button>
                </div>
            </div>
            <div className={`${s.fullScreenMenu} ${isMenuOpen ? `${s.open}` : ''}`}>
                <div>
                    {routeLinks.map(link => (
                        <NavLink
                            to={link.url}
                            key={link.id}
                            className={({isActive}) => classNames(s.link, {[s.linkActive]: isActive})}
                            style={{margin: '10px 0'}}>
                            {link.icon}{link.text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    ), [modals, isMenuOpen, routeLinks]);

    return (
        <header className={s.header}>
            <div className={s.header__container}>{headerContent}</div>
        </header>
    );
}
