import classNames from "classnames";
import React, {Ref, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {ChangeHandler} from "react-hook-form";

import s from './TextArea.module.scss'
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Toasts from "@/utils/Toasts";

type TextAreaProps = {
    label?: string,
    name: string,
    placeholder?: string,
    error?: string | undefined,
    status?: 'active' | 'disable',
    onChange?: any,
    onBlur?: ChangeHandler,
    onSubmit?: () => void,
    touched?: boolean | undefined,
    textareaRef?: Ref<HTMLTextAreaElement>,
    value?: string,
};


export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            label,
            placeholder,
            name,
            onChange,
            onBlur,
            status = 'active',
            error,
            onSubmit,
            touched,
            value,
        }, ref
    ): JSX.Element => {
        const textareaParentRef = useRef<HTMLDivElement>(null);

        const {t} = useTranslation()

        const [copied, setCopied] = useState('text.copy')

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                const target = event.target;
                if (onChange) {
                    onChange(event);
                    setCurrentHeight(target);
                }
            },
            [onChange]
        );

        const location = useLocation()

        const setCurrentHeight = (target: HTMLTextAreaElement) => {
            target.style.height = "0px";
            target.style.height = target.scrollHeight + "px";
        };

        const copyText = (text: string | undefined) => {
            if (text) {
                setCopied('text.copied')
                setTimeout(() => {
                    setCopied('text.copy')
                }, 800)
                navigator.clipboard.writeText(text).then(() => {
                    Toasts.success(t('alerts.copy.success'))
                }).catch(err => {
                    Toasts.error(t('alerts.copy.error'))
                });
            }
        }

        useEffect(() => {
            const parentBlock = textareaParentRef.current;
            const textareaBlock = parentBlock?.querySelector('textarea');
            if (textareaBlock) {
                return setCurrentHeight(textareaBlock);
            }
        }, [textareaParentRef]);

        return (
            <div className={classNames(s.textarea, s[`textarea_${status}`])} ref={textareaParentRef}>
                {label && (
                    <label className={s.textarea__label} htmlFor={name}>
                        {label}
                    </label>
                )}
                <textarea
                    rows={!value ? 1 : undefined}
                    className={classNames(s.textarea__field, error && s.textarea__field_error, location.pathname === "/passwordgenerator" ? s.textAreafield : s.vol)}
                    readOnly={status === 'disable'}
                    name={name}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={onBlur}
                    ref={ref}
                    onSubmit={onSubmit}
                />
                {value && location.pathname !== '/textencryptor' &&
                    <button type="button" onClick={() => copyText(value)}>{t(copied)}</button>
                }
                {error && <p className={s.textarea__error}>{error}</p>}
            </div>
        );
    }
);
