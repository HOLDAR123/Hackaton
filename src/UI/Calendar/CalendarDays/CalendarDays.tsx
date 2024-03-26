import classNames from "classnames";

import s from '../Calendar.module.scss'
import { CalendarProps, YearObject } from "../Calendar";
import { DateTime } from "luxon";

type CalendarDaysProps = {
    yearData?: YearObject[],
    currentDate: DateTime,
    value: DateTime | undefined | null,
    selectDate: DateTime,
    setSelectDate: (val: CalendarDaysProps['selectDate']) => void
};

const CalendarDays = ({ yearData, value, currentDate, selectDate, setSelectDate }: CalendarDaysProps) => {

    return (
        <div className={classNames(s.calendar__tab, s.calendar__tab_day)}>
            <div className={s.calendar__weeks}>
                {yearData && yearData[0].weeks[0].days.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames({
                                [s.calendar__weeks__item]: true,
                                [s.calendar__weeks__item_weekend]: item.isWeekend
                            })}
                        >
                            {item.dayDateTime.toFormat('EEE').slice(0, 2)}
                        </div>
                    )
                })}
            </div>
            <div className={s.calendar__days}>
                {yearData && yearData[yearData.findIndex((el) => el.month.isActive)].weeks.map((week, index) => {
                    return (
                        <div key={index} className={s.calendar__days__week}>
                            {week.days.map((item, key) => {
                                return (
                                    <button type="button"
                                        key={key}
                                        onClick={() => {
                                            if (!item.isDisable) {
                                                const newDate = item.dayDateTime.set({
                                                    hour: currentDate.hour,
                                                    minute: currentDate.minute
                                                });
                                                return setSelectDate(newDate)
                                            }
                                            else return null
                                        }
                                        }
                                        className={classNames({
                                            [s.calendar__days__week__item]: true,
                                            [s.calendar__days__week__item_current]: item.isCurrentDay,
                                            [s.calendar__days__week__item_otherMonth]: !item.isCurrentMonth,
                                            [s.calendar__days__week__item_weekend]: item.isWeekend,
                                            [s.calendar__days__week__item_disable]: item.isDisable,
                                            [s.calendar__days__week__item_selected]: item.dayDateTime.toISODate() === selectDate.toISODate()
                                        })}
                                    >
                                        {item.dayDateTime.day}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CalendarDays;
