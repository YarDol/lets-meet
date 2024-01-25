import React, {useState, useEffect} from 'react'
import API from '../../../api';
import TextAreaField from '../form/textField'
import SelectField from '../form/selectField'
import * as yup from 'yup'
import PropTypes from 'prop-types'
const initialData = {userId: "", content: ""};

const AddCommentForm = ({onSubmit}) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({})
    const handleChange = (target) => {
        setData((prevState) => ({...prevState, [target.name]: target.value}));
    }

    const validateScheme = yup.object().shape({
        userId: yup.string().required("Choose user"),
        content: yup.string().required("Comment can't be empty")
    })

    useEffect(()=>{
        validate();
    },[data])

    const validate = () => {
        validateScheme.validate(data).then(()=>setErrors({})).catch((err)=>setErrors({[err.path]:err.message}))
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    const cleanForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if(!isValid) return;
        onSubmit(data);
        cleanForm()
    };
    const arrayOfUsers = users && Object.keys(users).map(userId => ({
        label: users[userId].name,
        value: users[userId]._id
    }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="Оберіть користувача"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    )
}

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddCommentForm;