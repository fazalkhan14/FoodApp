import React, { Fragment,useState } from 'react';
import Header from '../src/components/Layout/Header';
import Cart from './components/Cart/Cart';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {

  const [showCart,setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  }

  const hideCartHandler = () => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
