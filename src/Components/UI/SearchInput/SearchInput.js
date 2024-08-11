import { useState } from 'react';
import classes from './SearchInput.module.css';

const SeachIcon = props => <svg className={`${classes.searchIcon} ${classes.inputIcon}`} onClick={props.onClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_21_1337)">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.99999 1.50244C4.85921 1.50244 1.50244 4.85921 1.50244 8.99999C1.50244 13.1408 4.85921 16.4975 8.99999 16.4975C10.8003 16.4975 12.4524 15.863 13.7449 14.8054L17.2709 18.3314C17.5638 18.6243 18.0386 18.6243 18.3315 18.3314C18.6244 18.0385 18.6244 17.5636 18.3315 17.2707L14.8055 13.7447C15.8631 12.4523 16.4975 10.8002 16.4975 8.99999C16.4975 4.85921 13.1408 1.50244 8.99999 1.50244ZM3.00244 8.99999C3.00244 5.68764 5.68764 3.00244 8.99999 3.00244C12.3123 3.00244 14.9975 5.68764 14.9975 8.99999C14.9975 12.3123 12.3123 14.9975 8.99999 14.9975C5.68764 14.9975 3.00244 12.3123 3.00244 8.99999Z" fill="#FFA236"/>
    </g>
    <defs>
    <clipPath id="clip0_21_1337">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
</svg>;

const CloseIcon = props => <svg className={`${classes.closeIcon} ${classes.inputIcon}`} onClick={props.onClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2002_2616)">
        <path d="M3.98139 3.98139C4.27428 3.6885 4.74916 3.6885 5.04205 3.98139L10.0001 8.93947L14.9582 3.98139C15.2511 3.6885 15.726 3.6885 16.0189 3.98139C16.3118 4.27428 16.3118 4.74916 16.0189 5.04205L11.0608 10.0001L16.0189 14.9582C16.3118 15.2511 16.3118 15.726 16.0189 16.0189C15.726 16.3118 15.2511 16.3118 14.9582 16.0189L10.0001 11.0608L5.04205 16.0189C4.74916 16.3118 4.27428 16.3118 3.98139 16.0189C3.6885 15.726 3.6885 15.2511 3.98139 14.9582L8.93947 10.0001L3.98139 5.04205C3.6885 4.74916 3.6885 4.27428 3.98139 3.98139Z" fill="#FFA236"/>
        </g>
        <defs>
        <clipPath id="clip0_2002_2616">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
    </svg>;

const SearchInput = props => 
{
    const [inputValue, setInputValue] = useState('');

    const onChangeInputHandler = e => 
    {
        setInputValue(e.target.value);
        props.onChange(e.target.value);
    }

    const onClearChangeHandler = () => 
    {
        setInputValue('');
        props.onClear();
    }

   return (<div className={classes.searchInputWrapper}>
        <input 
            className={classes.searchInput}
            value={inputValue}
            onChange={onChangeInputHandler} />
        {
        inputValue !== '' ? 
        <CloseIcon onClick={onClearChangeHandler} />
        : <SeachIcon />
        }
   </div>)
}

export default SearchInput;