import * as React from 'react';
import { ButtonType } from '../Component/Types';
import Styles from './Button.module.css';

const Button = (props: ButtonType) => {
  return (
    <button
      type={props.type}
      className={`${Styles.button} ${props.style}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
