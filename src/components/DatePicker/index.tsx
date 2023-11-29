import * as React from 'react';
import { useMemo, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Paginator from '@/components/Paginator';
import { CALENDAR_MODE, WEEK_DAYS } from '@/constants/date';
import { ButtonGroup } from '@/components/Button';
import { isDateOutOfRange } from '@/utils/date';

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
        if (isDateOutOfRange(date)) {
            return;
        }
        setSelectedDate(date);
    };

    const handleChangeBatchDates = (amount: dayjs.Dayjs) => () => {
        handleSelectDate(amount.toDate());
    };

    const handleSelectYear = (year: number) => {
        const diff = year - dayjs(selectedDate).year();
        handleSelectDate(dayjs(selectedDate).add(diff, 'year').toDate());
    };

    const prevMonthPage = dayjs(selectedDate).add(-1, 'month');
    const nextMonthPage = dayjs(selectedDate).add(1, 'month');
    const prevYearPage = dayjs(selectedDate).add(-20, 'year');
    const nextYearPage = dayjs(selectedDate).add(20, 'year');
    const handlePrevPage =
        mode === CALENDAR_MODE.DATE
            ? handleChangeBatchDates(prevMonthPage)
            : handleChangeBatchDates(prevYearPage);
    const handleNextPage =
        mode === CALENDAR_MODE.DATE
            ? handleChangeBatchDates(nextMonthPage)
            : handleChangeBatchDates(nextYearPage);
    const isPrevDisabled =
        mode === CALENDAR_MODE.DATE
            ? isDateOutOfRange(prevMonthPage.toDate())
            : isDateOutOfRange(prevYearPage.toDate());
    const isNextDisabled =
        mode === CALENDAR_MODE.DATE
            ? isDateOutOfRange(nextMonthPage.toDate())
            : isDateOutOfRange(nextYearPage.toDate());
    const handleChangeMode = (mode: CALENDAR_MODE) => () => {
        if (mode === CALENDAR_MODE.DATE) {
            setMode(CALENDAR_MODE.YEAR);
        } else {
            setMode(CALENDAR_MODE.DATE);
        }
    };

    return (
        <div className={clsx([styles.wrapper])}>
            <div className={clsx([styles.header])}>
                <div className={clsx([styles.subtitle])}>Text</div>
                <div className={clsx([styles.title])}>
                    {dateElems[1]}, {dateElems[3]}
                </div>
            </div>
            <Paginator
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleChangeMode={handleChangeMode(mode)}
                content={
                    mode === CALENDAR_MODE.DATE ? (
                        <span>
                            {dateElems[1]}, {dateElems[3]}
                        </span>
                    ) : (
                        <span>{dateElems[3]}</span>
                    )
                }
            />
            {mode === CALENDAR_MODE.DATE && (
                <div className={clsx([styles.datePicker])}>
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
                                        isDateOutOfRange(day) &&
                                            styles.disabled,
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
                                    isDateOutOfRange(
                                        new Date(`${year}-01-01`)
                                    ) && styles.disabled,
                                    isCurrent && styles.current,
                                ])}
                            >
                                {year}
                            </button>
                        );
                    })}
                </div>
            )}

            <ButtonGroup className={styles.buttonGroup}>
                <ButtonGroup.Button
                    handleClick={() => {
                        console.log('DISMISS');
                    }}
                >
                    Cancel
                </ButtonGroup.Button>
                <ButtonGroup.Button
                    handleClick={() => {
                        console.log('OK');
                    }}
                >
                    OK
                </ButtonGroup.Button>
            </ButtonGroup>
        </div>
    );
}

export default DatePicker;
