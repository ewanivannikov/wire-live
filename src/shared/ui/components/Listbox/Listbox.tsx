import { createEffect } from 'solid-js';
import { createListboxLogic } from './ListboxLogic';
import styles from './style.module.css';
/**
 * @link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/
 */
export const Listbox = (props) => {
  const { onFocusChange, onItemChange } = props;
  let element!: HTMLElement;

  createEffect(() => {
    createListboxLogic(element, styles, onFocusChange, onItemChange);
    return element;
  }, null);

  return (
    <ul
      aria-activedescendant="required"
      {...props}
      class={styles.root}
      classList={props.classList}
      role="listbox"
      tabindex="0"
      ref={element}
    />
  );
};
