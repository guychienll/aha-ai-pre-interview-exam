import * as React from 'react';
import clsx from 'clsx';
import styles from '@/components/CheckList/CheckList.module.scss';
import CheckItem, { CheckItemProps } from '@/components/CheckItem';

type CheckListProps = {
    items: CheckItemProps[];
};

const CheckList: React.FC<CheckListProps> = ({ items = [] }) => {
    if (items.length <= 0) {
        return null;
    }
    return (
        <div className={clsx([styles.wrapper])}>
            {items.map((item, idx) => (
                <CheckItem key={idx} {...item} />
            ))}
        </div>
    );
};

export default CheckList;
