import * as React from 'react';
import { actionType, inputValidateType } from '../Component/Types';

const initialValue: inputValidateType = { value: '', isTouched: false };
const reduceInputValue = (state: inputValidateType, action: actionType) => {
  switch (action.type) {
    case 'inputValue':
      return { value: action.value, isValid: state.isTouched };
    case 'blur':
      return { value: state.value, isValid: action.value };
    default:
      return initialValue;
  }
};

const useValidate = (applyTypeValidation) => {
  const [inputValue, dispatchInputValue] = React.useReducer(
    reduceInputValue,
    initialValue
  );
  const inputIsValid = applyTypeValidation(inputValue);
  const formISValid = inputIsValid;
  const hasError = !inputIsValid && inputValue;

  const inputOnChangeHandler = (event) => {
    dispatchInputValue({ type: 'inputValue', value: event.target.value });
  };
  const inputOnBlurHandler = () => {
    dispatchInputValue({ type: 'blur', value: true });
  };
};
const formSubmitHandler = () => {};

export default useValidate;
