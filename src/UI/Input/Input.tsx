import { forwardRef, ForwardedRef, ChangeEvent } from "react";
import classNames from "classnames";

import s from './Input.module.scss'

type InputProps = {
    label?: string,
    name: string,
    placeholder?: string,
    type?: 'email' | 'text' | 'password' | 'number',
    error?: string | undefined,
    status?: 'active' | 'disable',
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void,
    onSubmit?: () => void,
    touched?: boolean | undefined,
    value?: string | number | readonly string[] | undefined,
};

const Input = forwardRef((
    {
        label,
        placeholder,
        type,
        name,
        onChange,
        onBlur,
        status = 'active',
        error,
        onSubmit,
        touched,
        value,
    }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    return (
        <div className={classNames(s.input, s[`input_${status}`])}>
            {label && (
                <label className={s.input__label} htmlFor={name}>{label}</label>
            )}
            <input
                className={classNames(s.input__field, s[`input__field_${type}`], error && s.input__field_error)}
                readOnly={status === 'disable'}
                name={name}
                value={value}
                id={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                onSubmit={onSubmit}
            />
            {error && <p className={s.input__error}>{error}</p>}
        </div>
    )
});

export default Input;
