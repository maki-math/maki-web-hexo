import { PermissionModel } from '@/generated-api/Api';
import { useLocalStorageState, useRequest } from 'ahooks';
import constate from 'constate';
import { api } from './api';

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

function jumpToHomePage() {
  window.location.href = '/';
}

export const useIsLoggedIn = () => {
  const { token, setToken } = useTokenContext();
  const verifyLogIn = async () => {
    const token = getToken();
    if (!token) {
      return undefined;
    }
    return api.auth.authUserRetrieve().catch((_err: unknown) => {
      setToken('');
      jumpToHomePage();
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

export const useAuth = (_key: AuthModuleEnum) => {
  const { isLoggedIn } = useIsLoggedIn();
  // TODO handle module key here
  return isLoggedIn;
};

function usePermissionsStorage() {
  const [storedPermissions, setStoredPermissions] = useLocalStorageState<
    PermissionModel[] | undefined
  >(StorageKeyStore.Permissions, {
    defaultValue: [],
  });
  return {
    permissions: storedPermissions,
    setPermissions: setStoredPermissions,
  };
}

export const [PermissionsProvider, usePermissionsContext] = constate(
  usePermissionsStorage
);

export function getPermissions(): PermissionModel[] {
  try {
    return JSON.parse(
      localStorage.getItem(StorageKeyStore.Permissions) ?? "'[]'"
    );
  } catch (e) {
    return [];
  }
}

export const fetchPermissions = (
  setPermissions: (s: PermissionModel[]) => void
) => {
  api.userPermissions
    .userPermissionsList()
    .then((res): PermissionModel[] => {
      return res.data.groups[0].permissions;
    })
    .catch((_err: unknown) => {
      return [] as PermissionModel[];
    })
    .then((permissions) => {
      setPermissions(permissions);
    });
};
