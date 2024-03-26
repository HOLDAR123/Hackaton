import React, {useState} from 'react';

import s from './GeneratePassword.module.scss'
import {TextArea} from "@/UI/TextArea";
import Play from "@/icons/Play";
import {useTranslation} from "react-i18next";

export default function GeneratePassword() {

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(10);
    const [useUpperCase, setUseUpperCase] = useState(false);
    const [useLowerCase, setUseLowerCase] = useState(false);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const generatePassword = () => {
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()-_=+[{]}|;:,<.>/';
        let allowedChars = '';

        if (useUpperCase) allowedChars += upperCaseChars;
        if (useLowerCase) allowedChars += lowerCaseChars;
        if (useNumbers) allowedChars += numberChars;
        if (useSymbols) allowedChars += symbolChars;

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            newPassword += allowedChars[randomIndex];
        }

        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
    };

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        const lengthBonus = password.length * 4;
        const upperCaseBonus = /[A-Z]/.test(password) ? (password.length - password.replace(/[A-Z]/g, '').length) * 2 : 0;
        const lowerCaseBonus = /[a-z]/.test(password) ? (password.length - password.replace(/[a-z]/g, '').length) * 2 : 0;
        const numberBonus = /\d/.test(password) ? password.replace(/[^0-9]/g, '').length * 4 : 0;
        const symbolBonus = /[!@#$%^&*()\-_=+[\]{}|;:',<.>/?]/.test(password) ? password.replace(/[^\W_]/g, '').length * 6 : 0;
        const requirementsBonus = ((upperCaseBonus > 0 ? 1 : 0) + (lowerCaseBonus > 0 ? 1 : 0) + (numberBonus > 0 ? 1 : 0) + (symbolBonus > 0 ? 1 : 0) >= 3 ? (password.length >= 8 ? 2 : 0) : 0);

        strength = lengthBonus + upperCaseBonus + lowerCaseBonus + numberBonus + symbolBonus + requirementsBonus;

        const maxPossibleScore = 100;
        const normalizedStrength = Math.min(Math.floor((strength / maxPossibleScore) * 5), 5);

        return normalizedStrength;
    };

    const {t} = useTranslation()

    const handleRangeChange = (e: any) => {
        setLength(parseInt(e.target.value, 10));
    };

    const handleTextChange = (e: any) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) { // Проверка на валидность введённого числа
            setLength(value);
        }
    };

    const getColorClass = () => {
        if (passwordStrength < 2) {
            return `${s.low}`;
        } else if (passwordStrength < 4) {
            return `${s.medium}`;
        } else {
            return `${s.high}`;
        }
    };
    return (
        <div className={s.container}>
            <div className={s.container__content}>
                <div className={s.container__content__inputWrapper}>
                    <div className={s.wrapper}>
                        <TextArea name={"CAt"} placeholder={t('text.text')} value={password}/>
                        <div className={s.progressBar}>
                            <div className={`${s.progress} ${getColorClass()}`}
                                 style={{width: `${(passwordStrength / 5) * 100}%`}}/>
                        </div>
                    </div>
                    <button className={s.container__content__inputWrapper__button} onClick={generatePassword}>
                        <Play/>
                    </button>
                </div>
                <div className={s.container__content__wrapper}>
                    <div className={s.container__content__wrapper__leftPart}>
                        <label>{t('text.password')}:</label>
                        <input type="range" min="0" max="100" value={length}
                               onChange={handleRangeChange}/>
                        <div className={s.lengthCounter}>
                            <input type="text" value={length} onChange={handleTextChange}/>
                        </div>
                    </div>

                    <div className={s.container__content__wrapper__rightPart}>
                        <div>
                            <label>{t('text.include.text3')}</label>
                            <input  type="checkbox" checked={useNumbers} className={s.checkboxCustom}
                                   onChange={(e) => setUseNumbers(e.target.checked)}/>
                        </div>
                        <div>
                            <label>{t('text.include.text4')}</label>
                            <input className={s.checkboxCustom} type="checkbox" checked={useSymbols}
                                   onChange={(e) => setUseSymbols(e.target.checked)}/>
                        </div>
                        <div>
                            <label>{t('text.include.text1')}</label>
                            <input className={s.checkboxCustom} type="checkbox" checked={useUpperCase}
                                   onChange={(e) => setUseUpperCase(e.target.checked)}/>
                        </div>
                        <div>
                            <label>{t('text.include.text2')}</label>
                            <input className={s.checkboxCustom} type="checkbox" checked={useLowerCase}
                                   onChange={(e) => setUseLowerCase(e.target.checked)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

