import React, {useEffect, useState} from "react";
import TextField from '../common/form/textField';
import API from '../../api/'
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multISelectField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from 'yup';

const RegisterForm = () => {
    const [data, setData] = useState({email: "", password: "", profession: "", sex: "male", qualities: [], license: false});
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
        API.qualities.fetchAll().then((data) => setQualities(data))
    }, []);

    const handleChange = (target) => {
            setData((prevState) => ({...prevState, [target.name]: target.value}))
    }

    const validateScheme = yup.object().shape({
        license: yup.boolean().oneOf([true],'Need to allow license agreements'),
        profession: yup.string().required("Choose your profession"),
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
            <SelectField 
                onChange={handleChange} 
                options={professions} 
                defaultOption={'Choose...'} 
                error={errors.profession} 
                value={data.profession}
                name="professions" 
                label={'Оберіть вашу професію'}
            />
            <RadioField
                options={[
                    {name:"Male", value: "male"},
                    {name:"Female", value: "female"},
                    {name:"Other", value: "other"}
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Оберіть вашу стать"
            />
            <MultiSelectField 
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Оберіть ваші якості"
                defaultValue = {data.qualities}
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
                disabled={!isValid} 
                className='btn btn-primary w-100 mx-auto'>
                    Submit
            </button>
        </form>
    )
}

export default RegisterForm;