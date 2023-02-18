import * as React from 'react';
import Button from '../UI/Button';
import OrdersContext from '../Context/OrdersContext';
import MyOrders from '../Component/MyOrders';

const MainHeader = () => {
  const [myOrderPage, setMyOrderPage] = React.useState(false);
  const ctxOrder = React.useContext(OrdersContext);
  const items = ctxOrder.Orders.map((item) => item.count);
  const count = items.reduce((prev, current) => prev + current, 0);

  const OpenMyListHandler = () => {
    setMyOrderPage(true);
  };

  const CloseMyListHandler = () => {
    setMyOrderPage(false);
  };

  return (
    <React.Fragment>
      {myOrderPage && <MyOrders onConfirm={CloseMyListHandler} />}
      <div className="header">
        <span>ReactMeals</span>
        <div>
          <Button type="button" onClick={OpenMyListHandler}>
            Your Cart <i>{count}</i>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainHeader;
