import { option } from './style.module.css';
export const Option = (props) => {
  const {classList, ...rest} = props;
  return <li
    role="option"
    tabindex="0"
    aria-selected="false"
    {...rest}
    class={option}
    classList={classList}
  />;
}
