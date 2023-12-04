import * as React from 'react';
import clsx from 'clsx';
import Checked from '@/assets/check-box-checked.svg';
import UnChecked from '@/assets/check-box-unchecked.svg';
import styles from '@/components/CheckItem/CheckItem.module.scss';

export type CheckItemProps = {
    label: string;
    isChecked: boolean;
};
const CheckItem: React.FC<CheckItemProps> = (props) => (
    <div className={clsx([styles.checkItem])}>
        <div className={clsx([styles.checkItemBox])}>
            {props.isChecked ? (
                <Checked className="checked" width={24} height={24} />
            ) : (
                <UnChecked className="unchecked" width={20} height={20} />
            )}
        </div>
        <div className={clsx([styles.checkItemContent])}>{props.label}</div>
    </div>
);
export default CheckItem;
