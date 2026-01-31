import { SwingAnalysis, SetupAnalysis, GripAnalysis, SwingPhaseAnalysis, FeedbackItem, Improvement } from '../types';

const setupFeedbackOptions: Record<keyof Omit<SetupAnalysis, 'score'>, FeedbackItem[]> = {
  stance: [
    {
      status: 'good',
      feedback: 'Excellent stance width - shoulder-width apart provides good stability.',
      tip: 'Maintain this stance width for consistent ball striking.'
    },
    {
      status: 'needs-work',
      feedback: 'Stance appears slightly narrow, which may affect balance.',
      tip: 'Widen your stance to shoulder-width for better stability during the swing.'
    },
    {
      status: 'critical',
      feedback: 'Stance is too wide/narrow, significantly impacting swing mechanics.',
      tip: 'Practice with alignment sticks on the ground to establish proper stance width.'
    }
  ],
  alignment: [
    {
      status: 'good',
      feedback: 'Body alignment is square to the target line.',
      tip: 'Continue using intermediate targets to maintain this alignment.'
    },
    {
      status: 'needs-work',
      feedback: 'Shoulders appear slightly open/closed to the target.',
      tip: 'Use alignment sticks during practice to train proper body alignment.'
    },
    {
      status: 'critical',
      feedback: 'Significant misalignment detected - body aimed well off target.',
      tip: 'Focus on aligning feet, hips, and shoulders parallel to your target line.'
    }
  ],
  ballPosition: [
    {
      status: 'good',
      feedback: 'Ball position is appropriate for the club being used.',
      tip: 'Remember: ball forward for driver, center for wedges.'
    },
    {
      status: 'needs-work',
      feedback: 'Ball position could be adjusted for better contact.',
      tip: 'Move the ball slightly forward/back in your stance for optimal launch.'
    },
    {
      status: 'critical',
      feedback: 'Ball position is causing contact issues.',
      tip: 'For irons, position ball center to slightly forward of center.'
    }
  ],
  posture: [
    {
      status: 'good',
      feedback: 'Athletic posture with good spine angle and knee flex.',
      tip: 'This posture promotes a powerful and consistent swing path.'
    },
    {
      status: 'needs-work',
      feedback: 'Spine angle could be improved for better rotation.',
      tip: 'Bend from the hips, not the waist, and let arms hang naturally.'
    },
    {
      status: 'critical',
      feedback: 'Posture is too upright/hunched, limiting rotation.',
      tip: 'Practice the "sitting back" position with a club across your shoulders.'
    }
  ]
};

const gripFeedbackOptions: Record<keyof Omit<GripAnalysis, 'score'>, FeedbackItem[]> = {
  gripType: [
    {
      status: 'good',
      feedback: 'Neutral grip position promotes square clubface at impact.',
      tip: 'Your grip allows for natural release through the ball.'
    },
    {
      status: 'needs-work',
      feedback: 'Grip appears slightly strong/weak.',
      tip: 'Adjust to see 2-3 knuckles on your lead hand at address.'
    },
    {
      status: 'critical',
      feedback: 'Extreme grip position causing face angle issues.',
      tip: 'Work with a mirror to establish a neutral grip position.'
    }
  ],
  pressure: [
    {
      status: 'good',
      feedback: 'Grip pressure appears relaxed but secure.',
      tip: 'Light grip pressure (4 out of 10) promotes better clubhead speed.'
    },
    {
      status: 'needs-work',
      feedback: 'Grip may be slightly too tight, reducing wrist hinge.',
      tip: 'Try gripping like you\'re holding a tube of toothpaste without squeezing any out.'
    },
    {
      status: 'critical',
      feedback: 'Excessive grip pressure detected - "death grip".',
      tip: 'Tension in hands travels up arms. Practice swings with relaxed grip.'
    }
  ],
  handPosition: [
    {
      status: 'good',
      feedback: 'Hands are properly positioned ahead of the ball.',
      tip: 'This promotes a descending blow for crisp iron shots.'
    },
    {
      status: 'needs-work',
      feedback: 'Hands could be positioned more forward at address.',
      tip: 'Ensure your hands are slightly ahead of the clubhead at setup.'
    },
    {
      status: 'critical',
      feedback: 'Hands positioned behind the ball, causing scooping.',
      tip: 'Press hands forward until shaft leans toward target.'
    }
  ],
  wristAngle: [
    {
      status: 'good',
      feedback: 'Proper wrist angle established at address.',
      tip: 'This position helps maintain lag through the downswing.'
    },
    {
      status: 'needs-work',
      feedback: 'Wrist angle could be flatter for better control.',
      tip: 'Check that your lead wrist isn\'t cupped or bowed excessively.'
    },
    {
      status: 'critical',
      feedback: 'Wrist position at address causing inconsistent contact.',
      tip: 'Practice with a flat lead wrist training aid.'
    }
  ]
};

