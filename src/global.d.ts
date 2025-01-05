declare module '*.module.css';
declare const self: ServiceWorkerGlobalScope;

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
