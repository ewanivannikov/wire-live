import ky from 'ky';

const basename = window?.__ENV__?.RELEASE_STAGE === 'production' ? '/wire-live/' : '/';

export class DataError<AdditionalInfo = Record<string, unknown>> extends Error {
  errors: DataErrorsItem<AdditionalInfo>[];

  message: string;

  code?: string;

  status?: number;

  description?: string;

  constructor(error: DataErrorProps<AdditionalInfo>) {
    super(error.message);
    this.errors = error.errors;
    this.message = error.statusText;
    this.code = error.status;
    this.status = error.statusText;
    this.description = error.description;
  }
}

export const createHttpService = () => {
  const api = ky.create({
    prefixUrl: `${basename}api`,
    hooks: {
      afterResponse: [
        async (_input, _options, response) => {
          if (!response.ok) {
            const error = new DataError(response)
            console.log('error', error);
            return error;
          }
          const body = await response.json();

          if (body.error) {
            console.error(body.error.message);
            throw new Error(body.error.message);
          }
        },
      ],
    },
  });
  return api
}

export const httpService = createHttpService()
