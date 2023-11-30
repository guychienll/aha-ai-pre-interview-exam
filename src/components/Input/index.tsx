import * as React from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export type InputProps = {
    id: string;
    label: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type: 'password' | 'text' | 'date';
    placeholder: string;
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
};

export default React.forwardRef<HTMLDivElement, InputProps>(function Input(
    {
        id,
        label,
        value,
        placeholder,
        onChange,
        onFocus,
        onBlur,
        type,
        disabled = false,
    },
    ref
) {
    return (
        <div ref={ref} className={clsx([styles.wrapper])}>
            <label htmlFor={id} className={clsx([styles.label])}>
                {label}
            </label>
            <input
                disabled={disabled}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                value={value}
                className={clsx([styles.input])}
                id={id}
                type={type}
            />
        </div>
    );
});
