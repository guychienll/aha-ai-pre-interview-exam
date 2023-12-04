import * as React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import PasswordInput from './';

const meta: Meta<typeof PasswordInput> = {
    title: 'components/PasswordInput',
    component: PasswordInput,
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
        <PasswordInput {...args} passwordInitValue="">
            <PasswordInput.Input
                id="aha-password-input-default"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * PasswordInput Input ( LEAST_ONE_UPPER_CASE_CHAR_REQUIRED )
 * <br/>
 * at least 1 uppercase letter , would be pass
 */
export const UpperCasePass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="UPPER">
            <PasswordInput.Input
                id="aha-password-input-upper"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

/**
 * PasswordInput Input ( LEAST_ONE_LOWER_CASE_CHAR_REQUIRED )
 * <br/>
 * at least 1 lowercase letter , would be pass
 */
export const LowerCasePass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="lower">
            <PasswordInput.Input
                id="aha-password-input-lower"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

/**
 * PasswordInput Input ( LEAST_ONE_NUMBER_CHAR_REQUIRED )
 * <br/>
 * at least 1 number letter , would be pass
 */
export const NumberPass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="123">
            <PasswordInput.Input
                id="aha-password-input-number"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

/**
 * PasswordInput Input ( LEAST_ONE_SPECIAL_CHAR_REQUIRED )
 * <br/>
 * at least 1 special char like !@#$, would be pass
 */
export const SpecialCharPass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="!@#$">
            <PasswordInput.Input
                id="aha-password-input-special-char"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

/**
 * PasswordInput Input ( MinLengthPass )
 * <br/>
 * at least > 8 char, would be pass
 */
export const MinLengthPass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="//////////">
            <PasswordInput.Input
                id="aha-password-input-min-length"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};

/**
 * PasswordInput Input ( AllPass )
 * <br/>
 * satisfy all rules, would be pass
 */
export const AllPass: Story = {
    render: (args) => (
        <PasswordInput {...args} passwordInitValue="@HelloWorld0123">
            <PasswordInput.Input
                id="aha-password-input-all-pass"
                label="Password"
                placeholder="Password"
            />
            <div className="py-2" />
            <PasswordInput.CheckList />
        </PasswordInput>
    ),
};
