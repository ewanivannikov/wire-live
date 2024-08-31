import { createEffect } from 'solid-js';
import styles from './style.module.css';
import { createTextInputLogic } from './TextInputLogic';
const { root } = styles;

export const Input = (props) => {
  const {restrictCharacters} = props;
  let input!: HTMLInputElement;
  createEffect(() => {
    createTextInputLogic(input, restrictCharacters);
  }, null);
  
  return <input 
  type="text" 
  role="textbox"
  ref={input}
  class={root} {...props}
  />;
}
