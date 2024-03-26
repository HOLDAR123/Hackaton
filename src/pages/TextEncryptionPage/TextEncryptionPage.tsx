import React, {useEffect, useState} from 'react';

import s from './TextEncryptionPage.module.scss'
import {useTranslation} from "react-i18next";
import PageHeader from "@/components/PageHeader";
import picture from "@/icons/2181062.jpg";
import classNames from "classnames";
import {TextArea} from "@/UI/TextArea";
import Button from "@/UI/Button";
import Select from "@/UI/Select";
import {SelectOption} from "@/UI/Select/Select";
import Close from "@/icons/Close";

export default function TextEncryptionPage() {


    const {t} = useTranslation()

    const [text, setText] = useState("");
    const [encryptedText, setEncryptedText] = useState("");
    const [cryptoHash, setCryptoHash] = useState<SelectOption | undefined>(undefined);
    const [encryptionShift, setEncryptionShift] = useState(3);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<any>) => {
        setText(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleEncrypt = async () => {
        if (!text || !cryptoHash) {
            return;
        }


        const textBuffer = new TextEncoder().encode(text);
        let hash;

        switch (cryptoHash.value) {
            case 'md5':
                hash = await crypto.subtle.digest("SHA-512", textBuffer);
                break;
            case 'sha1':
                hash = await crypto.subtle.digest("SHA-1", textBuffer);
                break;
            case 'sha256':
                hash = await crypto.subtle.digest("SHA-256", textBuffer);
                break;
            case 'crc32':
                hash = await crypto.subtle.digest("SHA-256", textBuffer);
                break;
            case 'sha384':
                hash = await crypto.subtle.digest("SHA-384", textBuffer);
                break;
            case 'custom': // Your custom encryption method
                hash = encryptText(text, encryptionShift);
                setEncryptedText(hash);
                return;
            case 'sha512':
                hash = await crypto.subtle.digest("SHA-512", textBuffer);
                break;
            default:
                console.error("Unsupported hash algorithm selected");
                return;
        }
        toggleMenu()
        setEncryptedText(hex(hash));
    };

    const handleSelectChange = (selectedOption: SelectOption | undefined) => {
        setCryptoHash(selectedOption);
    };

    const encryptText = (inputText:any, shift:any) => {
        return inputText.split('').map((char: any) => {
            let isLetter = char.match(/[a-z]/i);
            if (isLetter) {
                let code = char.charCodeAt(0);
                let shiftOffset = shift % 26;
                if ((code >= 65) && (code <= 90))
                    return String.fromCharCode(((code - 65 + shiftOffset) % 26) + 65); // Uppercase
                else if ((code >= 97) && (code <= 122))
                    return String.fromCharCode(((code - 97 + shiftOffset) % 26) + 97); // Lowercase
            }
            return char; // Non-alphabetic characters are not changed
        }).join('');
    };

    const selectOptions: SelectOption[] = [
        {value: 'md5', optionComponent: 'MD5'},
        {value: 'sha1', optionComponent: 'SHA-1'},
        {value: 'crc32', optionComponent: 'crc32'},
        {value: 'sha384', optionComponent: 'SHA-384'},
        {value: 'sha256', optionComponent: 'SHA-256'},
        {value: 'sha512', optionComponent: 'SHA-512'},
        {value: 'custom', optionComponent: 'Custom'},
    ];

    const hex = (buffer: ArrayBuffer) => {
        return Array.from(new Uint8Array(buffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('bodyNoScroll');
        } else {
            document.body.classList.remove('bodyNoScroll');
        }
    }, [isMenuOpen]);



    return (
        <div className={s.container}>
            <PageHeader title={t('asideNavigation.textEncryptor')}/>
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
                            <span>{t('encrypted.heading1')}</span> {t('encrypted.text1')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading2')}</span> {t('encrypted.text2')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading3')}</span>{t('encrypted.text3')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading4')}</span> {t('encrypted.text4')}
                        </p>
                        <p>
                            <span>{t('encrypted.text')}</span>
                        </p>
                        <p>
                            <span>{t('encrypted.heading5')}</span> {t('encrypted.text5')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading6')}</span> {t('encrypted.text6')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading7')}</span> {t('encrypted.text7')}
                        </p>
                        <p>
                            <span>{t('encrypted.heading8')}</span> {t('encrypted.text8')}
                        </p>
                    </div>
                </div>

                <div className={s.container__content__heading}>
                    {t('text.theme1')}
                </div>

                <div className={s.container__content__textEncryption}>
                    <div className={s.container__content__textEncryption__input}>
                        <TextArea
                            name="text"
                            onChange={handleChange}
                            value={text}
                        />
                        <div className={s.container__content__textEncryption__input__settings}>
                            <Select setValue={handleSelectChange} value={cryptoHash} optionsList={selectOptions}></Select>
                            <Button disabled={!cryptoHash} onClick={handleEncrypt} className={s.container__content__textEncryption__input__button}>{t('text.buttons')}</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${s.fullScreenMenu} ${isMenuOpen ? `${s.open}` : ''}`} >
                <div className={s.modalContent}>
                    <button onClick={toggleMenu}><Close/></button>
                    <div>
                        Ваш зашифрованный текст
                    </div>
                    <div className={s.modalContent__text}>
                        {encryptedText}
                    </div>
                </div>
            </div>

        </div>
    )
}
