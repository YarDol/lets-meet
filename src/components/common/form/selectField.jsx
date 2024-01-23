import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({label, value, onChange, defaultOption, options, error}) => {
    
    const getInputClasses = () => { 
        return 'form-select ' + (error ? " is-invalid":"")
    }

    const handleChange = ({target}) => { 
        onChange({name: target.name, value: target.value})
    }
     
    let optionsArray = !Array.isArray(options) && typeof(options) === "object" ?
        Object.keys(options).map(optionName => ({name: options[optionName].name, value: options[optionName]._id})) : options;
        
    return (
        <div className="mb-4">
            <label htmlFor={label} className="form-label">{label}</label>
            <div className='input-group has-validation'>
                <select 
                    className={ getInputClasses()}
                    value={value} 
                    id="profession" 
                    name="profession" 
                    onChange={handleChange}
                >
                <option 
                    disabled value="">{defaultOption}
                </option>
                {
                    optionsArray && (
                        optionsArray.map((option) => <option key={option.value + "_" + option.name} value={option.value} >{option.name}</option>))
                }
                </select>
                {error && <div className="invalid-feedback">
                    {error}
                </div>}
            </div>
        </div>
    )
}

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField;