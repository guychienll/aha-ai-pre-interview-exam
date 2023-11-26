import * as React from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export type InputProps = {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: 'password' | 'text';
    placeholder: string;
    disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
    id,
    label,
    value,
    placeholder,
    onChange,
    type,
    disabled = false,
}) => {
    return (
        <div className={clsx([styles.wrapper])}>
            <label htmlFor={id} className={clsx([styles.label])}>
                {label}
            </label>
            <input
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                className={clsx([styles.input])}
                id={id}
                type={type}
            />
        </div>
    );
};

export default Input;
