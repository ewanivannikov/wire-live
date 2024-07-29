import { root } from './style.module.css';
/**
 * @link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/
 */
export const Listbox = (props) => {
  return <ul
    aria-activedescendant="required"
    {...props}
    class={root}
    classList={props.classList}
    role="listbox"
    tabindex="0"
  />;
};
