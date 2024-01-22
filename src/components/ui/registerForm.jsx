import React, {useEffect, useState} from "react";
import { validator } from "../../utils/validator";
import TextField from '../common/form/textField';

const RegisterForm = () => {
    const [data, setData] = useState({email: "", password: ""});

    const [errors, setErrors] = useState({});

    const handleChange = ({target}) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}))
    }
    
    const validatorConfig = {
        email: {
            isRequired: {message: "Email is required"},
            isEmail : {message: "Email is incorrect"}
        },
        password: {
            isRequired: {message: "Password is required"},
            isCapital: {message: "Should be at least one capital letter"},
            isContainDigit: {message: "Should contain digit"},
            min: {message: 'No less then 8 symbols', value: 8}
        }
    }

    useEffect(()=>{
        validate();
    },[data])

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate();
        if(!isValid) return;
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Е-пошта" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Submit</button>
        </form>
    )
}

export default RegisterForm;