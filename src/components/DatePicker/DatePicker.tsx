import * as React from 'react';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useClickOutside } from '@/hooks/dom';
import Input from '@/components/Input';
import Calendar from '@/components/Calendar';
import styles from '@/components/DatePicker/DatePicker.module.scss';
import clsx from 'clsx';
import { DateRange, DefaultDateRange, isDateOutOfRange } from '@/utils/date';
import ButtonGroup from '@/components/ButtonGroup';

export type DatePickerProps = {
    id: string;
    label: string;
    value: string;
    onChange: (date: string) => void;
    onConfirm?: () => void;
    onDismiss?: () => void;
    range?: DateRange;
};

const DatePicker: React.FC<DatePickerProps> = ({
    id,
    label,
    value,
    onChange,
    onDismiss,
    onConfirm,
    range = DefaultDateRange,
}) => {
    const [isFocus, setIsFocus] = useState(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);

    useClickOutside([calendarRef, inputRef], () => {
        setIsFocus(false);
    });

    const handleDismiss = () => {
        setIsFocus(false);
        onDismiss && onDismiss();
    };

    const handleConfirm = (date: string) => () => {
        onChange(date);
        setIsFocus(false);
        onConfirm && onConfirm();
    };

    return (
        <div className={clsx([styles.wrapper])}>
            <Input
                ref={inputRef}
                id={id}
                label={label}
                placeholder="mm/dd/yy"
                type="date"
                value={value}
                onFocus={() => {
                    setIsFocus(true);
                }}
                onChange={(e) => {
                    let date = dayjs(e.target.value);
                    if (isDateOutOfRange(date.toDate())) {
                        return;
                    }
                    handleConfirm(date.format('YYYY-MM-DD'))();
                }}
            />
            {isFocus && (
                <Calendar
                    ref={calendarRef}
                    value={value ? dayjs(value).toDate() : new Date()}
                    className={clsx([
                        styles.calendar,
                        isFocus && styles.visible,
                    ])}
                    range={range}
                    renderActions={(selectedDate: Date) => {
                        return (
                            <ButtonGroup className={styles.buttonGroup}>
                                <ButtonGroup.Button handleClick={handleDismiss}>
                                    Cancel
                                </ButtonGroup.Button>
                                <ButtonGroup.Button
                                    handleClick={handleConfirm(
                                        dayjs(selectedDate).format('YYYY-MM-DD')
                                    )}
                                >
                                    OK
                                </ButtonGroup.Button>
                            </ButtonGroup>
                        );
                    }}
                />
            )}
        </div>
    );
};

export default DatePicker;
