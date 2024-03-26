
import classNames from 'classnames';
import s from '../Calendar.module.scss'
import { MonthObject, YearObject } from '../Calendar';

type CalendarMonthsProps = {
    yearData?: YearObject[],
    setCurrentMonth: (val: number) => void,
    handleSelectDay: ()=>void
};

const CalendarMonths = ({yearData, setCurrentMonth, handleSelectDay}: CalendarMonthsProps) => {

    const handleSelectMonth = (month: MonthObject) => {
        if (!month.isDisable) {
            handleSelectDay()
            setCurrentMonth(month.monthDateTime.month)
        }
        else return null
    }

    return (
        <div className={classNames(s.calendar__tab, s.calendar__tab_month)}>
            {yearData?.map((item, index)=>{
                return (
                    <button key={index} type="button" 
                        onClick={()=>handleSelectMonth(item.month)} 
                        className={classNames({
                            [s.calendar__month]: true,
                            [s.calendar__month_active]: item.month.isActive,
                            [s.calendar__month_disable]: item.month.isDisable
                        })}
                    >
                        {item.month.monthDateTime.monthLong}
                    </button>
                )
            })}
        </div>
    );
}

export default CalendarMonths
