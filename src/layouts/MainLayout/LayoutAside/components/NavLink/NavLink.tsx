import React from 'react';
import classNames from "classnames";

import {Link, useLocation} from "react-router-dom";

import s from './NavLink.module.scss';
import Ripple from "@/components/Ripple";

interface NavLinkProps {
    text: string;
    icon: any;
    url: string;
}

export default function NavLink({text, icon, url}: NavLinkProps) {

    const location = useLocation();

    return (
        <Link to={url}>
            <div className={classNames({
                [s.navLink]: true,
                [s.active]: location.pathname === url,
                [s.disabled]: location.pathname !== url
            })}>
                <div className={s.navLink__leftPart}>
                    {icon}
                </div>
                <div className={s.navLink__rightPart}>
                    {text}
                </div>
                <Ripple duration={850} color="#ffffff" />
            </div>
        </Link>
    )
}
