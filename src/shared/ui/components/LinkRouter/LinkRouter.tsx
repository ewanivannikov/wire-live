import { JSXElement } from 'solid-js';
import { routerService } from '../../../services/RouterService';

export type LinkRouterProps = {
  children: JSXElement;
  to: URL
};

export const LinkRouter = (props: LinkRouterProps) => (
  <a href={`${routerService.createHref(props.to)}`} classList={props.classList}>{props.children}</a>
);
