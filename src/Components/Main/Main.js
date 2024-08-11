import {useState, useEffect, useCallback} from 'react';
import Card from '../UI/Card/Card';
import classes from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/index-store';
import SearchInput from '../UI/SearchInput/SearchInput';
import Info from '../UI/Info/Info';

const Main = props => 
{
    const categories = useSelector(state => state.main.categories);
    const order = useSelector(state => state.cart.order);
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const selectClickHandler = (categoryId, product) => 
    {
        dispatch(cartActions.addOrderItem({category: categoryId, item: product}))
    }
    const deSelectClickHandler = (categoryId, product) => 
    {
        dispatch(cartActions.removeOrderItem({category: categoryId}))
    }

    const onSearchChangeHandler = (value) => 
    {
        setSearchValue(value)
    }

    const filterCategories = useCallback(() => 
    {
        return categories.map(category => 
        {
            const newCategory = {...category};

            newCategory.items = newCategory.items.filter(productItem => 
            {
                return searchValue === '' || productItem.title.toLowerCase().includes(searchValue.toLowerCase())
            })

            if(newCategory.items.length > 0) return newCategory;
            return null;

        }).filter(category => category !== null);
    }, [categories, searchValue]);


    useEffect(() => {
        setFilteredCategories(filterCategories());

    }, [order ,filterCategories])

    
    const contentList = filteredCategories.map(category => 
    {
        return (
            <div key={category.id} className={classes.categoryWrapper}>
                <h2 className={classes.categoryTitle}>{category.category}</h2>

                <div className={classes.productItemWrapper}>
                    {
                        category.items.map(productItem => {
                            const cartClassName = [classes.productItem];

                            if(order[category.id] && order[category.id].id === productItem.id) cartClassName.push(classes.selected);
                            
                                return (
                                    <Card 
                                        key={productItem.id} 
                                        item={productItem}
                                        categoryID={category.id}
                                        selected={order[category.id] && order[category.id].id === productItem.id}
                                        // isFavorite={favorite.some(item => item.id === productItem.id)}
                                        // onFavoriteClick={onFavoriteClickHandler}
                                        className={cartClassName.join(' ')}
                                        onSelect={() => selectClickHandler(category.id, productItem)}
                                        onDeSelect={() => deSelectClickHandler(category.id, productItem)}
                                    />
                                )
                        })
                    }
                </div>
            </div>
        )
    });

    return (
        <div className={classes.mainContainer}>
            <div className={classes.searchSection}>
                <h3> 
                    { searchValue !== '' ?
                        <span>Найдено товаров: {filteredCategories.reduce((accum, category) => accum += category.items.length, 0)}</span>
                        : ''
                    }
                </h3>
                <SearchInput onChange={onSearchChangeHandler} onClear={() => onSearchChangeHandler('')}  />
            </div>
            <div className={classes.categoriesWrapper}>
                {
                    filteredCategories.length > 0 ? contentList : <Info>Ничего не найдено <br /> Измените или очистите поиск</Info>
                }
            </div>
        </div>
    );
}

export default Main;