import {useRef,useState} from 'react';
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5; 


const CheckOut = (props) =>{

const  [formInputValidity, setFormInputValidity] = useState({
        name : true,
        street : true,
        postal: true,
        city : true,
});

const nameInputRef =useRef();
const streetInputRef =useRef();
const postalInputRef =useRef();
const cityInputRef =useRef();


const confirmHandler = (event) =>{
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    

    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal: enteredPostalIsValid,
        city: enteredCityIsValid
    })
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postal:enteredPostal
    });

    event.target.reset();
}

const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
const postalControlClasses = `${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`;
const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id ="name" ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please entered valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id ="street" ref={streetInputRef}/>
                {!formInputValidity.street && <p>Please entered valid street</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id ="postal" ref={postalInputRef}/>
                {!formInputValidity.postal && <p>Please entered valid postal code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id ="city" ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please entered valid city</p>}
            </div>
            {/* <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button> */}
             <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                     Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
             </div>
        </form>
    )  
}

export default CheckOut;
