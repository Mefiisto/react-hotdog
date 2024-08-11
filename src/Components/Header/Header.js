import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { cartActions } from '../../store/index-store.js';
import classes from './Header.module.css';
import logo from '../../Images/logo.jpg';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import SidePage from '../SidePage/SidePage.js';
import Info from '../UI/Info/Info.js';

const nothingHere = <Info children="Ничего нет" />;

const Header = props => 
{
    const cart = useSelector(state => state.cart);
    const favorite = useSelector(state => state.cart.favorite);
    const categories = useSelector(state => state.main.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isCartModalVisible, setIsCartModalVisible] = useState(false);
    const [isFavoriteModalVisible, setIsFavoriteModalVisible] = useState(false);

    const onCartClickHandler = () => {
        setIsCartModalVisible(true);
    }
    const onCloseCartClickHandler = () => {
        setIsCartModalVisible(false);
    }
    const onFavoriteClickHandler = () => 
    {
        setIsFavoriteModalVisible((prev => !prev));
    }

    const onMyOrdersClickHandler = () => 
    {

    }

    const startOrderHandler = (e) => 
    {
        navigate('./submitOrder');
        setIsCartModalVisible(false);
    } 


    const selectClickHandler = (product, categoryId) => 
    {
        console.log(categoryId);
        dispatch(cartActions.addOrderItem({item: product, category: categoryId}))
    }
    const deSelectClickHandler = (product) => 
    {
        for(const orderCategory in cart.order)
        { 
            if(cart.order[orderCategory] !==  undefined && cart.order[orderCategory].id === product.id)
            {
                dispatch(cartActions.removeOrderItem({category: orderCategory}))
            }
        }
    }

    const cartContent = () => 
    {
        const cartItems = [];

        for(const orderCategory in cart.order)
        {
            if(cart.order[orderCategory] !==  undefined)
            {
                cartItems.push(cart.order[orderCategory]);
            }
        }

        if(cartItems.length === 0) return nothingHere;

        return cartItems.map((item) => 
        { 
            return <Card 
                key={item.id}
                type="horizontal" 
                item={item} 
                selected={true}
                onSelect={() => selectClickHandler(item)}
                onDeSelect={() => deSelectClickHandler(item)}
            />
        })
    }
    const cartButtons = <div>
        {cart.totalPrice > 0 ?<Button type="primary" onClick={startOrderHandler}>Перейти к оформлению</Button> : ''}
        <Button onClick={onCloseCartClickHandler}>Закрыть</Button>
    </div>

    const favoriteContent = favorite.length > 0 ? favorite.map((item) => 
    { 
        let isItemSelected = false;
        let itemCategory = '';

        for(const orderCategory of categories)
        {
            orderCategory.items.forEach(categoryItem => {
                if(categoryItem.id === item.id)
                {
                    itemCategory = orderCategory.id;
                
                }
                if(cart.order[orderCategory.id]?.id === item.id)
                {
                    isItemSelected = true;
                }
            });
        }

        return <Card 
            key={item.id}
            type="horizontal" 
            selected={isItemSelected}
            item={item} 
            onSelect={() => selectClickHandler(item, itemCategory)}
            onDeSelect={() => deSelectClickHandler(item)}
        />
    }) : nothingHere;

    const ordersContent = <div></div>;

    return (
        <div className={classes.header}>
            <Link to='/' className={classes.logoContainer}>
                <img src={logo} className={classes.logoImage} alt='logo' />
                <div className={classes.logoText}>
                    <h1>REACT HOTDOG</h1>
                    <h3 className={`secondary-text`}>Собери свой хот-дог</h3>
                </div>
            </Link>

            <div className={classes.headerButtons}>
                <Button onClick={onFavoriteClickHandler} type="primary" className={classes.headerButton}>Избранное</Button>
                <Button onClick={onMyOrdersClickHandler} type="primary" className={classes.headerButton}>Мои Заказы</Button>
                <Button onClick={onCartClickHandler} onCartClickHandler type="primary" className={classes.headerButton}>Корзина</Button>
            </div>

            {isFavoriteModalVisible && 
                <SidePage 
                    title={'Избранное'} 
                    onClose={onFavoriteClickHandler}
                    footerContent={<Button onClick={onFavoriteClickHandler}>Закрыть</Button>}
                    >
                    {favoriteContent}
                </SidePage>
            }

            {isCartModalVisible && 
                <SidePage 
                    title={'Корзина'} 
                    onClose={onCloseCartClickHandler}
                    footerContent={cartButtons}
                    >
                    {cartContent()}
                </SidePage>
            }
        </div>
    );
}

export default Header;

