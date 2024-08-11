import { useNavigate } from "react-router-dom";

import Button from '../UI/Button/Button.js';
import classes from './Footer.module.css';
import { useSelector } from 'react-redux';

const Footer = props => {
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const navigate = useNavigate();

    if(totalPrice === 0) return '';
    return (
        <div className={classes.footer}>
            <h3 className={classes.totalPrice}>
                <span>Итого: </span>
                <span>{totalPrice}</span>
                <span>руб.</span>
            </h3>

            <Button type="primary" onClick={() => navigate('/submitOrder')}>Перейти к оформлению</Button>
        </div>
    )
}

export default Footer