import { useLocalStorageState, useRequest } from 'ahooks';
import constate from 'constate';
import { api } from './api';

const StorageKeyStore = {
  Token: 'token',
};

function useTokenStorage() {
  const [storedToken, setStoredToken] = useLocalStorageState<
    string | undefined
  >(StorageKeyStore.Token, {
    defaultValue: '',
  });
  return {
    token: storedToken,
    setToken: setStoredToken,
  };
}

export const [TokenProvider, useTokenContext] = constate(useTokenStorage);

export const useIsLoggedIn = () => {
  const { token, setToken } = useTokenContext();
  const verifyLogIn = async () => {
    const token = getToken();
    if (!token) {
      return undefined;
    }
    return api.auth.authUserRetrieve().catch((err) => {
      setToken('');
    });
  };

  const { data, loading, error } = useRequest(verifyLogIn, {
    refreshDeps: [token],
  });

  const isLoggedIn = !!token && Boolean(data?.data) && !error;
  return { loading, payload: data, isLoggedIn };
};

export function getToken(): string {
  try {
    return JSON.parse(localStorage.getItem(StorageKeyStore.Token) ?? "''");
  } catch (e) {
    return '';
  }
}

export enum AuthModuleEnum {
  QuestionPage = 'question_page',
}

export const useAuth = (key: AuthModuleEnum) => {
  const { isLoggedIn } = useIsLoggedIn();
  // TODO handle module key here
  return isLoggedIn;
};
