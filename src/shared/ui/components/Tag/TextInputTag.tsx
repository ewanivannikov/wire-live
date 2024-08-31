import { Plus } from 'lucide-solid';
import styles from './textInputTag.module.css';
import { ButtonBase } from '../Button';
import { Input } from '../Input';
import { createEffect } from 'solid-js';
import { createTextInputTagLogic } from './TextInputTagLogic';
const { root } = styles;

export type TextInputTagProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  size?: number;
  restrictCharacters?: string;
};

export const TextInputTag = (props: TextInputTagProps) => {
  const {
    onChange,
    placeholder = 'New Tag',
    size = 5,
    restrictCharacters,
  } = props;
  let rootNode!: HTMLSpanElement;
  let input!: HTMLInputElement;
  let button!: HTMLButtonElement;

  createEffect(() => {
    createTextInputTagLogic(
      rootNode,
      input,
      button,
      styles,
      placeholder,
      onChange,
    );
  }, null);

  return (
    <span class={root} ref={rootNode}>
      <ButtonBase ref={button}>
        <Plus size={20} />
      </ButtonBase>
      <Input size={size} ref={input} restrictCharacters={restrictCharacters} />
    </span>
  );
};
