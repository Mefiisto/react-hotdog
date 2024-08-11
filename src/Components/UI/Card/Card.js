import Button from '../Button/Button';
import classes from './Card.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../../store/index-store';
import ButtonWithIcon from '../../ButtonWithIcon/ButtonWithIcon';

const Card = props => {

    const {id, image, title, price} = props.item;

    const favorite = useSelector(state => state.cart.favorite);
    const dispatch = useDispatch();

    const classNames = `${classes.card} ${props.className || ''} ${props.type === 'horizontal' ? classes.horizontal : '' }`

    let buttons = '';

    if(!props.disableButtons)
    {
        buttons = props.selected ?
        <Button type="primary" className={classes.cardButton} onClick={props.onDeSelect} >Убрать</Button>
        : <Button className={classes.cardButton} onClick={props.onSelect} >Выбрать</Button>
    }

    const isFavorite = favorite.some(item => item.id === id);

    const onFavoriteClickHandler = () => {
        dispatch(cartActions.addRemoveFavorite(props.item));
    }

    return (
        <div className={classNames}>
            <div className={classes.cardHeader}>
                <img className={classes.cardImage} src={image} alt={props.cardTitle} />
                <ButtonWithIcon className={classes.favoriteIcon} onClick={onFavoriteClickHandler} isActive={isFavorite}/>
            </div>
            <div className={classes.cardBodyWrapper}>
                <div className={classes.cardBody}>
                    <div className={classes.cardTitle}>
                        {title}
                    </div>
                    <span className={`text-mini secondary-text`}>Цена</span>
                    <div className={classes.cardPrice}>
                        <span>{price}</span>
                        <span> руб</span>
                    </div>
                </div>

                {buttons}
                
            </div>

        </div>
    );
}

export default Card;