import { api } from '@/utils/api';
import { getToken, useTokenStorage } from '@/utils/auth-token';
import { DownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import { UserLoginModal } from './UserLoginModal';
import { UserRegisterModal } from './UserRegisterModal';

export function UserLoginIndicator() {
  const { setToken } = useTokenStorage();
  const logoutRequest = () => {
    return api.auth.authLogoutCreate({}).then(() => {
      setToken('');
    });
  };

  const verifyLogIn = async () => {
    const token = getToken();
    if (!token) {
      return undefined;
    }
    return api.auth.authUserRetrieve().catch((err) => {
      setToken('');
    });
  };
  const { data, loading: detailLoading, error } = useRequest(verifyLogIn, {
    refreshDeps: [getToken()],
  });
  const { run: logout, loading: logoutLoading } = useRequest(logoutRequest, {
    manual: true,
  });

  const isLoggedIn = Boolean(data?.data) && !error;
  const username = data?.data?.username;

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
