import * as React from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from '@/components/Input/Input.module.scss';

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

export default React.forwardRef<HTMLDivElement, InputProps>(
    function Input(props, ref) {
        const {
            id,
            label,
            value,
            placeholder,
            onChange,
            onFocus,
            onBlur,
            type,
            disabled = false,
        } = props;

        return (
            <div ref={ref} className={clsx([styles.wrapper])}>
                <label htmlFor={id} className={clsx([styles.label])}>
                    {label}
                </label>
                <input
                    id={id}
                    type={type}
                    className={clsx([styles.input])}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
            </div>
        );
    }
);
