import * as React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Password from './';

const meta: Meta<typeof Password> = {
    title: 'components/Password',
    component: Password,
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
    render: (args) => (
        <Password {...args} passwordInitValue="">
            <Password.Input
                id="aha-password-input-default"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Password Input ( LEAST_ONE_UPPER_CASE_CHAR_REQUIRED )
 * at least 1 uppercase letter , would be pass
 */
export const UpperCasePass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="UPPER">
            <Password.Input
                id="aha-password-input-upper"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

/**
 * Password Input ( LEAST_ONE_LOWER_CASE_CHAR_REQUIRED )
 * at least 1 lowercase letter , would be pass
 */
export const LowerCasePass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="lower">
            <Password.Input
                id="aha-password-input-lower"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

/**
 * Password Input ( LEAST_ONE_NUMBER_CHAR_REQUIRED )
 * at least 1 number letter , would be pass
 */
export const NumberPass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="123">
            <Password.Input
                id="aha-password-input-number"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

/**
 * Password Input ( LEAST_ONE_SPECIAL_CHAR_REQUIRED )
 * at least 1 special char like !@#$, would be pass
 */
export const SpecialCharPass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="!@#$">
            <Password.Input
                id="aha-password-input-special-char"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

/**
 * Password Input ( MinLengthPass )
 * at least > 8 char, would be pass
 */
export const MinLengthPass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="//////////">
            <Password.Input
                id="aha-password-input-min-length"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};

/**
 * Password Input ( AllPass )
 * satisfy all rules, would be pass
 */
export const AllPass: Story = {
    render: (args) => (
        <Password {...args} passwordInitValue="@HelloWorld0123">
            <Password.Input
                id="aha-password-input-all-pass"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <Password.CheckList />
        </Password>
    ),
};
