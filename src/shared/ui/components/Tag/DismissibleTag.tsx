import { CircleX } from "lucide-solid"
import styles from './style.module.css';
import { Tag } from "./Tag"
import { JSXElement } from "solid-js";
const { buttonDismiss } = styles;

export type DismissibleTagProps = {
  children: JSXElement,
  onClose: () => void,
  disabled?: boolean
}

export const DismissibleTag = (props: DismissibleTagProps) => {
  const { onClose, disabled } = props
  const title = 'Удалить'
  return (<Tag {...props}>
    {props.children}
    <button
      class={buttonDismiss}
      type="button"
      onClick={onClose}
      disabled={disabled}
      aria-label={title}
      title={title}>
      <CircleX size={20} />
    </button>
    </Tag>)
}
