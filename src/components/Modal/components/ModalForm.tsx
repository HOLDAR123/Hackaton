import React, { ReactNode } from "react";

import s from '../Modal.module.scss'

type ModalFormProps = {
    children: ReactNode,
    onSubmit: React.FormEventHandler<HTMLFormElement>
};

export const ModalForm = ({ children, onSubmit }: ModalFormProps) => {
    return (
        <form className={s.modal__wrapper} onSubmit={onSubmit}>
            {children}
        </form>
    );
}
