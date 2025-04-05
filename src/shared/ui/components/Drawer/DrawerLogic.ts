class DrawerLogic {
  constructor(
    private readonly drawerNode: HTMLElement,
    private readonly togglerNode: HTMLButtonElement,
    private readonly props: {open: boolean}
  ) {
    if (this.props.open) {
      drawerNode.showPopover();
      this.togglerNode.setAttribute("aria-pressed", true);
    }
    this.registerEvents();
  }

  public close() {
    this.drawerNode.hidePopover();
  }

  private handleClick = (event: MouseEvent) => {
    const ariapressed = event.target.getAttribute("aria-pressed");
    this.drawerNode.togglePopover();

    if(ariapressed){
      this.togglerNode.removeAttribute("aria-pressed")
    }else{
      this.togglerNode.setAttribute("aria-pressed", true)
    }
  }

  private registerEvents() {
    this.togglerNode.addEventListener('click', this.handleClick);
  }
}

export const createDrawerLogic = (element: HTMLElement, toggle: HTMLButtonElement, props) => {
  return new DrawerLogic(element, toggle, props);
};
