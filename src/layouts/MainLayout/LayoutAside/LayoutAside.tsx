import React, {useMemo} from 'react';

import {useTranslation} from "react-i18next";

import {Link} from "react-router-dom";


import s from './LayoutAside.module.scss'

import NavLink from "./components/NavLink";
import Home from "@/icons/Home";
import Settings from "@/icons/Settings";
import Logotype from "@/components/Logotype/Logotype";
import Bug from "@/icons/Bug";
import Chat from "@/icons/Chat";
import Folder from "@/icons/Folder";


export default function LayoutAside() {
    const {t} = useTranslation();

    const columnsData = useMemo(() => [
        {
            links: [
                {text: `${t('asideNavigation.main')}`, id: 1, icon: <Home/>, url: '/'},
                {text: `${t('asideNavigation.textEncryptor')}`, id:2 , icon: <Chat/> , url: '/textencryptor'},
                {text: `${t('asideNavigation.passwordGenerator')}`, id:3 , icon: <Bug/>, url: '/passwordgenerator'}
            ]
        },
        {
            links: [
                {text: `${t('asideNavigation.settings')}`, id: 4, icon: <Settings/>, url: '/settings'},
                {text: `${t('asideNavigation.instruction')}`, id: 5, icon: <Folder/>, url: '/instruction'},
            ]
        }
    ], [t]);


    const content = useMemo(() => {
            return (
                <div className={s.content}>
                    <Link to="/"><Logotype/></Link>
                    <nav className={s.navigation}>
                        {columnsData.map((column, index) => (
                            <div key={index} className={s.navColumn}>
                                {column.links.map((link, linkIndex) => (
                                    <NavLink
                                        text={link.text}
                                        icon={link.icon}
                                        url={link.url}
                                        key={linkIndex}
                                    />
                                ))}
                            </div>

                        ))}
                    </nav>
                </div>
            )
    }, [t])

    return (
        <aside className={s.aside}>
            {content}
        </aside>
    )
}
