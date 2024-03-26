import s from './FullScreenLoader.module.scss'
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {CSSTransition} from 'react-transition-group'

interface FullScreenLoaderProps {
    delayIn: number
    disabled: boolean
}

export default function FullScreenLoader({delayIn, disabled}: FullScreenLoaderProps) {
    const loaderRef = useRef(null)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setIsDisabled(disabled)
            }, delayIn)
        }
    }, [disabled])

    return (
        <CSSTransition timeout={delayIn} in={!isDisabled} ref={loaderRef} unmountOnExit>
            <div className={classNames({
                [s.fullscreen]: true,
                [s.fullscreen__disabled]: isDisabled
            })}>
                <div className={classNames({
                    [s.loader]: true,
                    [s.loader__disabled]: isDisabled
                })} ref={loaderRef}>
                    <span className={s.loader__progress}></span>
                    <span className={s.loader__text}>Loading</span>
                    <svg className={s.waves} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 48 150 48" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave"
                                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                        </defs>
                        <g className={s.parallax}>
                            <use href="#gentle-wave" x="48" y="24" fill="#5E3FD9" fillOpacity="0.4"/>
                            <use href="#gentle-wave" x="48" y="28" fill="#3A3372" fillOpacity="0.3"/>
                            <use href="#gentle-wave" x="48" y="32" fill="#5E3FD9" fillOpacity="0.2"/>
                            <use href="#gentle-wave" x="48" y="36" fill="#5E3FD9" fillOpacity="0.1"/>
                        </g>
                    </svg>
                </div>
            </div>
        </CSSTransition>
    );
}
