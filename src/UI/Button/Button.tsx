import React from "react";
import classNames from "classnames";

import s from './Button.module.scss'
import Ripple from "@/components/Ripple";


export default function Button({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button type="button" className={classNames(s.button, className)} {...props}>
            {children}
            <Ripple duration={850} color="#ffffff" />
        </button>
    );
}
