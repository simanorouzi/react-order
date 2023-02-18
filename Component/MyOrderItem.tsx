import * as React from 'react';
import { OrderType } from '../Component/Types';
import OrdersContext from '../Context/OrdersContext';

const MyOrderItem = (props: OrderType) => {
  let ctx = React.useContext(OrdersContext);
  const [count, setCount] = React.useState(props.count);

  let food: OrderType = {
    title: props.title,
    count: count,
    foodID: props.foodID,
    price: props.price,
  };

  const AddHandler = () => {
    let newCount = count + 1;
    setCount(newCount);
    food.count = newCount;
    ctx.AddOrder(food);
  };

  const DeleteHandler = () => {
    let newCount = count - 1;
    setCount(newCount);

    if (newCount > 0) {
      food.count = newCount;
      ctx.AddOrder(food);
    } else {
      ctx.DeleteOrder(props.foodID);
    }
  };

  return (
    <li>
      <div>
        <h3>{props.title}</h3>
        <span>${props.price}</span>
      </div>
      <div>
        x<label>{count}</label>
      </div>
      <div>
        <button onClick={AddHandler}>+</button>
        <button onClick={DeleteHandler}>-</button>
      </div>
    </li>
  );
};

export default MyOrderItem;
