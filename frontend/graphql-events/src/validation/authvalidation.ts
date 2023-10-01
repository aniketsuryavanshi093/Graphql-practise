import * as Yup from 'yup';
import { CONFIRM_PASSWORD_MATCH, PASSOWRD_VALIDATION, PASSWORD_REGEXP, REQUIRED } from '../constants/constantvariables';


export const loginValidation = Yup.object({
    email: Yup.string().email('Email must be valid').required(REQUIRED),
    password: Yup.string().required(REQUIRED),
});

export const signUpvalidation = Yup.object({
    email: Yup.string().email('Email must be valid').required(REQUIRED),
    password: Yup.string().matches(PASSWORD_REGEXP, PASSOWRD_VALIDATION).required(REQUIRED),
    cp: Yup.string()
        .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD_MATCH)
        .required(REQUIRED),
});

export const eventvalidation = Yup.object({
    title: Yup.string().max(32, "Maximum Character 32 allowed!").required(REQUIRED),
    description: Yup.string().required(REQUIRED),
    date: Yup.date().min(new Date().toISOString(), "Date should be greater than present date!").required(REQUIRED),
    price: Yup.number().required(REQUIRED)
})