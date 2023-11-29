import React from 'react';
import { ButtonGroupProps, ButtonProps } from '@/components/Button/type';
import clsx from 'clsx';
import styles from './index.module.scss';

import Button from '@/components/Button/Button';

const ButtonGroup: React.FC<ButtonGroupProps> & {
    Button: React.FC<ButtonProps>;
} = (props) => {
    const { className, children } = props;
    return <div className={clsx([styles.actions, className])}>{children}</div>;
};

ButtonGroup.Button = Button;

export default ButtonGroup;
