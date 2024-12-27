import { Button } from '../Button';
import styles from './style.module.css';
const { target } = styles;
export const Target = (props) => {
  return (
    <Button
      style={{ 'anchor-name': `--${props.popovertarget}` }}
      {...props}
      classList={{ [target]: true, ...props.classList }}
    >
      {props.children}
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        class="octicon octicon-triangle-down"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="currentColor"
        style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible; margin: auto;"
      >
        <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
      </svg>
    </Button>
  );
};
