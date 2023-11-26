import * as React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Input, { InputProps } from '@/components/Input';
import CheckList from '@/components/CheckList';
import ajv, { Schema, VALIDATE_ERROR } from '@/singletons/ajv';

const order = [
    VALIDATE_ERROR.LEAST_ONE_UPPER_CASE_CHAR_REQUIRED,
    VALIDATE_ERROR.LEAST_ONE_LOWER_CASE_CHAR_REQUIRED,
    VALIDATE_ERROR.LEAST_ONE_NUMBER_CHAR_REQUIRED,
    VALIDATE_ERROR.LEAST_ONE_SPECIAL_CHAR_REQUIRED,
    VALIDATE_ERROR.MIN_LENGTH,
];

const ajvSchema: Schema = {
    type: 'string',
    minLength: 8,
    leastOneUpperCaseCharRequired: true,
    leastOneLowerCaseCharRequired: true,
    leastOneNumberCharRequired: true,
    leastOneSpecialCharRequired: true,
    errorMessage: {
        [VALIDATE_ERROR.MIN_LENGTH]: 'Longer than 8 characters',
        [VALIDATE_ERROR.LEAST_ONE_UPPER_CASE_CHAR_REQUIRED]:
            'Have at least one uppercase letter',
        [VALIDATE_ERROR.LEAST_ONE_LOWER_CASE_CHAR_REQUIRED]:
            'Have at least one lowercase letter',
        [VALIDATE_ERROR.LEAST_ONE_NUMBER_CHAR_REQUIRED]:
            'Have at least one number',
        [VALIDATE_ERROR.LEAST_ONE_SPECIAL_CHAR_REQUIRED]:
            'Have at least one special character (!@#$...etc)',
    },
};

const validate = ajv.compile(ajvSchema);

const Context = createContext<{
    password?: string;
    setPassword?: React.Dispatch<React.SetStateAction<string>>;
}>({});

const Password = (props: {
    children: React.ReactElement | React.ReactElement[] | null;
    passwordInitValue?: string;
}) => {
    const [password, setPassword] = useState(props.passwordInitValue || '');

    return (
        <Context.Provider
            value={{
                password,
                setPassword,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

Password.Input = function PasswordInput({
    id,
    label,
    placeholder,
}: Pick<InputProps, 'id' | 'placeholder' | 'label'>) {
    const { password, setPassword } = useContext(Context);
    return (
        <Input
            id={id}
            label={label}
            value={password || ''}
            onChange={(e) => {
                validate(e.target.value);
                setPassword && setPassword(e.target.value);
            }}
            placeholder={placeholder}
            type="password"
        />
    );
};

Password.CheckList = function PasswordCheckList() {
    const { password } = useContext(Context);

    const items = useMemo(() => {
        const errorKeys = Object.keys(ajvSchema.errorMessage);

        validate(password);

        const errors = (validate.errors || []).reduce((acc, cur) => {
            acc.push(cur.params.errors[0].keyword);
            return acc;
        }, [] as string[]);

        return errorKeys
            .sort(
                (a, b) =>
                    order.indexOf(a as VALIDATE_ERROR) -
                    order.indexOf(b as VALIDATE_ERROR)
            )
            .map((key) => {
                return {
                    label: ajvSchema.errorMessage[key],
                    isChecked: !errors.includes(key),
                };
            });
    }, [password]);

    return <CheckList items={items} />;
};

export default Password;
