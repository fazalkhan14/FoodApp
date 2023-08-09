import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);

    const [showCheckout,setShowCheckout] = useState(false);

    const showCheckoutHandler = () => {
        setShowCheckout((prev) => (
            !prev
        ));
    }

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1});
    }

    const cartItems = 
    (   <ul className={classes['cart-items']}>
        {
            cartCtx.items.map((item) => (
                <CartItem key={item.id}
            name={item.name} 
            price={item.price} 
            amount={item.amount} 
            onRemove={cartItemRemoveHandler.bind(null,item.id)} 
            onAdd={cartItemAddHandler.bind(null,item)}/>
            ))
        }
        </ul>
        )

    return (
        <Modal onClose={props.onHideCart} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                {!showCheckout && <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>}
                {hasItems && !showCheckout && <button className={classes.button} onClick={showCheckoutHandler}>Order</button>}
                {showCheckout && <Checkout onCancel={showCheckoutHandler}/>}
            </div>
        </Modal>
    )
};

export default Cart;