import * as React from 'react';
import clsx from 'clsx';
import ArrowPrev from '@/assets/keyboard-arrow-left.svg';
import ArrowNext from '@/assets/keyboard-arrow-right.svg';
import styles from '@/components/Paginator/Paginator.module.scss';

type PaginatorProps = {
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    content: React.ReactElement;
};

function Paginator(props: PaginatorProps) {
    const {
        isPrevDisabled,
        isNextDisabled,
        handlePrevPage,
        handleNextPage,
        content,
    } = props;
    return (
        <div className={clsx([styles.pagination])}>
            <button
                onClick={handlePrevPage}
                className={clsx([
                    styles.button,
                    isPrevDisabled && styles.disabled,
                ])}
            >
                <ArrowPrev />
            </button>
            {content}
            <button
                onClick={handleNextPage}
                className={clsx([
                    styles.button,
                    isNextDisabled && styles.disabled,
                ])}
            >
                <ArrowNext />
            </button>
        </div>
    );
}

export default Paginator;
