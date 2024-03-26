import React from 'react';

import cardPhoto from '../../../../icons/3789839.jpg'

import s from './TextContainer.module.scss'
import {useTranslation} from "react-i18next";

interface TextContainerProps {
    heading: string;
    description: string;
}

export default function TextContainer ({heading, description}: TextContainerProps) {
    const { t} = useTranslation()
    return (
        <div className={s.container}>
           <div className={s.container__content}>
                <div className={s.container__content__wrapper}>
                    <div className={s.container__content__wrapper__imageWrapper}>
                        <img src={cardPhoto} alt="cardPhoto" className={s.container__content__wrapper__imageWrapper__img}/>
                    </div>
                    <div className={s.container__content__wrapper__heading}>
                        {t(heading)}
                    </div>
                </div>
               <div className={s.container__content__description}>
                   {t(description)}
               </div>
           </div>
        </div>
    )
}
