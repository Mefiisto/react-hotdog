import {createSlice, configureStore} from '@reduxjs/toolkit';


const mainSlice = createSlice({
    name: 'main',
    initialState: {
        categories: []
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
            localStorage.setItem('categories', JSON.stringify(action.payload));
        }
    }
});
export const mainActions = mainSlice.actions;

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        order: {
            buns: undefined,
            sausages: undefined,
            sauces: undefined,
        },
        favorite: [],
        ordersHistory: [],
        totalPrice: 0
    },
    reducers: {
        addOrderItem(state, action) {
            const order = state.order;
            const payload = action.payload;

            state.order[payload.category] = payload.item;

            let newTotalPrice = 0;

            for(let orderItem in order)
            {
                if(order[orderItem]) newTotalPrice += order[orderItem].price;
            }

            state.totalPrice = newTotalPrice;
        },
        removeOrderItem(state, action) {
            const order = state.order;
            const payload = action.payload;

            state.order[payload.category] = undefined;

            let newTotalPrice = 0;

            for(let orderItem in order)
            {
                if(order[orderItem]) newTotalPrice += order[orderItem].price;
            }

            state.totalPrice = newTotalPrice;
        },
        clearOrder(state, action) {
            const order = state.order;

            for(let orderCategory in order)
            {
                order[orderCategory] = undefined;
            }
            state.totalPrice = 0;
        },

        addRemoveFavorite(state, action)
        {
            const favoriteItem = action.payload;

            if(!state.favorite.some(item => item.id === favoriteItem.id))
            {
                state.favorite.push(favoriteItem);
            }
            else
            {
                state.favorite = state.favorite.filter(item => item.id !== favoriteItem.id);
            }
            localStorage.setItem('favorite', JSON.stringify(state.favorite))
        },
        setFavorite(state, action)
        {
            state.favorite = action.payload;       
        },
        setOrdersHistory(state, action)
        {
            const ordersHistory = action.payload;
 
            state.ordersHistory = ordersHistory;
            // localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory));
        },
        addHistoryOrder(state, action)
        {
            state.ordersHistory.push(action.payload);

            localStorage.setItem('ordersHistory', JSON.stringify(state.ordersHistory));
        },
        removeHistoryOrder(state, action)
        {
            const orderName = action.payload;

            state.ordersHistory = state.ordersHistory.filter(order => order.name !== orderName)

            localStorage.setItem('ordersHistory', JSON.stringify(state.ordersHistory));
        }
    }
});
export const cartActions = cartSlice.actions;

const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        cart: cartSlice.reducer
    }
});


export default store;