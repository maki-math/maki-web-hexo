import { useLocalStorageState } from 'ahooks';

const StorageKeyStore = {
  Token: 'token',
};

export function useTokenStorage() {
  const [token, setToken] = useLocalStorageState<string | undefined>(
    StorageKeyStore.Token,
    {
      defaultValue: '',
    }
  );
  return { token, setToken };
}

export const useIsLoggedIn = () => {
  const { token } = useTokenStorage();
  return { isLoggedIn: !!token };
};

export function getToken(): string {
  try {
    return JSON.parse(localStorage.getItem(StorageKeyStore.Token) ?? "''");
  } catch (e) {
    return '';
  }
}
