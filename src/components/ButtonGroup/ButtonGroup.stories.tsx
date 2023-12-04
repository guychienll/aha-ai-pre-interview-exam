import * as React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import ButtonGroup from './';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ButtonGroup> = {
    title: 'components/ButtonGroup',
    component: ButtonGroup,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: {
                type: 'object',
            },
        },
    },
    args: {
        children: null,
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <ButtonGroup.Button handleClick={action('Button A Clicked')}>
                    Button A
                </ButtonGroup.Button>
                <ButtonGroup.Button handleClick={action('Button B Clicked')}>
                    Button B
                </ButtonGroup.Button>
            </>
        ),
    },
};

export const RandomSortByYourSelf: Story = {
    args: {
        children: (
            <>
                <ButtonGroup.Button handleClick={action('Button B Clicked')}>
                    Button B
                </ButtonGroup.Button>
                <ButtonGroup.Button handleClick={action('Button A Clicked')}>
                    Button A
                </ButtonGroup.Button>
            </>
        ),
    },
};
