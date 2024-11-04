import { css } from 'lit';
export const buttonStyles = css`
  :host button {
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  :host span { 
    pointer-events: none;
  }
  :host .ripple {
    background-image: paint(ripple);

    --ripple-x: 0;
    --ripple-y: 0;
    --ripple-color: rgba(0, 182, 195, 0.744);
    --animation-tick: 0;
  }
  :host [aria-disabled] {
    opacity: 0.5;
  }
`;
