import * as React from 'react';
import {
  checkOutInputType,
  checkOutType,
  HttpRequestType,
  method,
} from '../Component/Types';
import OrdersContext from '../Context/OrdersContext';
import useValidate from '../Hook/use-validate';
import useHttpHook from '../Hook/useHttpHook';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Styles from './MyOrders.module.css';

const Checkout = (props: checkOutInputType) => {
  const ctx = React.useContext(OrdersContext);
  const { error, isLoading, doFetch } = useHttpHook();

  const emptyValidation = (inputValue) => inputValue !== '';
  const {
    inputValue: nameValue,
    inputIsValid: nameIsValid,
    isTouched: nameIsTouched,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useValidate(emptyValidation);

  const {
    inputValue: cityValue,
    inputIsValid: cityIsValid,
    isTouched: cityIsTouched,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useValidate(emptyValidation);

  const {
    inputValue: postalCodeValue,
    inputIsValid: postalCodeIsValid,
    isTouched: postalCodeIsTouched,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useValidate(emptyValidation);

  const {
    inputValue: streetValue,
    inputIsValid: streetIsValid,
    isTouched: streetTouched,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useValidate(emptyValidation);

  const formIsValid =
    nameIsValid && cityIsValid && postalCodeIsValid && streetIsValid;

  const inputNameChangeHandler = (event) => {
    nameChangeHandler(event);
  };
  const inputNameBlurHandler = () => {
    nameBlurHandler();
  };

  const inputCityChangeHandler = (event) => {
    cityChangeHandler(event);
  };
  const inputCityBlurHandler = () => {
    cityBlurHandler();
  };

  const inputPostalCodeChangeHandler = (event) => {
    postalCodeChangeHandler(event);
  };
  const inputPostalCodeBlurHandler = () => {
    postalCodeBlurHandler();
  };

  const inputStreetChangeHandler = (event) => {
    streetChangeHandler(event);
  };
  const inputStreetBlurHandler = () => {
    streetBlurHandler();
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const body: checkOutType = {
      orderItems: ctx.Orders,
      checkOutFields: {
        name: nameValue,
        city: cityValue,
        postalCode: postalCodeValue,
        street: streetValue,
      },
    };

    const requestParams: HttpRequestType = {
      methodType: method.Post,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    };

    props.onLoading();

    await doFetch({
      url: 'https://foodorder-35902-default-rtdb.europe-west1.firebasedatabase.app/Orders.json',
      request: requestParams,
    });

    console.log(isLoading, error);
    props.onShowNextPage(isLoading, error);
  };

  return (
    <form className={Styles['form-address']} onSubmit={formSubmitHandler}>
      <Input
        lableName="Name:"
        input={{
          type: 'text',
          name: 'name',
          value: nameValue,
          onChange: inputNameChangeHandler,
          onBlur: inputNameBlurHandler,
          className: nameHasError ? 'invalid' : '',
        }}
      />
      {nameHasError && <p className="invalid">Name Is Invalid!</p>}

      <Input
        lableName="City:"
        input={{
          type: 'text',
          name: 'city',
          value: cityValue,
          onChange: inputCityChangeHandler,
          onBlur: inputCityBlurHandler,
          className: cityHasError ? 'invalid' : '',
        }}
      />
      {cityHasError && <p className="invalid">City Is Invalid!</p>}

      <Input
        lableName="Postal Code:"
        input={{
          type: 'text',
          name: 'postalCode',
          value: postalCodeValue,
          onChange: inputPostalCodeChangeHandler,
          onBlur: inputPostalCodeBlurHandler,
          className: postalCodeHasError ? 'invalid' : '',
        }}
      />
      {postalCodeHasError && <p className="invalid">PostalCode Is Invalid!</p>}

      <Input
        lableName="Street:"
        input={{
          type: 'text',
          name: 'street',
          value: streetValue,
          onChange: inputStreetChangeHandler,
          onBlur: inputStreetBlurHandler,
          className: streetHasError ? 'invalid' : '',
        }}
      />
      {streetHasError && <p className="invalid">Street Is Invalid!</p>}

      <div>
        <Button style="white-button" onClick={props.onConfirm}>
          Close
        </Button>
        <Button type="submit" disabled={!formIsValid}>
          Order
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
