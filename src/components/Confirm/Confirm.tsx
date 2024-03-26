import React, {useRef} from "react";
import useConfirm from "@hooks/useConfirm";
import {CSSTransition} from 'react-transition-group'

import s from './Confirm.module.scss'
import Button from "@/UI/Button";

export default function Confirm() {
    const {onConfirm, onCancel, isActive, node} = useConfirm();
    const confirmRef = useRef(null)

    return (
        <CSSTransition
            timeout={300}
            in={isActive}
            ref={confirmRef}
            unmountOnExit
            classNames={{
                enter: s.confirmEnter,
                enterActive: s.confirmEnterActive,
                exit: s.confirmExit,
                exitActive: s.confirmExitActive,
            }}
        >
            <div className={s.confirm} ref={confirmRef}>
                <div className={s.confirmBackdrop} onClick={onCancel}/>
                <div className={s.confirmWindow}>
                    <div className={s.confirmContent}>{node}</div>
                    <div className={s.confirmFooter}>
                        <Button onClick={onCancel} className={s.confirmCancel}>No</Button>
                        <Button onClick={onConfirm} className={s.confirmSuccess}>Yes</Button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}