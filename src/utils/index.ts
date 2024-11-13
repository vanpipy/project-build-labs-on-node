/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */

export const waitTime = (time = 100) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

export const queryCurrentEnv = () => (process.env.NODE_ENV === 'development' ? 'test' : 'prod');

const requestCaches = new Map<string, Promise<any>>();

export const memorizeRequestController =
  <T>(creator: () => Promise<T>, key: string) =>
  async () => {
    let promise = requestCaches.get(key);
    if (!promise) {
      promise = creator();
      requestCaches.set(key, promise);
    }
    return (await promise) as T;
  };
