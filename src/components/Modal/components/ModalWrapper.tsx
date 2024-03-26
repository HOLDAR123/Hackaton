import React, { ReactNode } from "react";

import s from '../Modal.module.scss'

type ModalWrapperProps = {
    children: ReactNode,
    type: 'header' | 'block' | 'block_left' | 'block_right'
};

export const ModalWrapper = ({ children, type }: ModalWrapperProps) => {
    return (
        <div className={s[`modal__${type}`]}>
            {children}
        </div>
    );
}
