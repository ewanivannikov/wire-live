declare module '*.module.css';
declare const self: ServiceWorkerGlobalScope;

declare module '*.png' {
  const value: string;
  export default value;
}
