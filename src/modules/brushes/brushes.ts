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
  // 'Diagonal arrow': 10,
  // 'Blue splitter': 11,
  // 'Blue splitter forward and to the right': 12,
  // 'Blue splitter forwards and diagonally': 13,
  // 'Not gate': 14,
  // 'And gate': 15,
  // 'XOR gate': 16,
  // 'Latch': 17,
  // 'T flip-flop': 18,
  // 'Randomizer': 19,
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
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.3.Up': {
    value: 'DelayArrow',
    label: 'Delay arrow',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.4.Up': {
    value: 'SignalDetector',
    label: 'Signal detector',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.5.Up': {
    value: 'OppositeArrow',
    label: 'Opposite arrow',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.6.Up.>': {
    value: 'OrthogonalArrow',
    label: 'Orthogonal arrow',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.7.Up': {
    value: 'TrioArrow',
    label: 'Trio arrow',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.8': {
    value: 'PulseGenerator',
    label: 'Pulse generator',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  'Brush.9.Up': {
    value: 'ThroughArrow',
    label: 'Through arrow',
    description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  },
  // 'Blue arrow': {
  //   id: 10,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Diagonal arrow': {
  //   id: 11,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Blue splitter': {
  //   id: 12,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Blue splitter forward and to the right': {
  //   id: 13,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Blue splitter forwards and diagonally': {
  //   id: 14,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Not gate': {
  //   id: 15,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'And gate': {
  //   id: 16,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'XOR gate': {
  //   id: 17,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Latch': {
  //   id: 18,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'T flip-flop': {
  //   id: 19,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Randomizer': {
  //   id: 20,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Button': {
  //   id: 21,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
  // 'Directional button': {
  //   id: 22,
  //   label: 'Arrow',
  //   description: 'Activates: On any incoming signal.\nOn activation: Sends a signal forwards.'
  // },
};
