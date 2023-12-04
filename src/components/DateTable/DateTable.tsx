import { DateRange, isDateOutOfRange } from '@/utils/date';
import clsx from 'clsx';
import styles from '@/components/DateTable/DateTable.module.scss';
import { WEEK_DAYS } from '@/constants/date';
import * as React from 'react';

type DateTableProps = {
    dates: Date[];
    selectedDate: Date;
    handleSelectDate: (date: Date) => void;
    range: DateRange;
};

function DateTable(props: DateTableProps) {
    const { dates, selectedDate, handleSelectDate, range } = props;
    return (
        <div className={clsx([styles.dateTable])}>
            <div className={clsx([styles.header])}>
                {WEEK_DAYS.map((day) => (
                    <div key={day} className={clsx([styles.day])}>
                        {day.slice(0, 2)}
                    </div>
                ))}
            </div>
            <div className={clsx([styles.body])}>
                {dates.map((day) => {
                    let isCurrentMonth =
                        day.getMonth() === selectedDate.getMonth();
                    let isActive =
                        day.toDateString() === selectedDate.toDateString();
                    let isToday =
                        day.toDateString() === new Date().toDateString();

                    return (
                        <button
                            key={day.getTime()}
                            onClick={() => {
                                handleSelectDate(day);
                            }}
                            className={clsx([
                                styles.day,
                                !isCurrentMonth && styles.otherMonth,
                                isDateOutOfRange(day, range) && styles.disabled,
                                isToday && styles.today,
                                isActive && styles.active,
                            ])}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default DateTable;
