import { Spin } from 'antd';
import React from 'react';
import { useRequest } from 'ahooks';

async function getUserInfo() {
  return {
    name: 'test',
  };
}

export function UserLoginIndicator() {
  const { data, error, loading } = useRequest(getUserInfo);
  const text = data?.name ?? '登录';
  return <div></div>;
  return <Spin spinning={loading}>{text}</Spin>;
}
