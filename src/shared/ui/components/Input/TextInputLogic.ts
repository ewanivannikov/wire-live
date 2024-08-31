class TextInputLogic {
  constructor(
    private readonly inputNode: HTMLInputElement,
    private readonly restrictCharacters: string
  ) {
    this.registerEvents();
  }

  registerEvents() {
    this.inputNode.addEventListener('input', this.checkInput.bind(this));
  }

  private checkInput() {
    if (this.restrictCharacters) {
      const regex = new RegExp(this.restrictCharacters, "g");
      const matches = this.inputNode.value.match(regex)?.join('');
      this.inputNode.value = matches || '';
    }
  }
}

export const createTextInputLogic = (
  input: HTMLInputElement,
  restrictCharacters
) => new TextInputLogic(input, restrictCharacters);
