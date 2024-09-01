import { Direction, Flip } from './types';
import { ArrowBase } from './ArrowBase';
import { createArrow } from './Arrow';
import { createSourceBlock } from './SourceBlock';
import { createBlocker } from './Blocker';
import { createDelayArrow } from './DelayArrow';
import { createSignalDetector } from './SignalDetector';
import { createOppositeArrow } from './OppositeArrow';
import { createOrthogonalArrow } from './OrthogonalArrow';
import { createTrioArrow } from './TrioArrow';
import { createPulseGenerator } from './PulseGenerator';
import { createThroughArrow } from './ThroughArrow';
import { createDiagonalArrow } from './DiagonalArrow';
import { createDoubleArrow } from './DoubleArrow';
import { createThroughNear } from './ThroughNear';
import { createForwardDiagArrow } from './ForwardDiagArrow';
import { createNotGate } from './NotGate';
import { createAndGate } from './AndGate';
import { createXorGate } from './XorGate';
import { createLatch } from './Latch';
import { createFlipFlop } from './FlipFlop';
import { createRandomArrow } from './RandomArrow';
import { createBulb } from './Bulb';
import { createBulbDetector } from './BulbDetector';

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

  if (nameType === 'DiagonalArrow') {
    const result = createDiagonalArrow(position, direction, flip);
    return result;
  }

  if (nameType === 'DoubleArrow') {
    const result = createDoubleArrow(position, direction);
    return result;
  }

  if (nameType === 'ThroughNear') {
    const result = createThroughNear(position, direction, flip);
    return result;
  }

  if (nameType === 'ForwardDiagArrow') {
    const result = createForwardDiagArrow(position, direction, flip);
    return result;
  }

  if (nameType === 'NotGate') {
    const result = createNotGate(position, direction);
    return result;
  }

  if (nameType === 'AndGate') {
    const result = createAndGate(position, direction);
    return result;
  }

  if (nameType === 'XorGate') {
    const result = createXorGate(position, direction);
    return result;
  }

  if (nameType === 'Latch') {
    const result = createLatch(position, direction);
    return result;
  }

  if (nameType === 'FlipFlop') {
    const result = createFlipFlop(position, direction);
    return result;
  }

  if (nameType === 'RandomArrow') {
    const result = createRandomArrow(position, direction);
    return result;
  }

  if (nameType === 'Button') {

  }

  if (nameType === 'Bulb') {
    const result = createBulb(position, direction);
    return result;
  }

  if (nameType === 'BulbDetector') {
    const result = createBulbDetector(position, direction);
    return result;
  }
};
