class DrawerLogic {
  constructor(
    private readonly drawerNode: HTMLElement,
    private readonly togglerNode: HTMLButtonElement,
    private readonly props
  ) {
    if (props.open) {
      drawerNode.showPopover();
    }
    this.registerEvents();
  }

  public close() {
    this.drawerNode.hidePopover();
  }

  private handleClick = (element: HTMLButtonElement) => {
    this.drawerNode.togglePopover();
  }

  private registerEvents() {
    this.togglerNode.addEventListener('click', this.handleClick.bind(this));
  }
}

export const createDrawerLogic = (element: HTMLElement, toggle: HTMLButtonElement, onClick) => {
  return new DrawerLogic(element, toggle, onClick);
};
