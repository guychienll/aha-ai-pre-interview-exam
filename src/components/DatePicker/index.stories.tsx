import { Meta, StoryObj } from '@storybook/react';
import Calendar, { DatePickerProps } from './';
import DatePicker from './';
import React, { useState } from 'react';
import { useArgs } from '@storybook/preview-api';
import { DefaultDateRange } from '@/utils/date';

const meta: Meta<typeof DatePicker> = {
    title: 'components/DatePicker',
    component: Calendar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 600,
            },
        },
    },
    argTypes: {
        id: {
            control: {
                type: 'string',
            },
            description: 'DatePicker Wrapper Id',
        },
        label: {
            control: {
                type: 'string',
            },
            description: 'DatePicker Input display label',
        },
        value: {
            control: {
                type: 'date',
            },
            description: 'date string',
        },
        range: {
            control: {
                type: 'object',
            },
            description: 'the max and min value for calendar range',
        },
        onChange: {
            action: 'onChange',
            description: 'be invoked when date is confirm and valid',
        },
        onDismiss: {
            action: 'onDismiss',
            description: 'the timing for dismiss calendar',
        },
        onConfirm: {
            action: 'onConfirm',
            description: 'the timing for confirm calendar',
        },
    },
    args: {
        id: 'date-picker-stories',
        label: 'Birthday',
        value: '2022-01-11',
        range: DefaultDateRange,
    },
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [args, setArgs] = useArgs<DatePickerProps>();
        return (
            <DatePicker
                {...args}
                onChange={(date) => {
                    setArgs({
                        ...args,
                        value: date,
                    });
                }}
            />
        );
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
