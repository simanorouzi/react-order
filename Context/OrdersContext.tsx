import * as React from 'react';
import { OrderType } from '../Component/Types';

const OrdersContext = React.createContext<{
  Orders: OrderType[];
  AddOrder: (item: OrderType) => void;
  DeleteOrder: (foodID: number) => void;
}>({
  Orders: [],
  AddOrder: () => {},
  DeleteOrder: () => {},
});

export default OrdersContext;
