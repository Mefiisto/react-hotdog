import classes from './Button.module.css';


const Button = props =>
{
    const classNames = `${classes.button} ${props.className || ''} ${props.type === 'primary' ? classes.primary : '' }`
    return (
        <button 
            type={props.actionType}
            onClick={props.onClick}
            className={classNames}>
            {props.children}
        </button>
    );

}

export default Button;