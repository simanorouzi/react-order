import * as React from 'react';

export type FrameType = {
  style?: string;
  children: React.ReactNode;
};

export type ButtonType = {
  onClick: () => void;
  children: React.ReactNode;
  style: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
};

export type FoodType = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type OrderType = {
  title: string;
  price: number;
  count: number;
  foodID: string;
  onChangePrice?: (item: number) => void;
};

export type ModalType = {
  onConfirm: () => void;
};

export type InputFormat = {
  lableName: string;
  input: InputType;
  ref?: HTMLInputElement;
};

export type InputType = {
  name: string;
  type: string;
  Style?: string;
  className?: string;
  value: string;
  initialValue?: string;
  onChange?: (event) => void;
  onBlur?: (event) => void;
};

export type FoodFinderType = {
  onFilter: (keyword) => void;
};
export type UseHttpType = {
  url: string;
  request: HttpRequestType;
  applyFunction?: (data) => void;
};

export type HttpRequestType = {
  methodType: method;
  body?: string;
  headers?: {
    [key: string]: string;
  };
};

export type inputValidateType = {
  value: string;
  isTouched: boolean;
};

export type actionType = {
  value?: any;
  type: string;
};

export type checkOutInputType = {
  onConfirm: () => void;
  onShowNextPage: (isLoading, error) => void;
  onLoading: () => void;
};
export type checkOutType = {
  orderItems: OrderType[];
  checkOutFields: checkOutFieldType;
};

export type checkOutFieldType = {
  name: string;
  city: string;
  street: string;
  postalCode: string;
};

export enum method {
  Get = 0,
  Post = 1,
}
