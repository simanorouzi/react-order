import * as React from 'react';
import { method, UseHttpType } from '../Component/Types';

const UseHttpHook = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  let response;
  let data;

  const doFetch = async (props: UseHttpType) => {
    try {
      setIsLoading(true);

      if (props.request.methodType == method.Get) {
        response = await fetch(props.url);
      } else {
        const body = props.request.body;
        response = await fetch(props.url, {
          method: 'POST',
          headers: props.request.headers,
          body: body,
        });
      }
      if (!response.ok) {
        throw new Error('Something went Wrong!');
      }

      data = await response.json();

      props.applyFunction(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return {
    doFetch,
    isLoading,
    error,
  };
};

export default UseHttpHook;
