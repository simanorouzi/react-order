import * as React from 'react';
import { FrameType } from '../Component/Types';

const Frame = (props: FrameType) => {
  return <div className={`frame ${props.style ?? ''}`}>{props.children}</div>;
};

export default Frame;
