import React from 'react';
import {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import classes from './SubmitOrder.module.css';
import Input from "../UI/Input/Input";
import Button from '../UI/Button/Button';
import Info from '../UI/Info/Info';
import { cartActions } from '../../store/index-store';

const SubmitOrder = props => 
{

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [nameState, setNameState] = useState({value: '', isValid: false, isTouched: false, error: 'Заполните поле'});
    const [emailState, setEmailState] = useState({value: '', isValid: false, isTouched: false, error: 'Заполните поле'});
    const [phoneState, setPhoneState] = useState({value: '',isValid: false, isTouched: false, error: 'Заполните поле'});
    
    const [cityState, setCityState] = useState({value: '',isValid: false, isTouched: false, error: 'Заполните поле'});
    const [streetState, setStreetState] = useState({value: '',isValid: false, isTouched: false, error: 'Заполните поле'});
    const [houseState, setHouseState] = useState({value: '',isValid: false, isTouched: false, error: 'Заполните поле'});

    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [orderSubmition, setorderSubmition] = useState({orderName: '', isSubmited: false});
    
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const streetRef = useRef();
    const houseRef = useRef();

    const onChangeHandler = (id, value) =>
    {
        if(id === 'name')
        {
            setNameState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() !== '') newState.isValid = true;
                else newState.isValid = false;
        
                newState.value = value;
        
                return newState;
            });
        }
        else if(id === 'email')
        {
            setEmailState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() === '') 
                {
                    newState.isValid = false;
                    newState.error = 'Заполните поле';
                }
                else if(!value.includes('@'))
                {
                    newState.isValid = false;
                    newState.error = 'Введите email правильно';
                }
                else
                {
                    newState.isValid = true;
                    newState.error = '';
                }
        
                newState.value = value;
        
                return newState;
            });
        }
        else if(id === 'phone' && (/^\d*$/).test(value))
        {
            setPhoneState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() !== '') newState.isValid = true;
                else newState.isValid = false;
        
                newState.value = value;
        
                return newState;
            });
        }
        else if(id === 'city')
        {
            setCityState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() !== '') newState.isValid = true;
                else newState.isValid = false;
        
                newState.value = value;
        
                return newState;
            });
        }
        else if(id === 'street')
        {
            setStreetState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() !== '') newState.isValid = true;
                else newState.isValid = false;
        
                newState.value = value;
        
                return newState;
            });
        }
        else if(id === 'house')
        {
            setHouseState(prevState => 
            {
                const newState = {...prevState};
                
                if(value.trim() !== '') newState.isValid = true;
                else newState.isValid = false;
        
                newState.value = value;
        
                return newState;
            });
        }
    }

    const onBlurHandler = (id) =>
    {
        if(id === 'name' && !nameState.isTouched)
        { 
            setNameState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
        else if(id === 'email' && !emailState.isTouched)
        { 
            setEmailState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
        else if(id === 'phone' && !phoneState.isTouched)
        { 
            setPhoneState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
        else if(id === 'city' && !cityState.isTouched)
        { 
            setCityState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
        else if(id === 'street' && !streetState.isTouched)
        { 
            setStreetState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
        else if(id === 'house' && !houseState.isTouched)
        { 
            setHouseState(prevState => 
            {
                return {...prevState, isTouched: true}
            })
        }
    }

    const checkFormValidation = () => 
    {
        if(!nameState.isValid)
        {
            if(!nameState.isTouched) onBlurHandler('name')
            // nameRef.current.focus();
        }
        if(!emailState.isValid)
        {
            if(!emailState.isTouched) onBlurHandler('email')
            // emailRef.current.focus();
        }
        if(!phoneState.isValid)
        {
            if(!phoneState.isTouched) onBlurHandler('phone')
            // phoneRef.current.focus();
        }
        if(!cityState.isValid)
        {
            if(!cityState.isTouched) onBlurHandler('city')
            // cityRef.current.focus();
        }
        if(!streetState.isValid)
        {
            if(!streetState.isTouched) onBlurHandler('street')
            // streetRef.current.focus();
        }
        if(!houseState.isValid)
        {
            if(!houseState.isTouched) onBlurHandler('house')
            // houseRef.current.focus();
        }

        return nameState.isValid && emailState.isValid && phoneState.isValid && cityState.isValid && streetState.isValid && houseState.isValid;
    }

    const sendOrderToServer = async () =>
    {
        const orderDetails = {
            order: cart.order,
            user: {
                name: nameState.value,
                email: emailState.value,
                phone: phoneState.value,
                city: cityState.value,
                street: streetState.value,
                house: houseState.value
            }
        };

        fetch('https://product-app-cc60a-default-rtdb.firebaseio.com/react-hotdog/orders.json', {
            method: 'POST', 
            body: JSON.stringify(orderDetails)
        }).then(response => response.json())
        .then(data => 
        {
            setorderSubmition({orderName: data.name, isSubmited: true});
    
            dispatch(cartActions.clearOrder());
        })
        .catch(e => {});

    }
    
    const onFormSubmit = e =>
    {
        e.preventDefault();

        const isFormValid = checkFormValidation();

        if(isFormValid)
        {
            const orderList = [];

            for(const orderCategory in cart.order)
            { 
                const orderItem = cart.order[orderCategory];
                if(orderItem !== undefined)
                {
                    orderList.push(orderItem);
                }
            }

            if(orderList.length === 0)
            {
                setIsCartEmpty(true);
                return;
            }

            sendOrderToServer();
        }
    }
    

    const isNameInvalid = !nameState.isValid && nameState.isTouched;
    const isEmailInvalid = !emailState.isValid && emailState.isTouched;
    const isPhoneInvalid = !phoneState.isValid && phoneState.isTouched;

    const isCityInvalid = !cityState.isValid && cityState.isTouched;
    const isStreetInvalid = !streetState.isValid && streetState.isTouched;
    const isHouseInvalid = !houseState.isValid && houseState.isTouched;

    const form = <form className={classes.submitOrderWrapper} onSubmit={onFormSubmit}>
        <div className={classes.orderFieldsWrapper}>
            <div className={`${classes.fistBlock} ${classes.orderFields}`}>
                <Input 
                    id="name" 
                    ref={nameRef}
                    label="Имя"
                    placeholder="Введите имя"
                    isInvalid={isNameInvalid}
                    errorMessage={nameState.error}
                    value={nameState.value} 
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    // input={{required: true}}
                />
                
                <Input 
                    id="email" 
                    ref={emailRef}
                    label="Email"
                    placeholder="Введите Email"
                    isInvalid={isEmailInvalid}
                    errorMessage={emailState.error}
                    value={emailState.value} 
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    // input={{required: true}}
                />
                <Input 
                    id="phone" 
                    ref={phoneRef}
                    label="Телефон"
                    placeholder="Введите телефон"
                    isInvalid={isPhoneInvalid}
                    errorMessage={phoneState.error}
                    value={phoneState.value} 
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    // input={{required: true}}
                />
            </div>
            <div className={`${classes.secondBLock} ${classes.orderFields}`}>
                <Input 
                        id="city" 
                        ref={cityRef}
                        className={classes.reverseLabel}
                        label="Город"
                        placeholder="Введите город"
                        isInvalid={isCityInvalid}
                        errorMessage={cityState.error}
                        value={cityState.value} 
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        // input={{required: true}}
                    />
                    
                    <Input 
                        id="street" 
                        ref={streetRef}
                        className={classes.reverseLabel}
                        label="Улица"
                        placeholder="Введите улицу"
                        isInvalid={isStreetInvalid}
                        errorMessage={streetState.error}
                        value={streetState.value} 
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        // input={{required: true}}
                    />
                    <Input 
                        id="house" 
                        ref={houseRef}
                        className={classes.reverseLabel}
                        label="Дом"
                        placeholder="Введите дом"
                        isInvalid={isHouseInvalid}
                        errorMessage={houseState.error}
                        value={houseState.value} 
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        // input={{required: true}}
                    />
            </div>
        </div>
        <div className={classes.submitOrderFooter}>
            <Button actionType="submit" type="primary" >Оформить заказ</Button>
            {isCartEmpty ? 
                <div>
                    В корзине ничего нет, добавьте элементы &nbsp;
                    <Button onClick={() => navigate('/')} >Перейти к добавлению </Button>
                </div> 
            : ''}
        </div>
    </form>;

    const orderSubmited = <div>
        <Info>Заказ {orderSubmition.orderName} оформлен</Info>
        <Button onClick={() => navigate('/')} type="primary" >Вернуться на главную</Button>
    </div>
    return (
        <React.Fragment>
            { orderSubmition.isSubmited ? orderSubmited : form}
        </React.Fragment>
    )
}

export default SubmitOrder;