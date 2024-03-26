import {ReactNode, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

import {useOutsideClick} from '@/hooks/useOutsideClick';

import ArrowDown from '@/icons/ArrowDown';

import s from './Select.module.scss'

type Props = {
    optionsList?: SelectOption[],
    value?: SelectOption,
    setValue: (value: Props['value']) => void,
    defaultValue?: string,
    translateJsonPath?: string,
};

export type SelectOption = {
    value: string | number,
    optionComponent?: ReactNode,
    color?: string,
}

export const Select = ({ optionsList, value, setValue, defaultValue = '', translateJsonPath=undefined}: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { t } = useTranslation();

    const selectRef = useOutsideClick(()=>setIsOpen(false))

    const setSelectValue = useCallback(() => {
        if (value) {
            if (value.optionComponent) {
                return value.optionComponent;
            } else return translateJsonPath? t(`${translateJsonPath}.${value.value}`) : value.value;
        } else if (defaultValue) {
            return translateJsonPath? t(`${translateJsonPath}.${defaultValue}`) : defaultValue;
        } else {
            return t('selects.placeholder');
        }
    }, [value, defaultValue]);


    const handleSelect = (selectValue: SelectOption) => {
        setValue(selectValue);
        setIsOpen(false);
    }

    return (
        <div className={s.select} ref={selectRef}>
            <div className={classNames(s.select__block, isOpen && s.select__block_open)} onClick={() => setIsOpen(!isOpen)}>
                <div
                    className={s.select__block__value}
                    style={{ color: `${value?.color}` }}>
                    {setSelectValue()}
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
                                style={{ color: `${item?.color}` }}
                            >
                                {item.optionComponent ? item.optionComponent : translateJsonPath? t(`${translateJsonPath}.${item.value}`) : item.value}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}