const swingPhaseFeedback: Record<string, SwingPhaseAnalysis[]> = {
  backswing: [
    {
      score: 85,
      feedback: 'Good takeaway and shoulder turn. Club on plane.',
      keyPoints: ['Full shoulder rotation', 'Weight shift to trail side', 'Club parallel at top']
    },
    {
      score: 70,
      feedback: 'Backswing shows room for improvement in rotation.',
      keyPoints: ['Increase shoulder turn', 'Maintain spine angle', 'Check club position at top']
    },
    {
      score: 55,
      feedback: 'Backswing needs work on plane and rotation.',
      keyPoints: ['Work on one-piece takeaway', 'Avoid lifting arms', 'Complete your turn']
    }
  ],
  downswing: [
    {
      score: 88,
      feedback: 'Excellent sequencing and lag retention.',
      keyPoints: ['Good hip initiation', 'Maintains lag', 'Shallow approach']
    },
    {
      score: 68,
      feedback: 'Downswing could benefit from better sequencing.',
      keyPoints: ['Start with lower body', 'Avoid casting', 'Drop hands into slot']
    },
    {
      score: 52,
      feedback: 'Over-the-top move detected in downswing.',
      keyPoints: ['Focus on inside path', 'Lead with hips', 'Keep right elbow close']
    }
  ],
  impact: [
    {
      score: 90,
      feedback: 'Solid impact position with good compression.',
      keyPoints: ['Hands ahead at impact', 'Hips open', 'Head behind ball']
    },
    {
      score: 72,
      feedback: 'Impact position shows some inconsistency.',
      keyPoints: ['Work on forward shaft lean', 'Maintain posture', 'Extend through ball']
    },
    {
      score: 58,
      feedback: 'Flipping at impact reducing power and consistency.',
      keyPoints: ['Keep hands leading', 'Don\'t scoop', 'Hit down on the ball']
    }
  ],
  followThrough: [
    {
      score: 87,
      feedback: 'Balanced finish with full rotation.',
      keyPoints: ['Weight on lead foot', 'Belt buckle to target', 'Club over shoulder']
    },
    {
      score: 65,
      feedback: 'Follow-through could be more complete.',
      keyPoints: ['Extend arms through impact', 'Rotate fully', 'Hold finish']
    },
    {
      score: 50,
      feedback: 'Abbreviated follow-through limiting power.',
      keyPoints: ['Swing to full finish', 'Balance is key', 'Let momentum carry club']
    }
  ]
};

