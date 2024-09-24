import ky from 'ky';

export const createHttpService = () => {
  const api = ky.create({ prefixUrl: '/api' });
  return api
}

export const httpService = createHttpService()
