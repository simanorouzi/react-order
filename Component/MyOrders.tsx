import * as React from 'react';
import ReactDom from 'react-dom';
import Frame from '../Component/Frame';
import MyOrderItem from '../Component/MyOrderItem';
import { ModalType } from '../Component/Types';
import OrdersContext from '../Context/OrdersContext';
import Button from '../UI/Button';
import Styles from './MyOrders.module.css';

const BackDrop = (props: ModalType) => {
  return <div className="backdrop" onClick={props.onConfirm}></div>;
};

const OverLay = (props: ModalType) => {
  const ctx = React.useContext(OrdersContext);

  const initialPrice = ctx.Orders.reduce(
    (prev, current) => prev + current.price * current.count,
    0
  );

  return (
    <div className="my-orders">
      <Frame style="myframe-order">
        {ctx.Orders.length > 0 && (
          <div>
            <ul className={Styles['myorder-list']}>
              {ctx.Orders.map((item) => (
                <MyOrderItem
                  key={item.foodID}
                  foodID={item.foodID}
                  title={item.title}
                  price={item.price}
                  count={item.count}
                />
              ))}
            </ul>
            <div>${initialPrice}</div>
            <div>
              <Button style="white-button" onClick={props.onConfirm}>
                Close
              </Button>
              <Button>Order</Button>
            </div>
          </div>
        )}
        {ctx.Orders.length == 0 && (
          <div className="empty-list">Your Cart Is Empty! </div>
        )}
      </Frame>
    </div>
  );
};

const MyOrders = (props: ModalType) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <BackDrop onConfirm={props.onConfirm} />,
        document.getElementById('placeBackdrop')
      )}
      {ReactDom.createPortal(
        <OverLay onConfirm={props.onConfirm} />,
        document.getElementById('placeOrderFrame')
      )}
    </React.Fragment>
  );
};

export default MyOrders;
