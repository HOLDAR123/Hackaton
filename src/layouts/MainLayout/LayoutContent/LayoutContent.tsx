import React, {ReactNode, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import 'style.css';
import FullScreenLoader from "@/UI/FullScreenLoader/FullScreenLoader";
import s from './LayoutContent.module.scss';

type LayoutContentProps = {
    children: ReactNode;
}

export default function LayoutContent({children}: LayoutContentProps) {
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        setShowLoader(true);

        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 800);

        return () => clearTimeout(timer);

    }, [location.pathname]); // Listen for changes to location.pathname

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <div className={s.layoutContent}>
                    {showLoader ? (
                        <FullScreenLoader delayIn={800} disabled={false}/>
                    ) : (
                        <div className={s.layoutContent__wrapper}>
                            {children}
                        </div>
                    )}
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}
