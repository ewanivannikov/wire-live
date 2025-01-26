import { SpanStatusCode } from '@opentelemetry/api';
import { httpService } from '../../../shared';
import { traceService } from '../../../shared/services/TraceService';

const messages = { MissingOrMalformedSID: 'SID отсутствует или повреждён' };

export const userNetworkSources = {
  async getUser() {
    const span = traceService.tracer.startSpan('http-request', {
      attributes: {
        'http.method': 'GET',
        'http.route': 'user',
      },
    });
    try {
      const result = await httpService.get('user').json();
      return result;
    } catch (error) {
      if (error.name === 'HTTPError') {
        const errorText = await error.response.text();
        const customError = new AggregateError([error], messages[errorText]);

        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR, message: errorText })
        throw customError;
      }
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) })
      throw error;
    } finally {
      span.end();
    }
  },

  async logOut() {
    const result = await httpService.post('logout/google').json();

    return result;
  },

  async logIn() {
    console.log('auth');
    try {
      await httpService.get('auth/google').json();

      return true;
    } catch (error) {
      return error;
    }
  },
};
