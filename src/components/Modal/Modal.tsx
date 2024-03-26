import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { CSSTransition } from 'react-transition-group'

import { ModalContext } from "@/providers/ModalProvider";

import Add from "@/icons/Add";

import s from './Modal.module.scss'

type ModalProps = {
    children: ReactNode,
    name: string,
    zIndex?: number
} 

export const Modal = ({children, name, zIndex}: ModalProps) => {
    
    const {modals, close} = useContext(ModalContext)

    const modalRef = useRef(null)

    return (
        <CSSTransition
            timeout={300}
            classNames={{
                enter: s.modal_enter,
                enterActive: s.modal_enter_active,
                exit: s.modal_exit,
                exitActive: s.modal_exit_active,
            }}
            in={modals.findIndex(m => m.key === name) !== -1}
            ref={modalRef}
            unmountOnExit
        >
            <div id={name} className={s.modal} ref={modalRef} style={{
                zIndex: 999 + (zIndex || 0)
            }}>
                <button className={s.modal__close} onClick={() => {
                    close({key: name})
                }}>
                    <Add width={34} height={34} />
                </button>
                {children}
            </div>
        </CSSTransition>
    );
}
