import { createEffect, createSignal } from 'solid-js';
import { createListboxLogic } from './ListboxLogic';
import { root } from './style.module.css';
/**
 * @link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/
 */
export const Listbox = (props) => {
  const {onFocusChange, onItemChange} = props;
  let element!: HTMLElement;

  createEffect(() => {
    createListboxLogic(element, onFocusChange, onItemChange);
    return element
  }, null);
  
  return <ul
    aria-activedescendant="required"
    {...props}
    class={root}
    classList={props.classList}
    role="listbox"
    tabindex="0"
    ref={element}
  />;
};
