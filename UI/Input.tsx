import * as React from 'react';
import { InputFormat, InputType } from '../Component/Types';

const Input = React.forwardRef<HTMLInputElement, InputFormat>(
  (props: InputFormat, ref) => {
    return (
      <div>
        <label htmlFor={props.input.name}>{props.lableName}</label>
        <input {...props.input} ref={ref}></input>
      </div>
    );
  }
);

export default Input;
