import { Meta, StoryObj } from '@storybook/react';
import Calendar from './';
import React from 'react';
import dayjs from 'dayjs';
import { CALENDAR_MODE } from '@/constants/date';
import { ButtonGroup } from '@/components/Button';
import styles from '@/components/DatePicker/index.module.scss';
import { DefaultDateRange } from '@/utils/date';

const meta: Meta<typeof Calendar> = {
    title: 'components/Calendar',
    component: Calendar,
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: {
                type: 'date',
                description: 'selected date',
            },
        },
        calendarMode: {
            control: 'select',
            options: [CALENDAR_MODE.DATE, CALENDAR_MODE.YEAR],
        },
        range: {
            control: {
                type: 'object',
            },
        },
    },
    args: {
        value: new Date(),
        calendarMode: CALENDAR_MODE.DATE,
        range: DefaultDateRange,
    },
    render: (args) => {
        return <Calendar value={dayjs(args.value).toDate()} />;
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DateMode: Story = {
    render: (args) => {
        return (
            <Calendar
                value={dayjs(args.value).toDate()}
                calendarMode={CALENDAR_MODE.DATE}
            />
        );
    },
};

export const YearMode: Story = {
    render: (args) => {
        return (
            <Calendar
                value={dayjs(args.value).toDate()}
                calendarMode={CALENDAR_MODE.YEAR}
            />
        );
    },
};

export const WithRangeMin: Story = {
    render: (args) => {
        return (
            <Calendar
                value={dayjs('1970-01-01').toDate()}
                calendarMode={CALENDAR_MODE.DATE}
                range={DefaultDateRange}
            />
        );
    },
};

export const WithRangeMax: Story = {
    render: () => {
        return (
            <Calendar
                value={dayjs('2499-12-31').toDate()}
                calendarMode={CALENDAR_MODE.DATE}
                range={DefaultDateRange}
            />
        );
    },
};

export const WithActions: Story = {
    render: (args) => {
        return (
            <Calendar
                value={dayjs(args.value).toDate()}
                calendarMode={CALENDAR_MODE.DATE}
                renderActions={() => {
                    return (
                        <ButtonGroup className={styles.buttonGroup}>
                            <ButtonGroup.Button
                                handleClick={() => {
                                    console.log('dismiss');
                                }}
                            >
                                Cancel
                            </ButtonGroup.Button>
                            <ButtonGroup.Button
                                handleClick={() => {
                                    console.log('confirm');
                                }}
                            >
                                OK
                            </ButtonGroup.Button>
                        </ButtonGroup>
                    );
                }}
            />
        );
    },
};
