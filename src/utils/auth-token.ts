import { useLocalStorageState, useRequest } from 'ahooks';
import constate from 'constate';
import { api } from './api';
import { PermissionModel } from '@/generated-api/Api';

const StorageKeyStore = {
  Token: 'token',
  Permissions: 'permissions',
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
  const { loading, isLoggedIn } = useIsLoggedIn();
  // TODO handle module key here
  return isLoggedIn;
};

function usePermissionsStorage() {
  const [storedPermissions, setStoredPermissions] = useLocalStorageState<
    string | undefined
  >(StorageKeyStore.Permissions, {
    defaultValue: '',
  });
  return {
    permissions: storedPermissions,
    setPermissions: setStoredPermissions,
  };
}

export const [PermissionsProvider, usePermissionsContext] = constate(usePermissionsStorage);

export function getPermissions(): PermissionModel[] {
  try {
    return JSON.parse(localStorage.getItem(StorageKeyStore.Permissions) ?? "'[]'");
  } catch (e) {
    return [];
  }
}

export const fetchPermissions = () => {
  api.userPermissions.userPermissionsList().then((res) => {
    setPermissions(res.data.groups[0].permissions);
  }).catch(err => {
    setPermissions("'[]'");
  })
}

export const AuthWrapper = (props) => {
  const { isLoggedIn } = useIsLoggedIn();
  if (!isLoggedIn) return false;
  const permissions = getPermissions();
  const permission = permissions.filter( permission => permission.codename === props.codename);
  if (props.children) {
    return permission.length === 1 && props.children;
  } else {
    return permission.length === 1;
  }
}
