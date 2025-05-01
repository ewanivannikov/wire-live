import { JSX, ParentComponent, splitProps } from 'solid-js';
import styles from './cardSquare.module.css';
import { Typography } from '../Typography';
import { LinkRouter } from '../LinkRouter';
const { card, title, image, box } = styles;

interface CardSquareProps {
  class?: string;
  imageSrc?: string;
  title?: string;
  actionsSlot?: JSX.Element;
  component?: 'h1' | 'h2';
  to: URL;
  classList?: object;
}

export const CardSquare: ParentComponent<CardSquareProps> = (props) => {
  const [{ component = 'h2' }] = splitProps(props, ['component']);
  return (
    <article classList={{[card]: true, ...props.classList}} >
      <div classList={{[box]: true}}>
        {props.title && (
        <Typography component={component} class={title}>
          <LinkRouter to={props.to}>{props.title}</LinkRouter>
        </Typography>
      )}

      <div class="card-content">{props.children}</div>

      {props.actionsSlot && <div class="card-actions">{props.actionsSlot}</div>}
      </div>

      {props.imageSrc && (
        <LinkRouter to={props.to} >
          <span class={image}>
            <picture class="">
              <source srcset={props.imageSrc} media="(min-width: 0px)" />
              <img
                aria-hidden="true"
                elementtiming="LCP-target"
                fetchpriority="high"
                loading="eager"
                src={props.imageSrc}
                style="--dls-liteimage-object-fit: cover;"
              />
            </picture>
          </span>
        </LinkRouter>
      )}
    </article>
  );
};
