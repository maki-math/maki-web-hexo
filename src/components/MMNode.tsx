import React from 'react';

export interface MMNodeModel {
  nextList: MMNodeModel[];
  content: string;
  parent: MMNodeModel | null;
}

export const MMNode: React.FC<MMNodeModel> = (props) => {
  return <div>{props.content}</div>;
};
