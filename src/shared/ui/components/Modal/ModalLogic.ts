class ModalLogic {
  constructor(
    private readonly modalNode: HTMLDialogElement,
    private readonly props
  ) {
    if (props.open) {
      modalNode.showModal()
    }
  }
}

export const createModalLogic = (element: HTMLDialogElement, props) => {
  return new ModalLogic(element, props);
}
