import React from 'react';

import {Outlet} from "react-router";

import LayoutHeader from "@/layouts/MainLayout/LayoutHeader";
import LayoutAside from "@/layouts/MainLayout/LayoutAside";
import LayoutContent from "@/layouts/MainLayout/LayoutContent";

import s from './MainLayout.module.scss';
import {useLocation} from "react-router-dom";

import 'style.css'

export default function MainLayout() {
  const location = useLocation();
    return (
                <div className={s.layout}>
                    <div className={s.layout__content}>
                        <div className={s.layout__content__leftPart}>
                            <LayoutAside/>
                        </div>
                        <div className={s.layout__content__rightPart}>
                            <div className={s.layout__content__rightPart__header}>
                                <LayoutHeader/>
                            </div>
                            <div className={s.layout__content__rightPart__content}>
                                <LayoutContent>
                                    <Outlet/>
                                </LayoutContent>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
