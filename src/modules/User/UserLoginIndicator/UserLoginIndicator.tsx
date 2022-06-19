import { api } from '@/utils/api';
import { getToken, useIsLoggedIn, useTokenContext } from '@/utils/auth-token';
import { DownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import { UserLoginModal } from './UserLoginModal';
import { UserRegisterModal } from './UserRegisterModal';

function useLogoutAction() {
  const { token, setToken } = useTokenContext();
  const logoutRequest = useCallback(() => {
    return api.auth.authLogoutCreate({}).then(() => {
      setToken('');
      message.success('登出成功');
    });
  }, [token, setToken]);
  const { run: logout, loading } = useRequest(logoutRequest, {
    manual: true,
  });
  return { logout, loading };
}

export function UserLoginIndicator() {
  const { payload: data, loading: detailLoading, isLoggedIn } = useIsLoggedIn();

  const username = data?.data?.username;

  const { logout, loading: logoutLoading } = useLogoutAction();

  const loading = detailLoading || logoutLoading;

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [
    isForgottenPasswordModalVisible,
    setIsForgottenPasswordModalVisible,
  ] = useState(false);

  const handleClickLogin = useCallback(() => {
    setIsLoginModalVisible(true);
  }, [setIsLoginModalVisible]);

  const handleClickLogout = useCallback(() => {
    logout();
  }, [logout]);

  const menu = (
    <Menu>
      <Menu.Item danger onClick={handleClickLogout}>
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isLoggedIn ? (
        <Dropdown overlay={menu} arrow>
          <Space>
            {username}
            <DownOutlined />
          </Space>
        </Dropdown>
      ) : (
        <Button
          type="primary"
          ghost
          onClick={handleClickLogin}
          loading={loading}
        >
          登录
        </Button>
      )}
      <UserLoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onRegister={() => {
          setIsLoginModalVisible(false);
          setIsRegisterModalVisible(true);
        }}
        onForgottenPassword={() => {
          setIsLoginModalVisible(false);
          setIsForgottenPasswordModalVisible(true);
        }}
      ></UserLoginModal>
      <UserRegisterModal
        visible={isRegisterModalVisible}
        onClose={() => setIsRegisterModalVisible(false)}
        onLogin={() => {
          setIsLoginModalVisible(true);
          setIsRegisterModalVisible(false);
        }}
      ></UserRegisterModal>
    </>
  );
}
