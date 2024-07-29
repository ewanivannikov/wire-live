import { root } from './style.module.css';

export const SegmentedControl = (props) => { 
  return <div
    aria-orientation="vertical"
    class={root}
    {...props}
    classList={props.classList}
    role="radiogroup"
  />;
}
