import React from "react";

import s from './Logotype.module.scss'
import Database from "@/icons/Database";

export default function Logotype() {
    return (
        <div className={s.logotype}>
            <div className={s.logotype__icon}><Database/></div>
        </div>
    )
}
