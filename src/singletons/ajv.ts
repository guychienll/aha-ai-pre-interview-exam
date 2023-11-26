import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({
    allErrors: true,
});

export enum VALIDATE_ERROR {
    LEAST_ONE_UPPER_CASE_CHAR_REQUIRED = 'leastOneUpperCaseCharRequired',
    LEAST_ONE_LOWER_CASE_CHAR_REQUIRED = 'leastOneLowerCaseCharRequired',
    LEAST_ONE_NUMBER_CHAR_REQUIRED = 'leastOneNumberCharRequired',
    LEAST_ONE_SPECIAL_CHAR_REQUIRED = 'leastOneSpecialCharRequired',
    MIN_LENGTH = 'minLength',
}

export type Schema = {
    type: string;
    [VALIDATE_ERROR.MIN_LENGTH]?: number;
    [VALIDATE_ERROR.LEAST_ONE_UPPER_CASE_CHAR_REQUIRED]?: boolean;
    [VALIDATE_ERROR.LEAST_ONE_LOWER_CASE_CHAR_REQUIRED]?: boolean;
    [VALIDATE_ERROR.LEAST_ONE_NUMBER_CHAR_REQUIRED]?: boolean;
    [VALIDATE_ERROR.LEAST_ONE_SPECIAL_CHAR_REQUIRED]?: boolean;
    errorMessage: {
        [index: string]: string;
    };
};

/**
 * @title leastOneUpperCaseCharRequired
 * @description at least one uppercase character in password
 * @examples valid: "ABCDEF" invalid: "abcdef"
 */
ajv.addKeyword({
    keyword: VALIDATE_ERROR.LEAST_ONE_UPPER_CASE_CHAR_REQUIRED,
    type: 'string',
    validate: (schema: any, data: any) => {
        if (!schema) {
            return true;
        }
        return /.*[A-Z].*/.test(data);
    },
});

/**
 * @title leastOneLowerCaseCharRequired
 * @description at least one lowercase character in password
 * @examples valid: "abcdef" invalid: "ABCDEF"
 */
ajv.addKeyword({
    keyword: VALIDATE_ERROR.LEAST_ONE_LOWER_CASE_CHAR_REQUIRED,
    type: 'string',
    validate: (schema: any, data: any) => {
        if (!schema) {
            return true;
        }
        return /.*[a-z].*/.test(data);
    },
});

/**
 * @title leastOneNumberCharRequired
 * @description at least one number character in password
 * @examples valid: "123456" invalid: "abcdef"
 */
ajv.addKeyword({
    keyword: VALIDATE_ERROR.LEAST_ONE_NUMBER_CHAR_REQUIRED,
    type: 'string',
    validate: (schema: any, data: any) => {
        if (!schema) {
            return true;
        }
        return /.*[0-9].*/.test(data);
    },
});

/**
 * @title leastOneSpecialCharRequired
 * @description at least one special character in password (!@#$)
 * @examples valid: "!@#$" invalid: "abcdef"
 */
ajv.addKeyword({
    keyword: VALIDATE_ERROR.LEAST_ONE_SPECIAL_CHAR_REQUIRED,
    type: 'string',
    validate: (schema: any, data: any) => {
        if (!schema) {
            return true;
        }
        return /.*[!@#$].*/.test(data);
    },
});

ajvErrors(ajv);

export default ajv;
