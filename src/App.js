import React from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import Main from './Components/Main/Main.js';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';

import { cartActions, mainActions } from './store/index-store.js';
import Footer from './Components/Footer/Footer.js';
import SubmitOrder from './Components/SubmitOrder/SubmitOrder.js';
  

function App() {

  const dispatch = useDispatch();

  const getCategories = async () => 
  {
    const response = await fetch('https://product-app-cc60a-default-rtdb.firebaseio.com/react-hotdog.json');
  
    if(!response.ok) throw new Error('Ошибка загрузки');

    const data = await response.json();
    console.log(data);
    dispatch(mainActions.setCategories(data.categories));
  }

  const setFavorite = () => 
  {
    const favorite = localStorage.getItem('favorite');

    if (favorite) dispatch(cartActions.setFavorite(JSON.parse(favorite)));
  }

  useEffect(() => {

    getCategories()
    .catch(e => {
    });

    setFavorite();
  }, []);

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
