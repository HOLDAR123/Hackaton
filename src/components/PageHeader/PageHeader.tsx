import React, { ReactNode } from 'react';

import classNames from "classnames";
import {useTranslation} from "react-i18next";

import s from './PageHeader.module.scss'

interface PageHeaderProps {
    title: string;
    childrenPosition?: 'start' | 'end';
    children?: ReactNode;
}

export default function PageHeader({title, children, childrenPosition}: PageHeaderProps) {

    const {t} = useTranslation()

    return (
        <div className={s.pageHeader}>
            <div className={s.pageHeader__title}>
                {t(title)}
            </div>
            {children && (
                <div className={classNames({
                    [s.pageHeader__wrapper]: true,
                    [s.pageHeader__wrapper_start]: childrenPosition === 'start',
                    [s.pageHeader__wrapper_end]: childrenPosition === 'end',
                })}>
                    {children}
                </div>
            )}
        </div>
    )
}