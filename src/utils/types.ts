export const isNotNil = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;
