import StatusHTTP from './StatusHTTP';

export type Service<T> = {
  status: keyof typeof StatusHTTP;
  data: T | T[];
};
