import * as React from 'react';
import Input from '../UI/Input';

const Checkout = () => {
  return (
    <form>
      <Input
        lableName="Name:"
        input={{ type: 'text', name: 'name', value: '' }}
      />
      <Input
        lableName="City:"
        input={{ type: 'text', name: 'city', value: '' }}
      />
      <Input
        lableName="PostalCode:"
        input={{ type: 'text', name: 'postalCode', value: '' }}
      />
      <Input
        lableName="Street:"
        input={{ type: 'text', name: 'street', value: '' }}
      />
    </form>
  );
};

export default Checkout;