const improvementSuggestions: Improvement[] = [
  {
    priority: 'high',
    area: 'Grip Pressure',
    description: 'Reducing grip pressure will increase clubhead speed and improve consistency.',
    drills: [
      'Grip pressure scale drill: Practice swings at 3/10 pressure',
      'Towel drill: Swing with a towel under armpits',
      'One-handed swings: Develop feel with each hand separately'
    ]
  },
  {
    priority: 'high',
    area: 'Setup Posture',
    description: 'Proper athletic posture is the foundation of a repeatable swing.',
    drills: [
      'Wall drill: Back against wall, slide down to athletic position',
      'Club behind back drill: Feel proper spine angle',
      'Mirror work: Check posture before every practice swing'
    ]
  },
  {
    priority: 'medium',
    area: 'Backswing Rotation',
    description: 'Full shoulder turn creates power and proper swing path.',
    drills: [
      'Feet together drill: Forces proper rotation',
      'Chair drill: Turn shoulders until back faces target',
      'Pause at top: Feel fully loaded position'
    ]
  },
  {
    priority: 'medium',
    area: 'Impact Position',
    description: 'Hands ahead at impact is crucial for consistent ball striking.',
    drills: [
      'Impact bag drill: Feel proper hand position',
      'Slow motion swings: Pause at impact',
      'Punch shot practice: Abbreviated follow-through'
    ]
  },
  {
    priority: 'low',
    area: 'Weight Transfer',
    description: 'Proper weight shift generates power and improves consistency.',
    drills: [
      'Step drill: Step toward target during downswing',
      'Pressure plate awareness: Feel ground forces',
      'Baseball throw drill: Simulate throwing motion'
    ]
  },
  {
    priority: 'low',
    area: 'Tempo',
    description: 'Consistent tempo leads to consistent contact and distance.',
    drills: [
      'Counting drill: 1-2-3 backswing, 1 downswing',
      'Feet together swings: Forces smooth tempo',
      'Practice at 70% speed: Build muscle memory'
    ]
  }
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function calculateScore(items: FeedbackItem[]): number {
  const statusScores = { 'good': 90, 'needs-work': 65, 'critical': 40 };
  const total = items.reduce((sum, item) => sum + statusScores[item.status], 0);
  return Math.round(total / items.length);
}

function generateSetupAnalysis(): SetupAnalysis {
  const stance = getRandomItem(setupFeedbackOptions.stance);
  const alignment = getRandomItem(setupFeedbackOptions.alignment);
  const ballPosition = getRandomItem(setupFeedbackOptions.ballPosition);
  const posture = getRandomItem(setupFeedbackOptions.posture);

  return {
    score: calculateScore([stance, alignment, ballPosition, posture]),
    stance,
    alignment,
    ballPosition,
    posture
  };
}

function generateGripAnalysis(): GripAnalysis {
  const gripType = getRandomItem(gripFeedbackOptions.gripType);
  const pressure = getRandomItem(gripFeedbackOptions.pressure);
  const handPosition = getRandomItem(gripFeedbackOptions.handPosition);
  const wristAngle = getRandomItem(gripFeedbackOptions.wristAngle);

  return {
    score: calculateScore([gripType, pressure, handPosition, wristAngle]),
    gripType,
    pressure,
    handPosition,
    wristAngle
  };
}

function selectImprovements(setup: SetupAnalysis, grip: GripAnalysis): Improvement[] {
  const selected: Improvement[] = [];

  if (grip.pressure.status !== 'good') {
    selected.push(improvementSuggestions.find(i => i.area === 'Grip Pressure')!);
  }
  if (setup.posture.status !== 'good') {
    selected.push(improvementSuggestions.find(i => i.area === 'Setup Posture')!);
  }

  // Add some additional improvements
  const remaining = improvementSuggestions.filter(i => !selected.includes(i));
  const shuffled = remaining.sort(() => Math.random() - 0.5);
  selected.push(...shuffled.slice(0, Math.min(2, shuffled.length)));

  return selected.slice(0, 4);
}

export async function analyzeSwing(): Promise<SwingAnalysis> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const setup = generateSetupAnalysis();
  const grip = generateGripAnalysis();
  const backswing = getRandomItem(swingPhaseFeedback.backswing);
  const downswing = getRandomItem(swingPhaseFeedback.downswing);
  const impact = getRandomItem(swingPhaseFeedback.impact);
  const followThrough = getRandomItem(swingPhaseFeedback.followThrough);

  const overallScore = Math.round(
    (setup.score + grip.score + backswing.score + downswing.score + impact.score + followThrough.score) / 6
  );

  return {
    overallScore,
    setup,
    grip,
    backswing,
    downswing,
    impact,
    followThrough,
    improvements: selectImprovements(setup, grip)
  };
}
