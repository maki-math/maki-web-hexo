import React from 'react';
import { MMNode, MMNodeModel } from './MMNode';

export interface MMModel {
  root: MMNodeModel | null;
}

export const MM: React.FC<MMModel> = (props) => {
  const rootNodeProps: MMNodeModel = props.root ?? {
    content: '',
    nextList: [],
    parent: null,
  };
  return <MMNode {...rootNodeProps}></MMNode>;
};
