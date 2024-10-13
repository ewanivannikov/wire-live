import { LitElement } from 'lit-element';
import { literal, html } from 'lit/static-html.js';
import { buttonStyles } from './button-styles.js';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('button-wl')
export class ButtonElement extends LitElement {
  static styles = [
    buttonStyles,
  ];

  static get properties() {
    return {
      type: { type: String, reflect: true, defaultValue: 'button' },
      onClick: { type: Function },
      _position: { state: true },
      _tick: { state: true },
    };
  }

  tag = literal`button`

  constructor() {
    super();
    this.type = 'button';
    this.onClick = () => { };
    this._position = { x: 0, y: 0 };
    this._tick = 0;
  }

  render() {
    const {
      type,
    } = this;

    const styles = {
      '--ripple-x': this._position.x,
      '--ripple-y': this._position.y,
      '--animation-tick': this._tick,
    };

    return html`
      <${this.tag}
      type="${type}"
      style=${styleMap(styles)}
      @click=${this.handleClick}
      ><span><slot>Кнопка</slot></span></${this.tag}>
    `;
  }

  handleClick = (e) => {
    this.ripple(e)
    this.onClick(e)
  }

  ripple = (e) => {
    e.target.classList.add("ripple");

    this._position = { x: e.offsetX, y: e.offsetY };
    const start = performance.now();
    const self = this;
    requestAnimationFrame(function raf(now) {
      const count = Math.floor(now - start);
      self._tick = count;
      if (count > 1000) {
        e.target.classList.remove("ripple");
        self._tick = 0;
        return;
      }
      requestAnimationFrame(raf);
    });
  }
}
