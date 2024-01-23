import React, {useEffect, useState} from "react";
import TextField from '../common/form/textField';
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({email: "", password: "", stayOn: false});

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}))
    }
    
    const validateScheme = yup.object().shape({
        password: yup.string().required("Password is required")
        .matches(/^(?=.*[A-Z])/, "Should contain at least one capital letter")
        .matches(/(?=.*[0-9])/, "Should contain digit")
        .matches(/(?=.*[!@#$%^&*])/, "Should contain at least one of special symbols (!@#$%^&*)")
        .matches(/(?=.{8,})/, "No less then 8 symbols"),
        email: yup.string().required("Email is required").email("Email is incorrect")
    })

    useEffect(()=>{
        validate();
    },[data])

    const validate = () => {
        validateScheme.validate(data).then(()=>setErrors({})).catch((err)=>setErrors({[err.path]:err.message}))
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
            <CheckBoxField 
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            > Залишитись <a> в системі?</a></CheckBoxField>
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Submit</button>
        </form>
    )
}

export default LoginForm;