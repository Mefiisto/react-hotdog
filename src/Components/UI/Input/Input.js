import classes from './Input.module.css';
import { forwardRef, useRef } from 'react';


const Input = (props, ref) => 
{
    const localRef = useRef(null);
    // const ref = useRef(null);
    const {id, type, label, placeholder, value, isInvalid, errorMessage,  onChange, onBlur} = props;

    const onChangeHandler = (e) =>
    {
        onChange(e.target.id, e.target.value);
    }

    const onBlurHander = (e) =>
    {
        onBlur(e.target.id);
    }


    return (
        <div className={`${classes.inputWrapper} ${props.className || ''}  ${isInvalid ? classes.invalid : ''}`} >
            <div className={classes.labelWrapper}>
                <label htmlFor={id}>{label}</label>
                {isInvalid && <p className={classes.errorText}>{errorMessage}</p>}
            </div>

            <input 
                id={id} 
                value={value}
                type={type || 'text'}
                placeholder={placeholder}
                ref={ref || localRef}
                onChange={onChangeHandler}
                onBlur={onBlurHander}
                {...props.input}
            />
      </div>
    )
}

export default forwardRef(Input)