import styles from './style.module.css';
const { display } = styles;
export const Typography = (props) => {
  const { children } = props;
  return <h1 class={display}>{children}</h1>;
};
