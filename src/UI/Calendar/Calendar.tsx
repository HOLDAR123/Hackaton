import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import classNames from 'classnames';

import getLanguage from '@/utils/getLanguage';

import CalendarDays from './CalendarDays/CalendarDays';

import s from './Calendar.module.scss'
import ArrowDown from '@/icons/ArrowDown';
import ReactInputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import CalendarMonths from './CalendarMonths/CalendarMonths';

export type YearObject = {
    month: MonthObject,
    weeks: WeeksArray[]
}

export type MonthObject = {
    monthDateTime: DateTime,
    isActive: boolean,
    isDisable: boolean
}

type WeeksArray = {
    weekDateTime: DateTime,
    days: DayObject[]
}

type DayObject = {
    dayDateTime: DateTime,
    isCurrentDay: boolean,
    isWeekend: boolean,
    isCurrentMonth: boolean,
    isDisable: boolean,
    // isActive: boolean
}

type CalendarSteps = 'days' | 'month'

export type CalendarProps = {
    value: DateTime | undefined | null,
    setValue: (value: CalendarProps['value']) => void,
    canSelectPrevious?: boolean,
    canSelectTime?: boolean,
    previousStartDay?: DateTime,
    calendarMode?: 'month' | 'day'
}

const Calendar = ({
    value,
    setValue,
    canSelectPrevious = true,
    canSelectTime = true,
    previousStartDay,
    calendarMode='day'
}: CalendarProps) => {

    const [yearData, setYearData] = useState<YearObject[]>() //массив месяцев текущего года
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now()) //год
    const [currentMonth, setCurrentMonth] = useState<number>(DateTime.now().month) //номер месяца
    const [selectDate, setSelectDate] = useState<DateTime>(DateTime.now()) //выбранный день
    const [selectTime, setSelectTime] = useState<string>() //время, не зависит от выбранного дня
    const [activeTab, setActiveTab] = useState<CalendarSteps>('days') //состояние выбора (дни в месяце или месяцы в году)
    const [submitCount, setSubmitCount] = useState<number>()

    //параметр последнего дня, после которого выбор невозможен
    const previousStartDayDateTime = useMemo(() => {
        return previousStartDay ?? DateTime.now()
    }, [previousStartDay])

    const canSelectTimeState = useMemo(()=> {
        if (calendarMode === 'month') {
            return false
        }
        else return canSelectTime
    }, [canSelectTime, calendarMode])

    const { t } = useTranslation();
    const language = getLanguage()

    //установка yearData +
    const getYearData = (): YearObject[] => {
        const yearArray: YearObject[] = []
        for (let i = 0; i < 12; i++) {
            const month = currentDate.startOf('year').plus({ month: i }).setLocale(language)
            yearArray.push({
                month: {
                    monthDateTime: month,
                    isDisable: !canSelectPrevious ? (month.month < previousStartDayDateTime.month) && (month.year <= previousStartDayDateTime.year) : false,
                    isActive: month.month === currentMonth && month.year === currentDate.year
                },
                weeks: []
            })
        }
        for (let j = 0; j < yearArray.length; j++) {
            const monthObject = yearArray[j]
            const week = monthObject.month.monthDateTime.startOf('month').startOf('week')
            for (let i = 0; i < 6; i++) {
                const currentWeek = week.startOf('day').plus({ days: 7 * i }).setLocale(language)
                monthObject.weeks.push({ weekDateTime: currentWeek, days: [] })
            }
            for (let i = 0; i < monthObject.weeks.length; i++) {
                const weekArray = monthObject.weeks[i]
                for (let j = 0; j < 7; j++) {
                    const currentDay = weekArray.weekDateTime.plus({ day: j }).setLocale(language)
                    weekArray.days.push({
                        dayDateTime: currentDay,
                        isCurrentDay: DateTime.now().toISODate() === currentDay.toISODate(),
                        isWeekend: currentDay.isWeekend,
                        isCurrentMonth: currentDay.month === monthObject.month.monthDateTime.month,
                        isDisable: !canSelectPrevious ? (currentDay.toISODate() as string) < (previousStartDayDateTime.toISODate() as string) : false,
                    })

                }
            }
        }
        return yearArray
    };

    //+
    const setCalendarHeader = useCallback(() => {
        if (yearData) {
            const activeMonth = yearData[yearData.findIndex((el) => el.month.isActive)].month.monthDateTime
            return (
                <button type="button" className={s.calendar__select__item}
                    onClick={() => calendarMode === 'day'?  setActiveTab(activeTab === 'days' ? 'month' : 'days') : null}>
                    {activeTab === 'days' ? (
                        <>{activeMonth.monthLong} {activeMonth.year}</>
                    ) : (
                        <>{activeMonth.year}</>
                    )}
                </button>
            )
        }
    }, [yearData, activeTab])

    //изменение yearData +- (наверняка можно оптимизировать)
    useEffect(() => {
        setYearData(getYearData())
    }, [currentMonth, previousStartDay, selectDate, currentDate, canSelectPrevious, previousStartDayDateTime])

    //установка начаальных параметров value +
    useEffect(() => {
        if (value) {
            setCurrentDate(value)
            setSelectDate(value)
            if (String(value.hour) && String(value.minute)) {
                setSelectTime(`${String(value.hour).padStart(2, '0')}: ${String(value.minute).padStart(2, '0')}`)
            }
        } else handleReset()
    }, [value])


    // если выбран день не текущего месяца +
    useEffect(() => {
        setCurrentMonth(selectDate.month)
    }, [selectDate])

    //корректный месяц если установлено ограничение предыдущего дня +
    useEffect(() => {
        if (previousStartDayDateTime) {
            setCurrentMonth(previousStartDayDateTime.month)
        }
    }, [previousStartDayDateTime])

    useEffect(()=> {
        if (calendarMode === 'day') {
            setActiveTab('days')
            
        }
        else if (calendarMode === 'month') {
            setActiveTab('month')
        }
    }, [calendarMode])

    //следующий месяц / год +
    const handleArrowNext = () => {
        if (activeTab === 'days') {
            if (currentMonth >= 12) {
                setCurrentDate(DateTime.fromObject({ year: currentDate.year + 1 }))
                setCurrentMonth(1)
            } else setCurrentMonth(currentMonth + 1)
        } else if (activeTab === 'month') {
            return setCurrentDate(DateTime.fromObject({ year: currentDate.year + 1 }))
        }
    }

    //предыдущий месяц / год +
    const handleArrowPrev = () => {
        if (activeTab === 'days') {
            if (canSelectPrevious) {
                if (currentMonth <= 1) {
                    setCurrentDate(DateTime.fromObject({ year: currentDate.year - 1 }))
                    setCurrentMonth(12)
                } else setCurrentMonth(currentMonth - 1)
            } else {
                if (currentDate.year > previousStartDayDateTime.year) {
                    if (currentMonth <= 1) {
                        setCurrentDate(DateTime.fromObject({ year: currentDate.year - 1, month: 12 }))
                        setCurrentMonth(12)
                    } else setCurrentMonth(currentMonth - 1)
                } else if (currentMonth > previousStartDayDateTime.month) {
                    setCurrentMonth(currentMonth - 1)
                }
            }
        } else if (activeTab === 'month') {
            if (canSelectPrevious) {
                return setCurrentDate(DateTime.fromObject({ year: currentDate.year - 1 }))
            } else if (currentDate.year > previousStartDayDateTime.year) {
                return setCurrentDate(DateTime.fromObject({ year: currentDate.year - 1 }))
            }
        }

    }

    //форматирование поля времени, если заполнено неверно +
    const handleTime = (value: string) => {
        const time = {
            hour: Number(value.split(':')[0]) ?? undefined,
            minute: Number(value.split(':')[1]) ?? undefined,
        }
        if (time.hour || time.minute) {
            if (time.hour > 24) {
                time.hour = 23
                time.minute = 59
            } else if (time.hour < 0) {
                time.hour = 0
                time.minute = 0
            } else if (time.minute > 60) {
                time.minute = 59
            } else if (time.minute < 0) {
                time.minute = 0
            }
            setSelectTime(`${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`)
        } else setSelectTime('')
    }

    //применение даты +- (надо тестить много вариантов)
    const handleSubmit = () => {
        if (calendarMode === 'day') {
            if (selectDate) {
                if (canSelectTimeState) {
                    if (selectTime) {
                        const time = {
                            hour: Number(selectTime?.split(':')[0]),
                            minute: Number(selectTime?.split(':')[1])
                        }
                        setValue(selectDate.set({ ...time }))
                        handleReset()
                    } else setSubmitCount(submitCount ? submitCount + 1 : 1)
                } else {
                    setValue(selectDate)
                    handleReset()
                }
            } else setSubmitCount(submitCount ? submitCount + 1 : 1)
        }
        else {
            setValue(DateTime.fromObject({year: currentDate.year, month: currentMonth}))
        }
    }

    //сброс даты и всех параметров +
    const handleReset = (resetValue: boolean = false) => {
        setSubmitCount(undefined)
        setSelectDate(DateTime.now())
        setSelectTime('')
        setCurrentMonth(DateTime.now().month)
        if (resetValue) {
            setValue(null)
        }
    }

    // useEffect(()=>{
    //     console.log('yearData', yearData)
    //     console.log('value', value?.toObject())
    //     console.log('selectDate', selectDate.toObject())
    //     console.log('selectTime', selectTime)
    //     console.log('currentMonth', currentMonth)
    // }, [value, selectDate, selectTime, currentMonth, yearData])

    return (
        <div className={s.calendar}>
            <div className={s.calendar__header}>
                <button type="button" className={classNames(s.calendar__header__arrow, s.calendar__header__arrow_prev)}
                    onClick={handleArrowPrev}>
                    <ArrowDown />
                </button>
                {setCalendarHeader()}
                <button type="button" className={classNames(s.calendar__header__arrow, s.calendar__header__arrow_next)}
                    onClick={handleArrowNext}>
                    <ArrowDown />
                </button>
            </div>
            <div className={classNames({
                [s.calendar__wrapper]: true,
                [s.calendar__wrapper_active]: activeTab === 'days' && calendarMode === 'day',
                [s.calendar__wrapper_error]: !selectDate,
            })}>
                <CalendarDays
                    currentDate={currentDate}
                    selectDate={selectDate}
                    setSelectDate={setSelectDate}
                    value={value}
                    yearData={yearData}
                />
            </div>
            <div className={classNames({
                [s.calendar__wrapper]: true,
                [s.calendar__wrapper_active]: activeTab === 'month',
                [s.calendar__wrapper_error]: !currentMonth,
            })}>
                <CalendarMonths
                    yearData={yearData}
                    setCurrentMonth={setCurrentMonth}
                    handleSelectDay={() => {
                        if (calendarMode === 'day') {
                            setActiveTab('days')
                        }
                    }}
                />
            </div>
            <div className={s.calendar__footer}>
                {canSelectTimeState && (
                    <ReactInputMask
                        className={classNames(s.calendar__footer__time, (!selectTime && submitCount) && s.calendar__footer__time_error)}
                        mask={"99:99"}
                        maskChar={''}
                        value={selectTime}
                        onChange={(e) => setSelectTime(e.target.value)}
                        onBlur={(e) => handleTime(e.target.value)}
                    />
                )}
                <div className={s.calendar__footer__wrapper}>
                    <button type="button" onClick={() => handleReset(true)}>{t('buttonActions.reset')}</button>
                    <button type="button" onClick={handleSubmit}
                    >{t('buttonActions.apply')}</button>
                </div>
            </div>

        </div>
    );
};

export default Calendar;