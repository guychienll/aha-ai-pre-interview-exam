import * as React from 'react';
import clsx from 'clsx';
import styles from '@/components/Button/Button.module.scss';

export type ButtonProps = {
    handleClick: () => void;
    children: React.ReactNode;
    style?: any;
};

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
