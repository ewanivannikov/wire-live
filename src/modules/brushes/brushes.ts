export type flip = '>' | '<';
export type Direction = 'Up' | 'Down' | 'Right' | 'Left';
export type TileId = `Brush.${number}.${Direction}.${flip}`;
export const brushes = {
  'Brush.0.Up': 'Arrow',
  'Brush.0.Down': 'Arrow',
  'Brush.0.Right': 'Arrow',
  'Brush.0.Left': 'Arrow',
  'Brush.1': 'SourceBlock',
  'Brush.2.Up': 'Blocker.Up',
  'Brush.2.Down': 'Blocker.Down',
  'Brush.2.Right': 'Blocker.Right',
  'Brush.2.Left': 'Blocker.Left',
  'Brush.3.Up': 'DelayArrow.Up',
  'Brush.3.Down': 'DelayArrow.Down',
  'Brush.3.Right': 'DelayArrow.Right',
  'Brush.3.Left': 'DelayArrow.Left',
  'Brush.4.Up': 'SignalDetector.Up',
  'Brush.4.Down': 'SignalDetector.Down',
  'Brush.4.Right': 'SignalDetector.Right',
  'Brush.4.Left': 'SignalDetector.Left',
  'Brush.5.Up': 'OppositeArrow.Up',
  'Brush.5.Right': 'OppositeArrow.Left',
  'Brush.6.Up.>': 'OrthogonalArrow.Up.>',
  'Brush.6.Down.>': 'OrthogonalArrow.Down.>',
  'Brush.6.Right.>': 'OrthogonalArrow.Right.>',
  'Brush.6.Left.>': 'OrthogonalArrow.Left.>',
  'Brush.6.Up.<': 'OrthogonalArrow.Up.<',
  'Brush.6.Down.<': 'OrthogonalArrow.Down.<',
  'Brush.6.Right.<': 'OrthogonalArrow.URight.<',
  'Brush.6.Left.<': 'OrthogonalArrow.Right.<',
  'Brush.7.Up': 'TrioArrow.Up',
  'Brush.7.Down': 'TrioArrow.Down',
  'Brush.7.Right': 'TrioArrow.Right',
  'Brush.7.Left': 'TrioArrow.Left',
  'Brush.8': 'PulseGenerator',
  'Brush.9.Up': 'ThroughArrow.Up',
  'Brush.9.Down': 'ThroughArrow.Down',
  'Brush.9.Right': 'ThroughArrow.Right',
  'Brush.9.Left': 'ThroughArrow.Left',
  'Brush.10.Up.>': 'DiagonalArrow.Up.>',
  'Brush.10.Down.>': 'DiagonalArrow.Down.>',
  'Brush.10.Right.>': 'DiagonalArrow.Right.>',
  'Brush.10.Left.>': 'DiagonalArrow.Left.>',
  'Brush.10.Up.<': 'DiagonalArrow.Up.<',
  'Brush.10.Down.<': 'DiagonalArrow.Down.<',
  'Brush.10.Right.<': 'DiagonalArrow.Right.<',
  'Brush.10.Left.<': 'DiagonalArrow.Left.<',
  'Brush.11.Up': 'DoubleArrow.Up',
  'Brush.11.Down': 'DoubleArrow.Down',
  'Brush.11.Right': 'DoubleArrow.Right',
  'Brush.11.Left': 'DoubleArrow.Left',
  'Brush.12.Up.>': 'ThroughNear.Up.>',
  'Brush.12.Down.>': 'ThroughNear.Down.>',
  'Brush.12.Right.>': 'ThroughNear.Right.>',
  'Brush.12.Left.>': 'ThroughNear.Left.>',
  'Brush.12.Up.<': 'ThroughNear.Up.<',
  'Brush.12.Down.<': 'ThroughNear.Down.<',
  'Brush.12.Right.<': 'ThroughNear.Right.<',
  'Brush.12.Left.<': 'ThroughNear.Left.<',
  'Brush.13.Up.>': 'ForwardDiagArrow.Up.>',
  'Brush.13.Down.>': 'ForwardDiagArrow.Down.>',
  'Brush.13.Right.>': 'ForwardDiagArrow.Right.>',
  'Brush.13.Left.>': 'ForwardDiagArrow.Left.>',
  'Brush.13.Up.<': 'ForwardDiagArrow.Up.<',
  'Brush.13.Down.<': 'ForwardDiagArrow.Down.<',
  'Brush.13.Right.<': 'ForwardDiagArrow.Right.<',
  'Brush.13.Left.<': 'ForwardDiagArrow.Left.<',
  'Brush.14.Up': 'NotGate.Up',
  'Brush.14.Down': 'NotGate.Down',
  'Brush.14.Right': 'NotGate.Right',
  'Brush.14.Left': 'NotGate.Left',
  'Brush.15.Up': 'AndGate.Up',
  'Brush.15.Down': 'AndGate.Down',
  'Brush.15.Right': 'AndGate.Right',
  'Brush.15.Left': 'AndGate.Left',
  'Brush.16.Up': 'XorGate.Up',
  'Brush.16.Down': 'XorGate.Down',
  'Brush.16.Right': 'XorGate.Right',
  'Brush.16.Left': 'XorGate.Left',
  'Brush.17.Up': 'Latch.Up',
  'Brush.17.Down': 'Latch.Down',
  'Brush.17.Right': 'Latch.Right',
  'Brush.17.Left': 'Latch.Left',
  'Brush.18.Up': 'FlipFlop.Up',
  'Brush.18.Down': 'FlipFlop.Down',
  'Brush.18.Right': 'FlipFlop.Right',
  'Brush.18.Left': 'FlipFlop.Left',
  'Brush.19.Up': 'RandomArrow.Up',
  'Brush.19.Down': 'RandomArrow.Down',
  'Brush.19.Right': 'RandomArrow.Right',
  'Brush.19.Left': 'RandomArrow.Left',
  'Brush.20': 'Button',
  'Brush.21.Up': 'InputArrow.Up',
  'Brush.21.Down': 'InputArrow.Down',
  'Brush.21.Right': 'InputArrow.Right',
  'Brush.21.Left': 'InputArrow.Left',
  'Brush.24': 'Bulb',
  'Brush.25.Up': 'BulbDetector.Up',
  'Brush.25.Down': 'BulbDetector.Down',
  'Brush.25.Right': 'BulbDetector.Right',
  'Brush.25.Left': 'BulbDetector.Left',
  // 'Button': 20,
  // 'Directional button': 21,
  // 'Eraser': 22
};

