const StorageKeyStore = {
  Token: 'token',
};

export function setToken(token: string) {
  localStorage.setItem(StorageKeyStore.Token, token);
}

export function getToken(): string {
  return localStorage.getItem(StorageKeyStore.Token) ?? '';
}
