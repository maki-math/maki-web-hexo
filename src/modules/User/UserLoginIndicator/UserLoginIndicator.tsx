import { api } from '@/utils/api';
import { getToken, setToken } from '@/utils/auth-token';
import { useRequest } from 'ahooks';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { UserLoginModal } from './UserLoginModal';
import { UserRegisterModal } from './UserRegisterModal';

const logoutRequest = () => {
  return api.auth.authLogoutCreate({}).then(() => {
    setToken('');
  });
};

export function UserLoginIndicator() {
  const { data, loading: detailLoading, error } = useRequest(
    api.auth.authUserRetrieve,
    {
      refreshDeps: [getToken()],
    }
  );
  const { run: logout, loading: logoutLoading } = useRequest(logoutRequest, {
    manual: true,
  });

  const isLoggedIn = Boolean(data?.data) && !error;
  const username = data?.data?.username;

  const loading = detailLoading || logoutLoading;

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgottenPasswordModalVisible, setIsForgottenPasswordModalVisible] = useState(false);

  const handleClickLogin = useCallback(() => {
    setIsLoginModalVisible(true);
  }, [setIsLoginModalVisible]);

  const handleClickLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      {isLoggedIn ? (
        <Button onClick={handleClickLogout} loading={loading}>
          退出：{username}
        </Button>
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