export const groupsBrushes = {
  'Brush.0.Up': {
    value: 'Arrow',
    label: 'Arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.1': {
    value: 'SourceBlock',
    label: 'Source block',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.2.Up': {
    value: 'Blocker',
    label: 'Blocker',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.3.Up': {
    value: 'DelayArrow',
    label: 'Delay arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.4.Up': {
    value: 'SignalDetector',
    label: 'Signal detector',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.5.Up': {
    value: 'OppositeArrow',
    label: 'Opposite arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.6.Up.>': {
    value: 'OrthogonalArrow',
    label: 'Orthogonal arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.7.Up': {
    value: 'TrioArrow',
    label: 'Trio arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.8': {
    value: 'PulseGenerator',
    label: 'Pulse generator',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.9.Up': {
    value: 'ThroughArrow',
    label: 'Through arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.10.Up.>': {
    value: 'DiagonalArrow',
    label: 'Diagonal arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.11.Up': {
    value: 'DoubleArrow',
    label: 'Double arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.12.Up.>': {
    value: 'ThroughNear',
    label: 'Through near',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.13.Up.>': {
    value: 'ForwardDiagArrow',
    label: 'Forward diagonal arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.14.Up': {
    value: 'NotGate',
    label: 'Not gate',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.15.Up': {
    value: 'AndGate',
    label: 'And gate',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.16.Up': {
    value: 'XorGate',
    label: 'Xor gate',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.17.Up': {
    value: 'Latch',
    label: 'Latch',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.18.Up': {
    value: 'FlipFlop',
    label: 'Flip-flop',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.19.Up': {
    value: 'RandomArrow',
    label: 'Random arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.20': {
    value: 'Button',
    label: 'Button',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.21.Up': {
    value: 'InputArrow',
    label: 'Input arrow',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.24': {
    value: 'Bulb',
    label: 'Bulb',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
  'Brush.25.Up': {
    value: 'BulbDetector',
    label: 'Bulb detector',
    description:
      'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.',
  },
};
