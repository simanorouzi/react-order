import * as React from 'react';
import { FoodType } from '../Component/Types';
import OrdersContext from '../Context/OrdersContext';
import Button from '../UI/Button';
import Input from '../UI/Input';

const OrderItem = (props: FoodType) => {
  let ctxOrder = React.useContext(OrdersContext);
  const orderItem = ctxOrder.Orders.find((item) => item.foodID == props.id);
  const count = orderItem?.count ?? 0;
  const [isValid, setIsValid] = React.useState(true);
  const inputRef = React.useRef();

  const AddToOrderHandler = () => {
    ctxOrder.AddOrder({
      foodID: props.id,
      title: props.title,
      price: props.price,
      count: count + 1,
    });
  };

  const ChangeHandler = (event) => {
    //Negative Number
    setIsValid(event.target.value > 20);

    if (!isValid) {
      // TODO: make red input
    }
    if (event.target.value > 0) {
      ctxOrder.AddOrder({
        foodID: props.id,
        title: props.title,
        price: props.price,
        count: +event.target.value,
      });
    }
  };

  console.log(isValid);
  return (
    <li>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <span>${props.price}</span>
      </div>
      <div>
        <Input
          ref={inputRef}
          lableName="Amount"
          input={{
            Style: `${!isValid ? 'invalid' : ''}`,
            type: 'number',
            initialValue: '0',
            onChange: ChangeHandler,
            name: 'Amount',
            value: count.toString(),
          }}
        />
        <div className="add-btn">
          <Button onClick={AddToOrderHandler}>+Add</Button>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
