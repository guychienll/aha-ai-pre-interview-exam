import * as React from 'react';
import clsx from 'clsx';
import styles from '@/components/Calendar/Header.module.scss';

type HeaderProps = {
    renderTitle: () => React.ReactNode;
    renderSubTitle: () => React.ReactNode;
};

function Header(props: HeaderProps) {
    const { renderTitle, renderSubTitle } = props;
    return (
        <div className={clsx([styles.header])}>
            <div className={clsx([styles.subtitle])}>{renderSubTitle()}</div>
            <div className={clsx([styles.title])}>
                {renderTitle()}
                {/*{props.strings[1]}, {props.strings[3]}*/}
            </div>
        </div>
    );
}

export default Header;
