import React from 'react';

import s from './Avatar.module.scss'
import classNames from "classnames";
import {Image} from "@/UI/Image/Image";
import Users from "@/icons/Users";

type DefaultAvatarProps = {
    picture?: string | null | undefined,
    name: string,
}

export default function Avatar({name, picture}: DefaultAvatarProps) {
    const initials = name && <Users/>

    return (
        picture ?
            <div className={classNames({[s.avatar__picture__img]: true})}><Image url={picture}/></div> :
            <div className={s.avatar}>
                <div className={s.avatar__text}>
                    {initials}
                </div>
            </div>
    )
}
