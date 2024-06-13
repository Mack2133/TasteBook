import Joi from "joi";

// Validation 
export const registerValidation = (data: any) => {

    const schema = Joi.object( {
        name: Joi.string().alphanum().min(3).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
        repeat_password: Joi.ref('password')
    });

    return schema.validate(data);
}

export const loginValidation = (data: any) => {
    const schema = Joi.object( {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
}