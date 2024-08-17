import styles from './style.module.css';
const { option } = styles;
export const Option = (props) => {
  const { classList, ...rest } = props;
  return <li role="option" {...rest} class={option} classList={classList} />;
};
