import * as React from 'react';
import { useMemo, useState } from 'react';
import styles from '@/components/Calendar/Calendar.module.scss';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Paginator from '@/components/Paginator';
import { CALENDAR_MODE } from '@/constants/date';
import { DateRange, DefaultDateRange, isDateOutOfRange } from '@/utils/date';
import DateTable from '@/components/DateTable';
import YearTable from '@/components/YearTable';
import Header from '@/components/Calendar/Header';

type CalendarProps = {
    value: Date;
    className?: string;
    calendarMode?: CALENDAR_MODE;
    range?: DateRange;
    renderActions?: (date: Date) => React.ReactElement;
};

export default React.forwardRef<HTMLDivElement, CalendarProps>(
    function Calendar(props, ref) {
        const {
            value,
            className,
            renderActions,
            calendarMode,
            range = DefaultDateRange,
        } = props;

        const [selectedDate, setSelectedDate] = useState(value);
        const [mode, setMode] = useState(calendarMode || CALENDAR_MODE.DATE);
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
                    totalDaysCountShouldBeFilled -
                    (lmDays.length + cmDays.length);

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
            if (isDateOutOfRange(date, range)) {
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
                ? isDateOutOfRange(prevMonthPage.toDate(), range)
                : isDateOutOfRange(prevYearPage.toDate(), range);
        const isNextDisabled =
            mode === CALENDAR_MODE.DATE
                ? isDateOutOfRange(nextMonthPage.toDate(), range)
                : isDateOutOfRange(nextYearPage.toDate(), range);

        return (
            <div ref={ref} className={clsx([styles.wrapper, className])}>
                <Header
                    renderTitle={() => {
                        return 'Text';
                    }}
                    renderSubTitle={() => {
                        return `${dateElems[1]}, ${dateElems[3]}`;
                    }}
                />

                <Paginator
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    content={
                        mode === CALENDAR_MODE.DATE ? (
                            <button
                                className={clsx([styles.month])}
                                onClick={() => {
                                    setMode(CALENDAR_MODE.YEAR);
                                }}
                            >
                                {dateElems[1]}, {dateElems[3]}
                            </button>
                        ) : (
                            <button
                                className={clsx([styles.month])}
                                onClick={() => {
                                    setMode(CALENDAR_MODE.DATE);
                                }}
                            >
                                {dateElems[3]}
                            </button>
                        )
                    }
                />

                {mode === CALENDAR_MODE.DATE ? (
                    <DateTable
                        dates={dates}
                        selectedDate={selectedDate}
                        handleSelectDate={handleSelectDate}
                        range={range}
                    />
                ) : (
                    <YearTable
                        years={years}
                        selectedDate={selectedDate}
                        handleSelectYear={handleSelectYear}
                        range={range}
                    />
                )}

                {renderActions && renderActions(selectedDate)}
            </div>
        );
    }
);
