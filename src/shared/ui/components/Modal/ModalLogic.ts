class ModalLogic {
  constructor(
    private readonly modalNode: HTMLDialogElement,
    private readonly props,
  ) {
    if (props.open) {
      modalNode.showModal();
    }
  }

  public close() {
    this.modalNode.close();
  }
}

export const createModalLogic = (element: HTMLDialogElement, props) => {
  return new ModalLogic(element, props);
};
