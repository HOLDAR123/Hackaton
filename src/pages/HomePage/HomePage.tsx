import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import s from "./HomePage.module.scss";
import PageHeader from "@/components/PageHeader";
import TextContainer from "@/pages/HomePage/components/TextContainer";
import picture from '../../icons/3789839.jpg'
import classNames from "classnames";

export default function HomePage() {

    const {t} = useTranslation();

    const data = [
        {
            "heading": "tips.heading1",
            "description": "tips.text1"
        },
        {
            "heading": "tips.heading2",
            "description": "tips.text2"
        },
        {
            "heading": "tips.heading3",
            "description": "tips.text3"
        },
        {
            "heading": "tips.heading4",
            "description": "tips.text4"
        },
        {
            "heading": "tips.heading5",
            "description":"tips.text5"
        },
        {
            "heading": "tips.heading6",
            "description": "tips.text6"
        },
        {
            "heading": "tips.heading7",
            "description": "tips.text7"
        },
        {
            "heading": "tips.heading8",
            "description": "tips.text8"
        },
        {
            "heading": "tips.heading9",
            "description": "tips.text9"
        },
        {
            "heading": "tips.heading10",
            "description": "tips.text10"
        },
        {
            "heading": "tips.heading11",
            "description": "tips.text11"
        },
        {
            "heading": "tips.heading12",
            "description": "tips.text12"
        }
    ]


    return (
        <div className={s.container}>
            <PageHeader title={t("asideNavigation.main")}/>
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
                            <span>{t('text.description.text1')}</span>{t('text.heading.text1')}
                        </p>
                        <p>
                            <span>{t('text.description.text2')}</span>{t('text.heading.text2')}
                        </p>
                        <p>
                            <span>{t('text.description.text3')}</span>{t('text.heading.text3')}
                        </p>
                        <p>
                            <span>{t('text.description.text4')}</span>{t('text.heading.text4')}
                        </p>
                    </div>
                </div>

                <div className={s.container__content__heading}>
                    {t('text.theme')}
                </div>

                <div className={s.container__content__tips}>
                    {data.map((item, index) => (
                        <TextContainer key={index} heading={item.heading} description={item.description}/>
                    ))}
                </div>
            </div>
        </div>

    );
}
