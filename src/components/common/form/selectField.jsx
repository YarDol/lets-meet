import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({label, value, onChange, defaultOption, options, error, name}) => {
    
    const getInputClasses = () => { 
        return 'form-select ' + (error ? " is-invalid":"")
    }

    const handleChange = ({ target }) => { 
        onChange({ name: target.name, value: target.value });
    }
     
    let optionsArray = !Array.isArray(options) && typeof(options) === "object" ?
        Object.values(options) : options;
        
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <div className='input-group has-validation'>
                <select 
                    className={ getInputClasses()}
                    value={value} 
                    id={name} 
                    name={name}
                    onChange={handleChange}
                >
                <option 
                    disabled value="">{defaultOption}
                </option>
                {
                    optionsArray.length > 0  && (
                        optionsArray.map((option) => <option key={option.value + "_" + option.name} value={option.value} >{option.label}</option>))
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
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
}

export default SelectField;