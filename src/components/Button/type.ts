import * as React from 'react';

export type ButtonGroupProps = {
    className?: string;
    children: React.ReactNode;
};

export type ButtonProps = {
    handleClick: () => void;
    children: React.ReactNode;
};
