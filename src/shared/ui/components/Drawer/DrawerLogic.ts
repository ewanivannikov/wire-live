class DrawerLogic {
  constructor(
    private readonly drawerNode: HTMLElement,
    private readonly props,
  ) {
    if (props.open) {
      drawerNode.showPopover();
    }
  }

  public close() {
    this.drawerNode.hidePopover();
  }
}

export const createDrawerLogic = (element: HTMLElement, props) => {
  return new DrawerLogic(element, props);
};
