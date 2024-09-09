import styles from './textInput.module.css';
import { Input } from "../Input";
const { root, input } = styles;


export type TextInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  size?: number;
  restrictCharacters?: string;
};
export const TextInput = (props: TextInputProps) => {
  const {
    size = 7,
    restrictCharacters,
    classList
  } = props;
  let rootNode!: HTMLSpanElement;
  let inputNode!: HTMLInputElement;


  return (
    <span ref={rootNode} class={root}>
      <Input 
        size={size} 
        classList={{[input]: true, ...classList}} 
        ref={inputNode} 
        restrictCharacters={restrictCharacters} 
        {...props}
      />
    </span>
  );
};
