import * as React from 'react';
import { ButtonProps } from '@/components/Button/type';
import clsx from 'clsx';
import styles from './index.module.scss';

const Button: React.FC<ButtonProps> = (props) => {
    const { handleClick, children, style = {} } = props;
    return (
        <button
            className={clsx([styles.button])}
            onClick={handleClick}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
