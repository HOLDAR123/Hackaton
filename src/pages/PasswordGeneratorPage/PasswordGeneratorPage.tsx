import React from 'react';
import PageHeader from "@/components/PageHeader";

import s from './PasswordGeneratorPage.module.scss'
import {useTranslation} from "react-i18next";
import picture from "@/icons/3830277.jpg";
import classNames from "classnames";
import GeneratePassword from "@/pages/PasswordGeneratorPage/components/GeneratePassword";

export default function PasswordGeneratorPage () {

    const {t} = useTranslation()
    return (
        <div className={s.container}>
           <PageHeader title={t('asideNavigation.passwordGenerator')}/>
            <div className={s.container__content}>
                <div className={s.container__content__article}>
                    <div className={s.container__content__article__wrapper}>
                        <img src={picture} alt='photo' className={classNames({
                            [s.container__content__article__wrapper__img]: true,
                        })}/>
                        <div className={classNames({
                            [s.container__content__article__text]: true,
                        })}>
                            Steps with a Shield
                        </div>
                    </div>
                    <div className={s.container__content__article__articleText}>
                        <p>
                            <span>{t('password.heading')}</span> {t('password.text')}
                        </p>
                        <p>
                            <span>{t('password.heading1')}</span> {t('password.text1')}
                        </p>
                        <p>
                            <span>{t('password.heading2')}</span>,
                            {t('password.text2')}
                        </p>
                        <p>
                            <span>{t('password.heading3')}</span>{t('password.text3')}
                        </p>

                        <p>
                            <span>{t('password.texxt')}</span>
                        </p>
                        <p>
                            <span>{t('password.heading4')}</span>{t('password.text4')}
                        </p>
                        <p>
                            <span>{t('password.heading5')}</span>{t('password.text5')}
                        </p>
                        <p>
                            <span>{t('password.heading6')}</span>{t('password.text6')}
                        </p>
                        <p>
                            <span>{t('password.heading7')}</span>{t('password.text7')}
                        </p>
                    </div>
                </div>

                <div className={s.container__content__heading}>
                    {t('text.theme2')}
                </div>

                <div className={s.container__content__passwordGenerator}>
                    <GeneratePassword/>
                </div>
            </div>
        </div>
    );
}
