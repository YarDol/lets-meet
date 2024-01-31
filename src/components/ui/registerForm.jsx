import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validateScheme = yup.object().shape({
        license: yup.boolean().oneOf([true],'Need to allow license agreements'),
        profession: yup.string().required("Choose your profession"),
        password: yup.string().required("Password is required")
        .matches(/^(?=.*[A-Z])/, "Should contain at least one capital letter")
        .matches(/(?=.*[0-9])/, "Should contain digit")
        .matches(/(?=.*[!@#$%^&*])/, "Should contain at least one of special symbols (!@#$%^&*)")
        .matches(/(?=.{8,})/, "No less then 8 symbols"),
        name: yup.string().matches(/(?=.{3,})/, "No less then 3 symbols"),
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
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await signUp(newData);
            navigate("/");
        } catch (error) {
            setErrors(error);
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
                label="Ім'я"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Оберіть свою професію"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Оберіть вашу стать"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Оберіть ваші якості"
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Підтвердити <a>ліцензійні умови</a>
            </CheckBoxField>
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

export default RegisterForm;
