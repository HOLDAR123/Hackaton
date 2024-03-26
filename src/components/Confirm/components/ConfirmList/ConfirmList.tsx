import React, {ReactNode} from "react";
import s from './ConfirmList.module.scss'
import classNames from "classnames";

type Props = {
    items: ReactNode[],
    className?: string
}

export default function ConfirmList({items, className}: Props) {
    return (
        <ul className={classNames({
            [s.list]: true,
            [className || '']: !!className
        })}>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    )
}