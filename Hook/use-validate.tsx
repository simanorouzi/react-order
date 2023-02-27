import * as React from 'react';
import { actionType, inputValidateType } from '../Component/Types';

const initialValue: inputValidateType = { value: '', isTouched: false };
const reduceInputValue = (state: inputValidateType, action: actionType) => {
  switch (action.type) {
    case 'inputValue':
      return { value: action.value, isTouched: state.isTouched };
    case 'blur':
      return { value: state.value, isTouched: action.value };
    case 'reset':
      return initialValue;
    default:
      return initialValue;
  }
};

const useValidate = (applyTypeValidation) => {
  const [inputValue, dispatchInputValue] = React.useReducer(
    reduceInputValue,
    initialValue
  );
  const inputIsValid = applyTypeValidation(inputValue.value);
  const hasError = !inputIsValid && inputValue.isTouched;
  console.log(inputIsValid, applyTypeValidation);
  const inputChangeHandler = (event) => {
    dispatchInputValue({ type: 'inputValue', value: event.target.value });
  };
  const inputBlurHandler = () => {
    dispatchInputValue({ type: 'blur', value: true });
  };
  const formSubmitHandler = () => {
    dispatchInputValue({ type: 'reset' });
  };

  return {
    inputIsValid,
    hasError,
    inputValue: inputValue.value,
    isTouched: inputValue.isTouched,
    inputChangeHandler,
    inputBlurHandler,
    formSubmitHandler,
  };
};

export default useValidate;
