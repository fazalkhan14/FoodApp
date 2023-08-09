import React,{ useRef, useState } from "react";
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const [formInputsIsValid,setFormInputsIsValid] = useState({
        name : true,
        street : true,
        city : true,
        postalCode : true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value => value.trim() === '';
    const isFiveCharacters = value => value.trim().length === 5; 

    const formHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveCharacters(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

        if(!formIsValid){
            setFormInputsIsValid({
                name : enteredNameIsValid,
                street : enteredStreetIsValid,
                city : enteredCityIsValid,
                postalCode : enteredPostalCodeIsValid
            })
        }
    }

    const nameControlClasses = `${classes.control} ${formInputsIsValid.name ? "" : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsIsValid.street ? "" : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsIsValid.city ? "" : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsIsValid.postalCode ? "" : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={formHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input 
                    id="name"
                    type="text"
                    ref={nameInputRef}
                />
                {!formInputsIsValid.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input 
                    id="street"
                    type="text"
                    ref={streetInputRef}
                />
                {!formInputsIsValid.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postalCode">Postal Code</label>
                <input 
                    id="postalCode"
                    type="text"
                    ref={postalCodeInputRef}
                />
                {!formInputsIsValid.postalCode && <p>Please enter a valid postal code.(enter 5 characters)</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input 
                    id="city"
                    type="text"
                    ref={cityInputRef}
                />
                {!formInputsIsValid.city && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button type="submit" className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;