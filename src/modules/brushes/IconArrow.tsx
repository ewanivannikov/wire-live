import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-solid';
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
  iconSignalDetectorUp,
  iconSignalDetectorRight,
  iconSignalDetectorLeft,
  iconSignalDetectorDown,
  iconOppositeArrowUp,
  iconOppositeArrowRight,
  iconOppositeArrowLeft,
  iconOppositeArrowDown,
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
export const IconSignalDetectorUp = () => {
  return <div class={`${icon} ${iconSignalDetectorUp}`} />;
};
export const IconSignalDetectorDown = () => {
  return <div class={`${icon} ${iconSignalDetectorDown}`} />;
};
export const IconSignalDetectorRight = () => {
  return <div class={`${icon} ${iconSignalDetectorRight}`} />;
};
export const IconSignalDetectorLeft = () => {
  return <div class={`${icon} ${iconSignalDetectorLeft}`} />;
};
export const IconOppositeArrowUp = () => {
  return <div class={`${icon} ${iconOppositeArrowUp}`} />;
};
export const IconOppositeArrowDown = () => {
  return <div class={`${icon} ${iconOppositeArrowDown}`} />;
};
export const IconOppositeArrowRight = () => {
  return <div class={`${icon} ${iconOppositeArrowRight}`} />;
};
export const IconOppositeArrowLeft = () => {
  return <div class={`${icon} ${iconOppositeArrowLeft}`} />;
};
export const IconOrthogonalArrowUpNotFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowUpNotFlip}`} />;
};
export const IconOrthogonalArrowDownNotFlip = () => { 
  return <div class={`${icon} ${iconOrthogonalArrowDownNotFlip}`} />; 
};
export const IconOrthogonalArrowRightNotFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowRightNotFlip}`} />;
};
export const IconOrthogonalArrowLeftNotFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowLeftNotFlip}`} />;
};
export const IconOrthogonalArrowUpFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowUpFlip}`} />;
};
export const IconOrthogonalArrowDownFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowDownFlip}`} />;
};
export const IconOrthogonalArrowRightFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowRightFlip}`} />;
};
export const IconOrthogonalArrowLeftFlip = () => {
  return <div class={`${icon} ${iconOrthogonalArrowLeftFlip}`} />;
};
export const IconTrioArrowUp = () => {
  return <div class={`${icon} ${iconTrioArrowUp}`} />;
};
export const IconTrioArrowDown = () => {
  return <div class={`${icon} ${iconTrioArrowDown}`} />; 
};
export const IconTrioArrowRight = () => {
  return <div class={`${icon} ${iconTrioArrowRight}`} />;
};
export const IconTrioArrowLeft = () => {
  return <div class={`${icon} ${iconTrioArrowLeft}`} />;
};
export const IconPulseGenerator = () => {
  return <div class={`${icon} ${iconPulseGenerator}`} />;
};
export const IconThroughArrowUp = () => {
  return <div class={`${icon} ${iconThroughArrowUp}`} />;
};
export const IconThroughArrowDown = () => {
  return <div class={`${icon} ${iconThroughArrowDown}`} />;
};
export const IconThroughArrowRight = () => {
  return <div class={`${icon} ${iconThroughArrowRight}`} />;
};
export const IconThroughArrowLeft = () => {
  return <div class={`${icon} ${iconThroughArrowLeft}`} />;
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
  'Brush.4.Up': IconSignalDetectorUp,
  'Brush.4.Down': IconSignalDetectorDown,
  'Brush.4.Right': IconSignalDetectorRight,
  'Brush.4.Left': IconSignalDetectorLeft,
  'Brush.5.Up': IconOppositeArrowUp,
  'Brush.5.Left': IconOppositeArrowLeft,
  'Brush.5.Right': IconOppositeArrowRight,
  'Brush.5.Down': IconOppositeArrowDown,
  'Brush.6.Up.>': IconOrthogonalArrowUpNotFlip,
  'Brush.6.Down.>': IconOrthogonalArrowDownNotFlip,
  'Brush.6.Right.>': IconOrthogonalArrowRightNotFlip,
  'Brush.6.Left.>': IconOrthogonalArrowLeftNotFlip,
  'Brush.6.Up.<': IconOrthogonalArrowUpFlip,
  'Brush.6.Down.<': IconOrthogonalArrowDownFlip,
  'Brush.6.Right.<': IconOrthogonalArrowRightFlip,
  'Brush.6.Left.<': IconOrthogonalArrowRightFlip,
  'Brush.7.Up': IconTrioArrowUp,
  'Brush.7.Down': IconTrioArrowDown,
  'Brush.7.Right': IconTrioArrowRight,
  'Brush.7.Left': IconTrioArrowLeft,
  'Brush.8': IconPulseGenerator,
  'Brush.9.Up': IconThroughArrowUp,
  'Brush.9.Down': IconThroughArrowDown,
  'Brush.9.Right': IconThroughArrowRight,
  'Brush.9.Left': IconThroughArrowLeft,
} as const;

export const iconDirectionMapping = {
  Up: ArrowUp,
  Down: ArrowDown,
  Right: ArrowRight,
  Left: ArrowLeft,
}
