import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';


import Avatar from '@/components/UserCard/components/Avatar';

import ArrowDown from '@/icons/ArrowDown';

import s from './SelectUser.module.scss'
import Checkbox from '../Checkbox';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type Props = {
    optionsList?: any[],
    value?: any[],
    setValue: (value: Props['value'])=>void,
    maxLength?: number,
};

export const SelectUser = ({ value, setValue, maxLength=10, optionsList }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {t} = useTranslation();

    const selectRef = useOutsideClick(()=>setIsOpen(false))

    const setSelectValue = useCallback(() => {
        if (value) {
            if (value.length > 0) {
                return value.map((item, index) => {
                    if (index < maxLength) {
                        return (
                            <div className={s.select__block__value__item} key={index}>
                                <Avatar name={item.name} picture={item.picture}/>
                            </div>
                        )
                    }
                })
            }
            else return t('selects.placeholder')
        }
        else {
            return t('selects.placeholder')
        }
    }, [value])

    const handleSelect = (selectValue: any) => {
        if (value) {
            if (value.findIndex((el) => el.id === selectValue.id) === -1) {
                setValue([...value, selectValue]);
            }
            else {
                setValue(value.filter((el) => el.id !== selectValue.id));
            }
        }
        else setValue([selectValue])
    }

    return (
        <div className={s.select} ref={selectRef}>
            <div className={classNames(s.select__block, isOpen && s.select__block_open)} onClick={() => setIsOpen(!isOpen)}>
                <div className={classNames(s.select__block__value, s.select__block__value_array)}>
                    {setSelectValue()}
                    {value && value.length > maxLength && (
                        <div className={s.select__block__value__item__overflow}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                </div>
                <div className={classNames(s.select__block__arrow, isOpen && s.select__block__arrow_active)}>
                    <ArrowDown />
                </div>
            </div>
            <div className={classNames(s.select__options, isOpen && s.select__options_open)}>
                <ul className={s.select__options__wrapper}>
                    {optionsList?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={s.select__options__item}
                                onClick={() => { handleSelect(item) }}
                            >
                                <div className={s.select__options__item__img}>
                                    <Avatar name={item.name} picture={item.picture}/>
                                </div>
                                <p>{item.name}</p>
                                <Checkbox
                                    className={s.select__options__item__checkbox}
                                    checked={Array.isArray(value) && value.findIndex((el) => el.id === item.id) !== -1}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

