import { Input } from "../Input";


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
  } = props;
  let rootNode!: HTMLSpanElement;
  let input!: HTMLInputElement;


  return (
    <span ref={rootNode}>
      <Input size={size} ref={input} restrictCharacters={restrictCharacters} />
    </span>
  );
};
