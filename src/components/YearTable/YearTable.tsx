import { DateRange, isDateOutOfRange } from '@/utils/date';
import clsx from 'clsx';
import styles from '@/components/YearTable/YearTable.module.scss';
import * as React from 'react';

type YearTableProps = {
    years: number[];
    selectedDate: Date;
    handleSelectYear: (year: number) => void;
    range: DateRange;
};

function YearTable(props: YearTableProps) {
    const { years, selectedDate, handleSelectYear, range } = props;
    return (
        <div className={clsx([styles.yearTable])}>
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
                                new Date(`${year}-01-01`),
                                range
                            ) && styles.disabled,
                            isCurrent && styles.current,
                        ])}
                    >
                        {year}
                    </button>
                );
            })}
        </div>
    );
}

export default YearTable;
