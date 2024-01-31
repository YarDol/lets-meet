import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { logIn } = useAuth();
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
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

        try {
            await logIn(data);

            navigate(
                location.state
                    ? location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
        }
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
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
