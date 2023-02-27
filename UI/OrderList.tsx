import * as React from 'react';
import FoodFinder from '../Component/FoodFinder';
import Frame from '../Component/Frame';
import OrderItem from '../Component/OrderItem';
import { FoodType, method, UseHttpType } from '../Component/Types';
import UseHttpHook from '../Hook/useHttpHook';
import Styles from '../UI/OrderList.module.css';

const OrderList = () => {
  const [foodList, setFoodList] = React.useState<FoodType[]>([]);
  const [orgList, setOrgList] = React.useState<FoodType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const applyFunction = (data) => {
    const foods = Object.entries(data).map(([key, value]) => {
      return {
        id: key,
        description: value.description,
        price: value.price,
        title: value.title,
      };
    });
    setOrgList(foods);
    setFoodList(foods);
  };
  const fetchParams: UseHttpType = {
    url: 'https://foodorder-35902-default-rtdb.europe-west1.firebasedatabase.app/Foods.json',
    request: { methodType: method.Get },
    applyFunction: applyFunction,
  };
  const { error, isLoading, doFetch } = UseHttpHook();
  React.useEffect(() => {
    setTimeout(() => {
      doFetch(fetchParams);
    }, 2000);
  }, []);

  React.useEffect(() => {
    setFoodList(
      orgList.filter((food) =>
        food.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);
  const FilterHandler = (keyword: string) => {
    setSearchTerm(keyword);
  };
  return (
    <Frame style="frame-order">
      <FoodFinder onFilter={FilterHandler} />
      {isLoading && <div className="loading">Data Is Loading</div>}
      {error && <div className="loading">{error}</div>}
      <ul className={Styles['order-list']}>
        {foodList &&
          foodList.map((food) => (
            <OrderItem
              key={food.id}
              id={food.id}
              title={food.title}
              description={food.description}
              price={food.price}
            />
          ))}
      </ul>
    </Frame>
  );
};

export default OrderList;
