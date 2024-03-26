import React from 'react';

import s from './InstructionPage.module.scss'
import PageHeader from "@/components/PageHeader";
import {useTranslation} from "react-i18next";

export default function InstructionPage () {
    const {t} = useTranslation()
    return (
        <div className={s.container}>
            <PageHeader title={"asideNavigation.instruction"} />
            <div className={s.container__content}>
                {t('dialog.text')}
            </div>
        </div>
    )
}
