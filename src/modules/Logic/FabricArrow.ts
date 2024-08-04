import { Direction, Flip } from './types';
import { createArrow } from './Arrow';
import { createSourceBlock } from './SourceBlock';
import { createBlocker } from './Blocker';
import { createDelayArrow } from './DelayArrow';
import { createSignalDetector } from './SignalDetector';
import { createOppositeArrow } from './OppositeArrow';
import { createOrthogonalArrow } from './OrthogonalArrow';
import { createTrioArrow } from './TrioArrow'
import { createPulseGenerator } from './PulseGenerator'
import { createThroughArrow } from './ThroughArrow'

export const fabricArrow = (
  nameType: string,
  position: string,
  direction?: Direction,
  flip?: Flip,
) => {
  if (nameType === 'Arrow') {
    const result = createArrow(position, direction);
    return result;
  }

  if (nameType === 'SourceBlock') {
    const result = createSourceBlock(position);
    return result;
  }

  if (nameType === 'Blocker') {
    const result = createBlocker(position, direction);
    return result;
  }

  if (nameType === 'DelayArrow') {
    const result = createDelayArrow(position, direction);
    return result;
  }

  if (nameType === 'SignalDetector') {
    const result = createSignalDetector(position, direction);
    return result;
  }

  if (nameType === 'OppositeArrow') {
    const result = createOppositeArrow(position, direction);
    return result;
  }
  
  if (nameType === 'OrthogonalArrow') {
    const result = createOrthogonalArrow(position, direction, flip);
    return result;
  }

  if (nameType === 'TrioArrow') {
    const result = createTrioArrow(position, direction);
    return result;
  }

  if (nameType === 'PulseGenerator') {
    const result = createPulseGenerator(position);
    return result;
  }

  if (nameType === 'ThroughArrow') {
    const result = createThroughArrow(position, direction);
    return result;
  }
};
