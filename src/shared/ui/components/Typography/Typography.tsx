import { display } from './style.module.css';
export const Typography = (props) => {
  const {children} = props
  return (
    <h1 class={display}>{children}</h1>
  );
}
