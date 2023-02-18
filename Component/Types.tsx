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
};

export type FoodType = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type OrderType = {
  title: string;
  price: number;
  count: number;
  foodID: number;
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
  value: string;
  initialValue: string;
  onChange: (event) => void;
};

export type FoodFinderType = {
  onFilter: (keyword) => void;
};
