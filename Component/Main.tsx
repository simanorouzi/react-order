import * as React from 'react';
import MainHeader from '../Component/MainHeader';
import { OrderType } from '../Component/Types';
import OrdersContext from '../Context/OrdersContext';
import OrderList from '../UI/OrderList';

const Main = () => {
  const [orders, setOrders] = React.useState<OrderType[]>([]);

  const AddOrderHandler = (item: OrderType) => {
    const food = orders.filter((food) => food.foodID == item.foodID);
    const otherFood = orders.filter((food) => food.foodID != item.foodID);

    if (food.length > 0) {
      food[0].count = item.count;

      setOrders([...food, ...otherFood]);
      console.log({ orders });
    } else {
      setOrders([...orders, item]);
    }
  };

  const DeleteOrderHandler = (foodID: number) => {
    const food = orders.filter((food) => food.foodID != foodID);
    setOrders(food);
  };

  return (
    <OrdersContext.Provider
      value={{
        Orders: orders,
        AddOrder: AddOrderHandler,
        DeleteOrder: DeleteOrderHandler,
      }}
    >
      <div className="main-frame">
        <MainHeader />
        <div className="introduce-frame">
          In a world that is getting more and more expensive, we want to show
          that at McDonald's you get more for your money. In a world that is
          getting more and more expensive, we want to show that at McDonald's
          you get more for your money.
        </div>
        <OrderList />
      </div>
    </OrdersContext.Provider>
  );
};

export default Main;

// setOrders => render Main => set value Context => render useContext
