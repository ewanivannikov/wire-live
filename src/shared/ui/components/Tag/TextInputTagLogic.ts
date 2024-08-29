class TextInputTagLogic {
  private handleChange!: (e: Event) => void;
  constructor(
    private readonly rootNode: HTMLSpanElement,
    private readonly inputNode: HTMLInputElement,
    private readonly buttonNode: HTMLButtonElement,
    private readonly styles,
    private readonly placeholder = 'New Tag',
    onChange = function () { },
  ) {
    this.inputNode.placeholder = placeholder;
    this.handleChange = onChange;
    this.registerEvents();
  }

  registerEvents() {
    this.buttonNode.addEventListener('click', this.checkClick.bind(this));
    this.inputNode.addEventListener('focus', this.checkInputFocus.bind(this));
    this.inputNode.addEventListener('blur', this.checkInputBlur.bind(this));
  }

  private checkClick() {
    this.handleChange(this.inputNode.value);
    this.inputNode.value = '';
    this.inputNode.focus();
  }

  private checkInputFocus() {
    this.rootNode.classList.add(this.styles?.focus);
    this.inputNode.placeholder = ''
  }

  private checkInputBlur() {
    this.rootNode.classList.remove(this.styles?.focus);
    this.inputNode.placeholder = this.placeholder
  }
}

export const createTextInputTagLogic = (
  rootNode: HTMLSpanElement,
  input: HTMLInputElement,
  button: HTMLButtonElement,
  styles,
  placeholder,
  onChange: (value: string) => void,
) => new TextInputTagLogic(rootNode, input, button, styles, placeholder, onChange);
