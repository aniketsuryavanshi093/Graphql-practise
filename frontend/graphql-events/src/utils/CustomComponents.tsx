
import { Input, Textarea } from '@nextui-org/react';
import { getIn } from 'formik';
import { CLOSEEYE, OPENEYE } from '../assets';
import "./customcomponents.scss"

export const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
    const touch = getIn(touched, field.name);
    const error = getIn(errors, field.name);
    return (
        <div className={`${props.styleData} `} style={props.style}>
            <Input  {...props} {...field} />
            {error && touch && <div className="invalid-feedback d-block mb-1">{error}</div>}
        </div>
    );
};

export const CustomPswInput = ({ field, form: { touched, errors }, ...props }) => {
    const touch = getIn(touched, field.name);
    const error = getIn(errors, field.name);

    return (
        <div className={`${props.styleData}  ${props.pswClassName}`} style={props.style}>
            <div className="relative">
                <Input  {...props} {...field} />
                <img
                    onClick={() => props.setShow(prev => !prev)}
                    src={`${props.show ? OPENEYE : CLOSEEYE}`}
                    alt=""
                    className={error && touch ? 'signup-eye-imgerr' : 'signup-eye-img'}
                />
            </div>
            {error && touch && <div className="invalid-feedback d-block mb-1">{error}</div>}
        </div>
    );
};



export const customTextArea = ({ field, form: { touched, errors }, ...props }) => {
    const touch = getIn(touched, field.name);
    const error = getIn(errors, field.name);
    return (
        <div className={`${props.styleData} `} style={props.style}>
            <Textarea
                variant="bordered"
                {...props}{...field}
                labelPlacement="outside"
                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            />
            {error && touch && <div className="invalid-feedback d-block mb-1">{error}</div>}
        </div>
    )
}