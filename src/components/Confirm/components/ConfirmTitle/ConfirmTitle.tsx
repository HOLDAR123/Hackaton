import React, {ReactNode} from "react";
import s from './ConfirmTitle.module.scss'

type Props = {
    children: ReactNode
}

export default function ConfirmTitle({children}: Props) {

    return (
        <p className={s.title}>{children}</p>
    )
}