import * as React from 'react';
import Checked from '../../assets/check-box-checked.svg';
import UnChecked from '../../assets/check-box-unchecked.svg';
import styles from './index.module.scss';
import clsx from 'clsx';

type CheckListProps = {
    items: {
        label: string;
        isChecked: boolean;
    }[];
};

const CheckList: React.FC<CheckListProps> = ({ items = [] }) => {
    if (items.length <= 0) {
        return null;
    }
    return (
        <div className={clsx([styles.wrapper])}>
            {items.map((item, idx) => (
                <div key={idx} className={clsx([styles.checkItem])}>
                    <div className={clsx([styles.checkItemBox])}>
                        {item.isChecked ? (
                            <Checked
                                className="checked"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <UnChecked
                                className="unchecked"
                                width={20}
                                height={20}
                            />
                        )}
                    </div>
                    <div className={clsx([styles.checkItemContent])}>
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckList;
