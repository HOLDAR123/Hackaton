import React, {useCallback, useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";

import PageHeader from "@/components/PageHeader";
import {SelectOption, Select} from "@/UI/Select/Select";
import Toasts from "@/utils/Toasts";

import {useAppDispatch, useAppSelector} from "@hooks/store";
import {setLanguage} from "@store/reducers/settingsReducer";

import SettingsSection from "@/pages/SettingsPage/components/SettingsSection/SettingsSection";

import s from './SettingsPage.module.scss';

export default function SettingsPage() {
    const language = useAppSelector((state) => state.settings.language);
    const dispatch = useAppDispatch();
    const {t} = useTranslation();


    const selectOptions: SelectOption[] = [
        {value: 'en', optionComponent: 'English'},
        {value: 'ru', optionComponent: 'Русский'},
    ];

    const newDefaultValue: SelectOption = {
        value: language,
        optionComponent: language === "en" ? 'English' : 'Русский'
    };

    const handleLanguageChange = useCallback((option: SelectOption | undefined) => {
        if (option) {
            dispatch(setLanguage(String(option.value)));
            Toasts.success(t('alerts.updateSettings.success'));
        }
    }, [dispatch]);


    return (
        <div className={s.container}>
            <PageHeader title={"pages.settings.title"}/>
            <div className={s.container__content}>
                <SettingsSection title={t('pages.settings.general.title')}>
                    <Select optionsList={selectOptions} value={newDefaultValue} setValue={handleLanguageChange}/>
                </SettingsSection>
            </div>
        </div>
    );
}
