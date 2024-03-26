import React from 'react';
import {useTranslation} from "react-i18next";

import s from './Error404Page.module.scss'
import Button from "@/UI/Button";
import {useNavigate} from "react-router-dom";

export default function Error404Page() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <div className={s.container__content}>
        <p className={s.container__title}>{t('pages.error404.title')}</p>
        <p className={s.container__description}>{t('pages.error404.description')}</p>
        <Button className={s.container__button} type="button" onClick={() => {
          navigate('/')
        }}>{t('pages.error404.button')}</Button>
      </div>
    </div>
  )
}