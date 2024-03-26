import React from 'react';
import {Outlet} from "react-router";

import s from './SimpleLayout.module.scss';

export default function SimpleLayout() {

  return (
    <div className={s.layout}>
      <div className={s.layout__content}>
        <Outlet/>
      </div>
    </div>
  )
}