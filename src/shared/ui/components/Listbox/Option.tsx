import { option } from './style.module.css';
export const Option = (props) => {
  const {classList, ...rest} = props;
  return <li
    role="option"
    {...rest}
    class={option}
    classList={classList}
  />;
}
