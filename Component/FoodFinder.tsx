import * as React from 'react';
import { FoodFinderType } from '../Component/Types';
import Button from '../UI/Button';
import Input from '../UI/Input';

const FoodFinder = (props: FoodFinderType) => {
  const ChangeHandler = (event) => {
    props.onFilter(event.target.value);
  };
  return (
    <React.Fragment>
      <Input
        lableName="Search:"
        input={{ name: 'SearchFood', onChange: ChangeHandler }}
      />
    </React.Fragment>
  );
};

export default FoodFinder;
