import React, { ReactNode } from "react";
import classNames from "classnames";

import s from './Tag.module.scss'

type Props = {
    children: ReactNode
};

export default function Tag({ children }: Props) {
    return (
        <div className={classNames({
            [s.tag]: true
        })}>
            {children}
        </div>
    );
}
