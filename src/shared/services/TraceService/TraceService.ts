import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { trace } from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
/**
 * https://opentelemetry.io/docs/specs/semconv/attributes-registry/http/
    @example 
    const span = traceService.tracer.startSpan('http-request', {
      attributes: {
        'http.method': 'PUT',
        'http.route': '/Packages/:packageID/Sign',
      },
    });
 */
export class TraceService {
  private provider;
  constructor() {
    this.provider = new WebTracerProvider({
      resource: new Resource({
        'service.name': 'wire-live',
      }),
      spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
    });
    this.provider.register();
    trace.setGlobalTracerProvider(this.provider);
  }
  public get tracer() {
    return trace.getTracer('default');
  }
}
export const traceService = new TraceService();
