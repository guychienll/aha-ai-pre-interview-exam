import * as React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Button from './';

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: {
                type: 'object',
            },
        },
        handleClick: {
            action: 'handleClick',
        },
    },
    args: {
        children: 'Button',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
