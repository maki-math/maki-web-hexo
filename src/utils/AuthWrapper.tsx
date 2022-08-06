import { useIsLoggedIn, getPermissions } from './auth-token';
import React from 'react';

export const AuthWrapper = (props: {
  codename: string;
  children?: React.ReactNode;
}) => {
  const { isLoggedIn } = useIsLoggedIn();
  if (!isLoggedIn) return <></>;
  const permissions = getPermissions();
  const isOk = permissions.some(
    (permission) => permission.codename === props.codename
  );
  if (isOk && props.children) {
    return <>{props.children}</>;
  } else {
    return <></>;
  }
};
