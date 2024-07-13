import {
  icon,
  iconArrowUp,
  iconSourceBlock,
  iconArrowRight,
  iconArrowLeft,
  iconArrowDown,
} from './style.module.css';
export const IconArrowUp = () => {
  return <div class={`${icon} ${iconArrowUp}`} />;
};
export const IconArrowDown = () => {
  return <div class={`${icon} ${iconArrowDown}`} />;
};
export const IconArrowRight = () => {
  return <div class={`${icon} ${iconArrowRight}`} />;
};
export const IconArrowLeft = () => {
  return <div class={`${icon} ${iconArrowLeft}`} />;
};
export const IconSourceBlock = () => {
  return <div class={`${icon} ${iconSourceBlock}`} />;
};
