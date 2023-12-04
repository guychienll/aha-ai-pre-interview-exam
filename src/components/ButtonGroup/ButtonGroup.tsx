import React from 'react';
import clsx from 'clsx';
import styles from '@/components/ButtonGroup/ButtonGroup.module.scss';
import Button, { ButtonProps } from '@/components/Button';

export type ButtonGroupProps = {
    className?: string;
    children: React.ReactNode;
};

const ButtonGroup: React.FC<ButtonGroupProps> & {
    Button: React.FC<ButtonProps>;
} = (props) => {
    const { className, children } = props;
    return <div className={clsx([styles.actions, className])}>{children}</div>;
};

ButtonGroup.Button = Button;

export default ButtonGroup;
