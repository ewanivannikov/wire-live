import { JSX, ParentComponent, splitProps } from 'solid-js';
import styles from './card.module.css';
import { Typography } from '../Typography';
const { card, title } = styles;

interface CardProps {
  class?: string;
  imageSrc?: string;
  title?: string;
  actionsSlot?: JSX.Element;
  component?: 'h1' | 'h2';
}

export const Card: ParentComponent<CardProps> = (props) => {
  const [{component = 'h2'}] = splitProps(props, ["component"]);
  return (
    <article class={`${card} ${props.class || ''}`}>
      {props.imageSrc && (
        <a href={props.href} class="card-image">
          <picture class="">
            <source srcset={props.imageSrc} media="(min-width: 0px)" />
            <img aria-hidden="true" elementtiming="LCP-target" fetchpriority="high" loading="eager" src={props.imageSrc} style="--dls-liteimage-object-fit: cover;"/>
          </picture>
        </a>
      )}
      
      {props.title && (
        <Typography component={component} class={title}>
          <a href={props.href}>{props.title}</a>
        </Typography>
      )}
      
      <div class="card-content">
        {props.children}
      </div>

      {props.actionsSlot && (
        <div class="card-actions">
          {props.actionsSlot}
        </div>
      )}
    </article>
  );
};
