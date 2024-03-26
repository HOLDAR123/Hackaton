import {useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames"
import ReactInputMask from "react-input-mask";
import {DateTime} from "luxon";
import {useTranslation} from "react-i18next";

import {useOutsideClick} from "@/hooks/useOutsideClick";

import Calendar, {CalendarProps} from "../Calendar/Calendar";

import CalendarImg from "@/icons/Calendar";
import ArrowDown from "@/icons/ArrowDown";

import s from './SelectCalendar.module.scss';

interface SelectCalendarProps extends CalendarProps {
    openImg?: boolean,
    calendarImg?: boolean,
};

export const SelectCalendar = ({setValue, value, openImg = true, calendarImg = true, canSelectPrevious=true, canSelectTime=true, previousStartDay, calendarMode='day'}: SelectCalendarProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>()

    const selectRef = useOutsideClick(() => setIsOpen(false))

    const {t} = useTranslation();

    const handleSetSelect = useCallback((val: SelectCalendarProps['value']) => {
        setValue(val);
        setIsOpen(false);
    }, [value])

    const dateFormatRegular: RegExp = /^\d{2}\.\d{2}\.\d{4}$/ //только дата
    const dateFormatWithTimeRegular: RegExp = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/ //дата и время
    const dateFormatMonthRegular: RegExp = /^\d{2}\.\d{4}$/;

    const dateMask = useMemo(()=>{
        if (calendarMode === 'day') {
            return canSelectTime? "99.99.9999 99:99" : "99.99.9999"
        }
        else return "99.9999"
    }, [canSelectTime, calendarMode])

    //преобразование строки в дату +- (работает, но я не уверен что фукнционл должен быть такой)
    useEffect(() => {
        // console.log(inputValue)
        if (inputValue) {
            if (calendarMode === 'day') {
                if (canSelectTime) {
                    if (dateFormatWithTimeRegular.test(inputValue)) {
                        const newDate = DateTime.fromFormat(inputValue, 'dd.MM.yyyy HH:mm')
                        if (newDate.isValid && newDate.toISO() !== value?.toISO()) {
                            setValue(newDate)
                        }
                    }
                }
                else {
                    if (dateFormatRegular.test(inputValue)) {
                        const newDate = DateTime.fromFormat(inputValue, 'dd.MM.yyyy')
                        if (newDate.isValid && newDate.toISO() !== value?.toISO()) {
                            setValue(newDate)
                        }
                    }
                }
            }
            else if (calendarMode === 'month') {
                if (dateFormatMonthRegular.test(inputValue)){
                    const newDate = DateTime.fromFormat(inputValue, 'MM.yyyy')
                    if (newDate.isValid && newDate.toISO() !== value?.toISO()) {
                        setValue(newDate)
                    }
                }
            }
        }
        else {
            // console.log(true)
            setValue(null)
        }
    }, [inputValue])

    //форматирование если параметр выбора времени изменен +
    useEffect(()=>{
        if (!canSelectTime && inputValue && calendarMode === 'day') {
            if (dateFormatWithTimeRegular.test(inputValue)) {
                setInputValue(inputValue.slice(0, 10))
            }
        }
    }, [canSelectTime])

    //преобразование даты в строку +
    useEffect(() => {
        console.log(value?.toObject())
        if (value) {
            if (calendarMode === 'month') {
                setInputValue(value.toFormat('MM.yyyy'))
            }
            else if (calendarMode === 'day'){
                setInputValue(value.toFormat('dd.MM.yyyy HH:mm'))
            } 
        }
        else {
            setInputValue('')
        }
    }, [value])

    return (
        <div className={s.select} ref={selectRef}>
            <div className={classNames(s.select__block, isOpen && s.select__block_open)}
                 onClick={() => setIsOpen(!isOpen)}>
                {calendarImg && <CalendarImg width={20} height={20}/>}
                <div className={s.select__block__input}>
                    <ReactInputMask
                        mask={dateMask}
                        maskChar={''}
                        value={inputValue}
                        placeholder={t('selects.placeholder')}
                        onChange={(e) => setInputValue(e.target.value)}  
                    />
                </div>
                {openImg && (
                    <div className={classNames(s.select__block__arrow, isOpen && s.select__block__arrow_active)}>
                        <ArrowDown/>
                    </div>
                )}
            </div>
            <div className={classNames(s.select__calendar, isOpen && s.select__calendar_open)}>
                <Calendar 
                    value={value} 
                    setValue={handleSetSelect} 
                    canSelectPrevious={canSelectPrevious}
                    canSelectTime={canSelectTime}
                    previousStartDay={previousStartDay}
                    calendarMode={calendarMode}
                />
            </div>
        </div>
    );
}