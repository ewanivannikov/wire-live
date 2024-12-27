import { createEffect } from 'solid-js';
import styles from './input.module.css';
import { createTextInputLogic } from './TextInputLogic';
const { root } = styles;

export const Input = (props) => {
  const { restrictCharacters, classList } = props;
  let input!: HTMLInputElement;
  createEffect(() => {
    createTextInputLogic(input, restrictCharacters);
  }, null);

  return (
    <input
      type="text"
      role="textbox"
      ref={input}
      {...props}
      classList={{ ...classList, [root]: true }}
    />
  );
};
