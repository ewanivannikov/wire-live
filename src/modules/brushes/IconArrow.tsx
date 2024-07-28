import {
  icon,
  iconSourceBlock,
  iconArrowUp,
  iconArrowRight,
  iconArrowLeft,
  iconArrowDown,
  iconBlockerUp,
  iconBlockerRight,
  iconBlockerLeft,
  iconBlockerDown,
  iconDelayArrowUp,
  iconDelayArrowRight,
  iconDelayArrowLeft,
  iconDelayArrowDown,
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
export const IconBlockerUp = () => {
  return <div class={`${icon} ${iconBlockerUp}`} />;
};
export const IconBlockerDown = () => {
  return <div class={`${icon} ${iconBlockerDown}`} />;
};
export const IconBlockerRight = () => {
  return <div class={`${icon} ${iconBlockerRight}`} />;
};
export const IconBlockerLeft = () => {
  return <div class={`${icon} ${iconBlockerLeft}`} />;
};
export const IconDelayArrowUp = () => {
  return <div class={`${icon} ${iconDelayArrowUp}`} />;
};
export const IconDelayArrowDown = () => {
  return <div class={`${icon} ${iconDelayArrowDown}`} />;
};
export const IconDelayArrowRight = () => {
  return <div class={`${icon} ${iconDelayArrowRight}`} />;
};
export const IconDelayArrowLeft = () => {
  return <div class={`${icon} ${iconDelayArrowLeft}`} />;
};

export const iconsMapping = {
  'Brush.0.Up': IconArrowUp,
  'Brush.0.Down': IconArrowDown,
  'Brush.0.Right': IconArrowRight,
  'Brush.0.Left': IconArrowLeft,
  'Brush.1': IconSourceBlock,
  'Brush.2.Up': IconBlockerUp,
  'Brush.2.Down': IconBlockerDown,
  'Brush.2.Right': IconBlockerRight,
  'Brush.2.Left': IconBlockerLeft,
  'Brush.3.Up': IconDelayArrowUp,
  'Brush.3.Down': IconDelayArrowDown,
  'Brush.3.Right': IconDelayArrowRight,
  'Brush.3.Left': IconDelayArrowLeft,
} as const;
