import { Meta, StoryObj } from '@storybook/react';
import Input, { InputProps } from './';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof Input> = {
    title: 'components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: {
                type: 'text',
            },
        },
        label: {
            control: {
                type: 'text',
            },
        },
        value: {
            control: {
                type: 'text',
            },
        },
        placeholder: {
            control: {
                type: 'text',
            },
        },
        onChange: {
            action: 'onChange',
        },
        onFocus: {
            action: 'onFocus',
        },
        onBlur: {
            action: 'onBlur',
        },
        type: {
            control: {
                type: 'select',
            },
            options: ['password', 'text', 'date'],
        },
        disabled: {
            control: {
                type: 'boolean',
            },
        },
    },
    args: {
        id: 'input',
        label: 'Text',
        value: 'hello world!',
        placeholder: 'Please Type Something',
        type: 'text',
        disabled: false,
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [args, setArgs] = useArgs<InputProps>();
        return (
            <Input
                {...args}
                onChange={(e) => {
                    setArgs({
                        ...args,
                        value: e.target.value,
                    });
                }}
            />
        );
    },
};

export const Password: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [args, setArgs] = useArgs<InputProps>();
        return (
            <Input
                {...{ ...args, label: 'Password', type: 'password' }}
                onChange={(e) => {
                    setArgs({
                        ...args,
                        value: e.target.value,
                    });
                }}
            />
        );
    },
};

/**
 * <strong style="color: red;">
 *     Do Not Use This Directly
 * <br/>
 *     Maybe you want use DatePicker
 * </strong>
 */
export const Date: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [args, setArgs] = useArgs<InputProps>();
        return (
            <Input
                {...{ ...args, label: 'Date', type: 'date' }}
                onChange={(e) => {
                    setArgs({
                        ...args,
                        value: e.target.value,
                    });
                }}
            />
        );
    },
};
