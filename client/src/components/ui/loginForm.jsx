import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, logIn } from "../../store/users";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const logInError = useSelector(getAuthError())
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

    };

    const validateScheme = yup.object().shape({
        password: yup.string().required("Password is required"),
        email: yup.string().required("Email is required").email("Email is incorrect")
    })

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        validateScheme.validate(data).then(()=>setErrors({})).catch((err)=>setErrors({[err.path]:err.message}))
        return Object.keys(errors).length === 0
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(logIn(data))
        navigate('/')
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Е-пошта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Залишитись в системі?
            </CheckBoxField>
            {logInError && <p className="text-danger">{logInError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
