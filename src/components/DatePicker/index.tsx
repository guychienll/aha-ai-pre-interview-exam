import * as React from 'react';
import { useMemo, useState } from 'react';
import styles from './index.module.scss';
import ArrowPrev from '@/assets/keyboard-arrow-left.svg';
import ArrowNext from '@/assets/keyboard-arrow-right.svg';
import clsx from 'clsx';
import dayjs from 'dayjs';

enum CALENDAR_MODE {
    DATE = 'date',
    YEAR = 'year',
}

function DatePicker() {
    const [mode, setMode] = useState(CALENDAR_MODE.DATE);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateElems = selectedDate.toDateString().split(' ');

    const dates = useMemo(() => {
        const getDatesShouldAppendFirst = () => {
            const firstOfCurrentMonth = dayjs(
                `${selectedDate.getFullYear()}-${
                    selectedDate.getMonth() + 1
                }-01`
            );
            const lastOfLastMonth = dayjs(
                `${selectedDate.getFullYear()}-${
                    selectedDate.getMonth() + 1
                }-01`
            ).add(-1, 'day');
            const appendedLength = firstOfCurrentMonth.day() % 7;

            let lastMonthDays = [];

            for (
                let i = lastOfLastMonth.date() - appendedLength + 1;
                i <= lastOfLastMonth.date();
                i++
            ) {
                lastMonthDays.push(
                    dayjs(
                        `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${i}`
                    ).toDate()
                );
            }

            return lastMonthDays;
        };
        const getDatesCurrentMonth = () => {
            let currentMonthDays = [];
            for (let i = 1; i <= dayjs(selectedDate).daysInMonth(); i++) {
                currentMonthDays.push(
                    dayjs(
                        `${selectedDate.getFullYear()}-${
                            selectedDate.getMonth() + 1
                        }-${i}`
                    ).toDate()
                );
            }
            return currentMonthDays;
        };
        const getDatesShouldAppendLast = ({
            lmDays,
            cmDays,
        }: {
            lmDays: Date[];
            cmDays: Date[];
        }) => {
            const totalDaysCountShouldBeFilled = 42;
            const daysShouldBeAppendNextMonth =
                totalDaysCountShouldBeFilled - (lmDays.length + cmDays.length);

            let nextMonthDays = [];
            for (let i = 1; i <= daysShouldBeAppendNextMonth; i++) {
                nextMonthDays.push(
                    dayjs(
                        `${selectedDate.getFullYear()}-${
                            selectedDate.getMonth() + 2
                        }-${i}`
                    ).toDate()
                );
            }

            return nextMonthDays;
        };

        const lastMonthDays = getDatesShouldAppendFirst();
        const currentMonthDays = getDatesCurrentMonth();
        const nextMonthDays = getDatesShouldAppendLast({
            lmDays: lastMonthDays,
            cmDays: currentMonthDays,
        });

        return [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [selectedDate]);

    const years = useMemo(() => {
        let years = [];
        const currentYear = selectedDate.getFullYear();
        const range = 20;

        const startOfRange =
            currentYear % range === 0
                ? currentYear - 19
                : currentYear - (currentYear % range) + 1;
        const endOfRange =
            currentYear % range === 0
                ? currentYear
                : currentYear + (range - (currentYear % range));

        for (let i = startOfRange; i <= endOfRange; i++) {
            years.push(i);
        }

        return years;
    }, [selectedDate]);

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

    const handleChangeMonthPage = (action: 'prev' | 'next') => () => {
        if (action === 'prev') {
            setSelectedDate((prev) => dayjs(prev).add(-1, 'month').toDate());
        } else {
            setSelectedDate((prev) => dayjs(prev).add(1, 'month').toDate());
        }
    };

    const handleChangeYearPage = (action: 'prev' | 'next') => () => {
        if (action === 'prev') {
            setSelectedDate((prev) => dayjs(prev).add(-20, 'year').toDate());
        } else {
            setSelectedDate((prev) => dayjs(prev).add(20, 'year').toDate());
        }
    };

    const handleSelectYear = (year: number) => {
        const diff = year - dayjs(selectedDate).year();
        setSelectedDate((prev) => dayjs(prev).add(diff, 'year').toDate());
    };

    const handleChangeMode = (mode: CALENDAR_MODE) => {
        setMode(mode);
    };

    return (
        <div className={clsx([styles.wrapper])}>
            <div className={clsx([styles.header])}>
                <div className={clsx([styles.subtitle])}>Text</div>
                <div className={clsx([styles.title])}>
                    {dateElems[1]}, {dateElems[3]}
                </div>
            </div>
            <div className={clsx([styles.pagination])}>
                <button
                    onClick={
                        mode === CALENDAR_MODE.DATE
                            ? handleChangeMonthPage('prev')
                            : handleChangeYearPage('prev')
                    }
                    className={clsx([styles.button])}
                >
                    <ArrowPrev />
                </button>
                <button
                    className={clsx([styles.month])}
                    onClick={() => {
                        if (mode === CALENDAR_MODE.DATE) {
                            handleChangeMode(CALENDAR_MODE.YEAR);
                        } else {
                            handleChangeMode(CALENDAR_MODE.DATE);
                        }
                    }}
                >
                    {mode === CALENDAR_MODE.DATE && (
                        <span>
                            {dateElems[1]}, {dateElems[3]}
                        </span>
                    )}
                    {mode === CALENDAR_MODE.YEAR && <span>{dateElems[3]}</span>}
                </button>
                <button
                    onClick={
                        mode === CALENDAR_MODE.DATE
                            ? handleChangeMonthPage('next')
                            : handleChangeYearPage('next')
                    }
                    className={clsx([styles.button])}
                >
                    <ArrowNext />
                </button>
            </div>
            {mode === CALENDAR_MODE.DATE && (
                <div className={clsx([styles.datePicker])}>
                    <div className={clsx([styles.header])}>
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(
                            (day) => (
                                <div key={day} className={clsx([styles.day])}>
                                    {day}
                                </div>
                            )
                        )}
                    </div>
                    <div className={clsx([styles.body])}>
                        {dates.map((day) => {
                            let isCurrentMonth =
                                day.getMonth() === selectedDate.getMonth();
                            let isActive =
                                day.toDateString() ===
                                selectedDate.toDateString();
                            let isToday =
                                day.toDateString() ===
                                new Date().toDateString();

                            return (
                                <button
                                    key={day.getTime()}
                                    onClick={() => {
                                        handleSelectDate(day);
                                    }}
                                    className={clsx([
                                        styles.day,
                                        !isCurrentMonth && styles.otherMonth,
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
            )}

            {mode === CALENDAR_MODE.YEAR && (
                <div className={clsx([styles.yearPicker])}>
                    {years.map((year) => {
                        const isActive = year === selectedDate.getFullYear();
                        const isCurrent = year === new Date().getFullYear();
                        return (
                            <button
                                onClick={() => {
                                    handleSelectYear(year);
                                }}
                                key={year}
                                className={clsx([
                                    styles.year,
                                    isActive && styles.active,
                                    isCurrent && styles.current,
                                ])}
                            >
                                {year}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className={clsx([styles.actions])}>
                <button
                    onClick={() => {
                        console.log('dismiss');
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        console.log(selectedDate);
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default DatePicker;
