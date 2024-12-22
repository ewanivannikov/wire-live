import ky from 'ky';

const basename = window?.__ENV__?.RELEASE_STAGE === 'production' ? '/wire-live/' : '/';

export const createHttpService = () => {
  const api = ky.create({
    prefixUrl: `http://127.0.0.1:3000${basename}api`,
  });
  return api
}

export const httpService = createHttpService()
