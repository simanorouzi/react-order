import * as React from 'react';
import FoodFinder from '../Component/FoodFinder';
import Frame from '../Component/Frame';
import OrderItem from '../Component/OrderItem';
import { FoodType, method, UseHttpType } from '../Component/Types';
import UseHttpHook from '../Hook/useHttpHook';
import Styles from '../UI/OrderList.module.css';

// const values = [
//   { id: 1, title: 'Kebab', price: 30, description: 'finest food' },
//   { id: 2, title: 'Suchi', price: 30, description: 'finest food' },
//   { id: 3, title: 'Kitchen', price: 30, description: 'finest food' },
//   { id: 4, title: 'Doner', price: 30, description: 'finest food' },
//   { id: 5, title: 'Pizza', price: 30, description: 'finest food' },
//   { id: 6, title: 'Burgur', price: 30, description: 'finest food' },
//   { id: 7, title: 'Bif Sandwich', price: 30, description: 'finest food' },
// ];

const OrderList = () => {
  const [foodList, setFoodList] = React.useState<FoodType[]>([]);
  const [orgList, setOrgList] = React.useState<FoodType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const applyFunction = (data) => {
    const foods = Object.values(data);
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
    doFetch(fetchParams);
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
  console.log(foodList);
  return (
    <Frame style="frame-order">
      <FoodFinder onFilter={FilterHandler} />
      <ul className={Styles['order-list']}>
        {foodList &&
          foodList.map((food) => (
            <OrderItem
              key={food.key}
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
