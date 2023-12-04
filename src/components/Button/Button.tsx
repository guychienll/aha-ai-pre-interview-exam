import * as React from 'react';
import clsx from 'clsx';
import styles from '@/components/Button/Button.module.scss';

export type ButtonProps = {
    handleClick: () => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
    const { handleClick, children } = props;

    if (!children) {
        return null;
    }

    return (
        <button className={clsx([styles.button])} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
