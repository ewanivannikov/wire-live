import { root } from './style.module.css';
export const Popover = (props) => {
  return <div 
    class={root}
    {...props}
    classList={props.classList}
    popover
    id="my-popover"
  />;
}
