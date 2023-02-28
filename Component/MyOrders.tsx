import * as React from 'react';
import ReactDom from 'react-dom';
import Checkout from '../Component/Checkout';
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  let errorMessage = '';
  let hasError = false;
  const [nextPage, setNextPage] = React.useState(false);
  const initialPrice = ctx.Orders.reduce(
    (prev, current) => prev + current.price * current.count,
    0
  );

  const showNextPage = (loading, error) => {
    setTimeout(() => {
      setIsLoading(loading);
    }, 1000);

    if (error !== '') {
      errorMessage = error;
      hasError = true;
    }
    if (loading == false) {
      setNextPage(true);
    }
  };

  const showLoader = () => {
    setIsLoading(true);
  };
  return (
    <div className="my-orders">
      <Frame style="myframe-order">
        {isLoading && <div className="loading">Data Is Loading</div>}

        {!hasError && !isLoading && !nextPage && (
          <div>
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
                <div className={Styles['address-box']}>
                  <Checkout
                    onConfirm={props.onConfirm}
                    onLoading={showLoader}
                    onShowNextPage={showNextPage}
                  />
                </div>
              </div>
            )}
            {ctx.Orders.length == 0 && (
              <div className="empty-list">Your Cart Is Empty! </div>
            )}
          </div>
        )}
        {nextPage && !hasError && <div>Your Order Did Successfully!</div>}
        {nextPage && hasError && <div>{errorMessage}</div>}
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
