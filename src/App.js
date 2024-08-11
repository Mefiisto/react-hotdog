import React, {useCallback} from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import Main from './Components/Main/Main.js';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';

import { cartActions, mainActions } from './store/index-store.js';
import Footer from './Components/Footer/Footer.js';
import SubmitOrder from './Components/SubmitOrder/SubmitOrder.js';
  

function App() {

  const dispatch = useDispatch();

  const getCategories = useCallback(async () => 
  {
    const response = await fetch('https://product-app-cc60a-default-rtdb.firebaseio.com/react-hotdog.json');
  
    if(!response.ok) throw new Error('Ошибка загрузки');

    const data = await response.json();
    console.log(data);
    dispatch(mainActions.setCategories(data.categories));
  }, [dispatch])


  useEffect(() => {

    getCategories()
    .catch(e => {
    });

    const favorite = localStorage.getItem('favorite');
    const history = localStorage.getItem('ordersHistory');

    if (favorite) dispatch(cartActions.setFavorite(JSON.parse(favorite)));
    if (history) dispatch(cartActions.setOrdersHistory(JSON.parse(history)));

  }, [dispatch, getCategories]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact={true} element={<React.Fragment><Main /> <Footer /></React.Fragment>} />
        <Route path='/submitOrder' exact={true} element={<SubmitOrder />} />
      </Routes>
    </div>
  );
}

export default App;
