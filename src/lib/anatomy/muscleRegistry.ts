export type RegionId =
  | "shoulders"
  | "chest"
  | "arms"
  | "back"
  | "core"
  | "legs";

export type BodyView = "front" | "back";

export interface Exercise {
  name: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  equipment: "bodyweight" | "barbell" | "dumbbell" | "machine" | "cable";
}

export interface MuscleEntry {
  id: string;
  label: string;
  region: RegionId;
  view: BodyView;
  svgElementIds: string[];
  exercises: Exercise[];
  stretches: string[];
  recoveryTime: string;
  weeklyVolume: string;
  aiContext: {
    primaryFunctions: string[];
    commonIssues: string[];
  };
}

export interface RegionEntry {
  id: RegionId;
  label: string;
  views: BodyView[];
  hint: string;
}

export const REGIONS: Record<RegionId, RegionEntry> = {
  shoulders: {
    id: "shoulders",
    label: "Shoulders",
    views: ["front", "back"],
    hint: "Delts · front, lateral & rear",
  },
  chest: {
    id: "chest",
    label: "Chest",
    views: ["front"],
    hint: "Pectorals",
  },
  arms: {
    id: "arms",
    label: "Arms",
    views: ["front", "back"],
    hint: "Biceps · triceps · forearms",
  },
  back: {
    id: "back",
    label: "Back",
    views: ["back"],
    hint: "Lats · trapezius · erectors",
  },
  core: {
    id: "core",
    label: "Core",
    views: ["front"],
    hint: "Abdominals · obliques",
  },
  legs: {
    id: "legs",
    label: "Legs",
    views: ["front", "back"],
    hint: "Quads · hamstrings · glutes · calves",
  },
};

export const REGION_ORDER: RegionId[] = [
  "shoulders",
  "chest",
  "arms",
  "back",
  "core",
  "legs",
];

export const MUSCLES: Record<string, MuscleEntry> = {
  // ── Shoulders (front) ──
  "front-deltoid": {
    id: "front-deltoid",
    label: "Front Deltoid",
    region: "shoulders",
    view: "front",
    svgElementIds: ["shoulder-front-left", "shoulder-front-right"],
    exercises: [
      { name: "Overhead Press", difficulty: 3, equipment: "barbell" },
      { name: "Front Raise", difficulty: 2, equipment: "dumbbell" },
    ],
    stretches: ["Cross-body shoulder stretch"],
    recoveryTime: "48h",
    weeklyVolume: "12-16 sets",
    aiContext: {
      primaryFunctions: ["Shoulder flexion", "Frontal raise"],
      commonIssues: ["Anterior shoulder tightness", "Impingement"],
    },
  },
  "lateral-deltoid": {
    id: "lateral-deltoid",
    label: "Lateral Deltoid",
    region: "shoulders",
    view: "front",
    svgElementIds: ["shoulder-side-left", "shoulder-side-right"],
    exercises: [
      { name: "Lateral Raise", difficulty: 2, equipment: "dumbbell" },
      { name: "Cable Lateral Raise", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Cross-body shoulder stretch"],
    recoveryTime: "48h",
    weeklyVolume: "12-18 sets",
    aiContext: {
      primaryFunctions: ["Shoulder abduction", "Width"],
      commonIssues: ["Reactive tendonitis"],
    },
  },

  // ── Shoulders (back) ──
  "rear-deltoid": {
    id: "rear-deltoid",
    label: "Rear Deltoid",
    region: "shoulders",
    view: "back",
    svgElementIds: ["deltoid-rear-left", "deltoid-rear-right"],
    exercises: [
      { name: "Reverse Fly", difficulty: 2, equipment: "dumbbell" },
      { name: "Face Pull", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Cross-body shoulder stretch"],
    recoveryTime: "48h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Shoulder horizontal extension", "Posture"],
      commonIssues: ["Rounded shoulders", "Neglected rear chain"],
    },
  },

  // ── Chest (front) ──
  "upper-pectoralis": {
    id: "upper-pectoralis",
    label: "Upper Pec (Clavicular)",
    region: "chest",
    view: "front",
    svgElementIds: ["chest-upper-left", "chest-upper-right"],
    exercises: [
      { name: "Incline Dumbbell Press", difficulty: 3, equipment: "dumbbell" },
      { name: "Low-to-High Cable Fly", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Doorway chest stretch (arm low)"],
    recoveryTime: "48-72h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Clavicular head flexion", "Upper chest fullness"],
      commonIssues: ["Underdeveloped upper chest"],
    },
  },
  "lower-pectoralis": {
    id: "lower-pectoralis",
    label: "Lower Pec (Sternal)",
    region: "chest",
    view: "front",
    svgElementIds: ["chest-lower-left", "chest-lower-right"],
    exercises: [
      { name: "Bench Press", difficulty: 3, equipment: "barbell" },
      { name: "Decline Press", difficulty: 3, equipment: "barbell" },
      { name: "Cable Fly", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Doorway chest stretch (arm high)"],
    recoveryTime: "48-72h",
    weeklyVolume: "12-20 sets",
    aiContext: {
      primaryFunctions: ["Horizontal adduction", "Shoulder flexion"],
      commonIssues: ["Tight pecs", "Shoulder forward posture"],
    },
  },

  // ── Arms (front) ──
  "biceps-brachii": {
    id: "biceps-brachii",
    label: "Biceps Brachii",
    region: "arms",
    view: "front",
    svgElementIds: ["biceps-left", "biceps-right"],
    exercises: [
      { name: "Barbell Curl", difficulty: 2, equipment: "barbell" },
      { name: "Hammer Curl", difficulty: 2, equipment: "dumbbell" },
    ],
    stretches: ["Wall biceps stretch"],
    recoveryTime: "48h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Elbow flexion", "Supination"],
      commonIssues: ["Elbow tendonitis"],
    },
  },
  "forearm-brachii": {
    id: "forearm-brachii",
    label: "Forearm (Brachioradialis)",
    region: "arms",
    view: "front",
    svgElementIds: ["forearm-left", "forearm-right"],
    exercises: [
      { name: "Reverse Curl", difficulty: 2, equipment: "barbell" },
      { name: "Hammer Curl", difficulty: 2, equipment: "dumbbell" },
    ],
    stretches: ["Wrist flexor stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "8-12 sets",
    aiContext: {
      primaryFunctions: ["Elbow flexion", "Grip strength"],
      commonIssues: ["Forearm tightness", "Tennis elbow"],
    },
  },

  // ── Arms (back) ──
  "triceps-long-head": {
    id: "triceps-long-head",
    label: "Triceps (Long Head)",
    region: "arms",
    view: "back",
    svgElementIds: ["triceps-long-left", "triceps-long-right"],
    exercises: [
      { name: "Overhead Extension", difficulty: 2, equipment: "dumbbell" },
      { name: "Skull Crusher", difficulty: 3, equipment: "barbell" },
    ],
    stretches: ["Overhead triceps stretch"],
    recoveryTime: "48h",
    weeklyVolume: "10-14 sets",
    aiContext: {
      primaryFunctions: ["Elbow extension", "Shoulder extension"],
      commonIssues: ["Triceps tendonitis"],
    },
  },
  "triceps-lateral-head": {
    id: "triceps-lateral-head",
    label: "Triceps (Lateral Head)",
    region: "arms",
    view: "back",
    svgElementIds: ["triceps-lateral-left", "triceps-lateral-right"],
    exercises: [
      { name: "Triceps Pushdown", difficulty: 2, equipment: "cable" },
      { name: "Close-Grip Bench", difficulty: 3, equipment: "barbell" },
    ],
    stretches: ["Overhead triceps stretch"],
    recoveryTime: "48h",
    weeklyVolume: "10-14 sets",
    aiContext: {
      primaryFunctions: ["Elbow extension", "Lockout strength"],
      commonIssues: ["Lateral head imbalances"],
    },
  },
  "forearm-flexors": {
    id: "forearm-flexors",
    label: "Forearm Flexors",
    region: "arms",
    view: "back",
    svgElementIds: ["forearm-flexors-left", "forearm-flexors-right"],
    exercises: [
      { name: "Wrist Curl", difficulty: 1, equipment: "dumbbell" },
      { name: "Farmer's Walk", difficulty: 3, equipment: "dumbbell" },
    ],
    stretches: ["Wrist extensor stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "6-10 sets",
    aiContext: {
      primaryFunctions: ["Wrist flexion", "Grip strength"],
      commonIssues: ["Medial epicondylitis", "Golfer's elbow"],
    },
  },
  "forearm-extensors": {
    id: "forearm-extensors",
    label: "Forearm Extensors",
    region: "arms",
    view: "back",
    svgElementIds: ["forearm-extensors-left", "forearm-extensors-right"],
    exercises: [
      { name: "Reverse Wrist Curl", difficulty: 1, equipment: "dumbbell" },
      { name: "Plate Pinch", difficulty: 2, equipment: "dumbbell" },
    ],
    stretches: ["Wrist flexor stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "6-10 sets",
    aiContext: {
      primaryFunctions: ["Wrist extension", "Grip strength"],
      commonIssues: ["Lateral epicondylitis", "Tennis elbow"],
    },
  },

  // ── Back (back) ──
  "upper-trapezius": {
    id: "upper-trapezius",
    label: "Upper Trapezius",
    region: "back",
    view: "back",
    svgElementIds: ["traps-upper-left", "traps-upper-right"],
    exercises: [
      { name: "Barbell Shrug", difficulty: 2, equipment: "barbell" },
      { name: "Farmer's Walk", difficulty: 3, equipment: "dumbbell" },
    ],
    stretches: ["Neck tilt stretch"],
    recoveryTime: "48h",
    weeklyVolume: "8-14 sets",
    aiContext: {
      primaryFunctions: ["Scapular elevation", "Neck support"],
      commonIssues: ["Upper trap tightness", "Tension headaches"],
    },
  },
  "mid-trapezius": {
    id: "mid-trapezius",
    label: "Mid Trapezius",
    region: "back",
    view: "back",
    svgElementIds: ["traps-mid-left", "traps-mid-right"],
    exercises: [
      { name: "Face Pull", difficulty: 2, equipment: "cable" },
      { name: "Seated Cable Row", difficulty: 3, equipment: "cable" },
    ],
    stretches: ["Shoulder blade squeeze"],
    recoveryTime: "48h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Scapular retraction", "Posture"],
      commonIssues: ["Weak mid-traps", "Rounded shoulders"],
    },
  },
  "lower-trapezius": {
    id: "lower-trapezius",
    label: "Lower Trapezius",
    region: "back",
    view: "back",
    svgElementIds: ["traps-lower-left", "traps-lower-right"],
    exercises: [
      { name: "Y-Raise", difficulty: 1, equipment: "dumbbell" },
      { name: "Prone Trap Raise", difficulty: 2, equipment: "bodyweight" },
    ],
    stretches: ["Child's pose stretch"],
    recoveryTime: "48h",
    weeklyVolume: "8-12 sets",
    aiContext: {
      primaryFunctions: ["Scapular depression", "Shoulder stability"],
      commonIssues: ["Lower trap weakness", "Scapular winging"],
    },
  },
  "upper-lats": {
    id: "upper-lats",
    label: "Upper Lats",
    region: "back",
    view: "back",
    svgElementIds: ["lats-upper-left", "lats-upper-right"],
    exercises: [
      { name: "Pull-up", difficulty: 4, equipment: "bodyweight" },
      { name: "Lat Pulldown", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Hanging lat stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "12-18 sets",
    aiContext: {
      primaryFunctions: ["Shoulder adduction", "Vertical pull"],
      commonIssues: ["Tight lats limiting overhead"],
    },
  },
  "mid-lats": {
    id: "mid-lats",
    label: "Mid Lats",
    region: "back",
    view: "back",
    svgElementIds: ["lats-mid-left", "lats-mid-right"],
    exercises: [
      { name: "Pull-up", difficulty: 4, equipment: "bodyweight" },
      { name: "Lat Pulldown", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Hanging lat stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "12-18 sets",
    aiContext: {
      primaryFunctions: ["Shoulder adduction", "Back width"],
      commonIssues: ["Mid-back weakness"],
    },
  },
  "lower-lats": {
    id: "lower-lats",
    label: "Lower Lats",
    region: "back",
    view: "back",
    svgElementIds: ["lats-lower-left", "lats-lower-right"],
    exercises: [
      { name: "Straight-Arm Pulldown", difficulty: 2, equipment: "cable" },
      { name: "Pullover", difficulty: 3, equipment: "dumbbell" },
    ],
    stretches: ["Hanging lat stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Shoulder extension", "Back taper"],
      commonIssues: ["Lower lat underdevelopment"],
    },
  },
  "erector-spinae": {
    id: "erector-spinae",
    label: "Erector Spinae",
    region: "back",
    view: "back",
    svgElementIds: ["lower-back-erectors-left", "lower-back-erectors-right"],
    exercises: [
      { name: "Deadlift", difficulty: 5, equipment: "barbell" },
      { name: "Back Extension", difficulty: 2, equipment: "bodyweight" },
    ],
    stretches: ["Cat-cow stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "8-14 sets",
    aiContext: {
      primaryFunctions: ["Spinal extension", "Postural support"],
      commonIssues: ["Lower back strain", "Erector dominance"],
    },
  },
  "quadratus-lumborum": {
    id: "quadratus-lumborum",
    label: "Quadratus Lumborum",
    region: "back",
    view: "back",
    svgElementIds: ["lower-back-ql-left", "lower-back-ql-right"],
    exercises: [
      { name: "Side Bend", difficulty: 1, equipment: "dumbbell" },
      { name: "Deadlift", difficulty: 5, equipment: "barbell" },
    ],
    stretches: ["Side-lying QL stretch"],
    recoveryTime: "48h",
    weeklyVolume: "6-10 sets",
    aiContext: {
      primaryFunctions: ["Lateral trunk flexion", "Hip hike"],
      commonIssues: ["QL tightness", "Lower back pain"],
    },
  },

  // ── Core (front) ──
  "upper-rectus-abdominis": {
    id: "upper-rectus-abdominis",
    label: "Upper Abs",
    region: "core",
    view: "front",
    svgElementIds: ["abs-upper-left", "abs-upper-right"],
    exercises: [
      { name: "Cable Crunch", difficulty: 2, equipment: "cable" },
      { name: "Decline Sit-up", difficulty: 3, equipment: "bodyweight" },
    ],
    stretches: ["Cobra stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "12-18 sets",
    aiContext: {
      primaryFunctions: ["Spinal flexion", "Upper core stability"],
      commonIssues: ["Neck compensation during crunches"],
    },
  },
  "lower-rectus-abdominis": {
    id: "lower-rectus-abdominis",
    label: "Lower Abs",
    region: "core",
    view: "front",
    svgElementIds: ["abs-lower-left", "abs-lower-right"],
    exercises: [
      { name: "Hanging Leg Raise", difficulty: 3, equipment: "bodyweight" },
      { name: "Reverse Crunch", difficulty: 2, equipment: "bodyweight" },
    ],
    stretches: ["Cobra stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Lumbar spine flexion", "Lower core stability"],
      commonIssues: ["Lower back compensation"],
    },
  },
  "serratus-anterior": {
    id: "serratus-anterior",
    label: "Serratus Anterior",
    region: "core",
    view: "front",
    svgElementIds: ["serratus-anterior-left", "serratus-anterior-right"],
    exercises: [
      { name: "Protraction Push-up", difficulty: 2, equipment: "bodyweight" },
      { name: "Punch-out", difficulty: 1, equipment: "dumbbell" },
    ],
    stretches: ["Side-lying serratus stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "6-10 sets",
    aiContext: {
      primaryFunctions: ["Scapular protraction", "Shoulder stability"],
      commonIssues: ["Serratus weakness", "Scapular winging"],
    },
  },
  "external-oblique": {
    id: "external-oblique",
    label: "External Oblique",
    region: "core",
    view: "front",
    svgElementIds: ["obliques-left", "obliques-right"],
    exercises: [
      { name: "Russian Twist", difficulty: 2, equipment: "bodyweight" },
      { name: "Side Plank", difficulty: 2, equipment: "bodyweight" },
      { name: "Pallof Press", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Standing side bend stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "8-14 sets",
    aiContext: {
      primaryFunctions: ["Trunk rotation", "Lateral flexion"],
      commonIssues: ["Oblique strains", "Rotational imbalance"],
    },
  },

  // ── Legs (front) ──
  "quadriceps": {
    id: "quadriceps",
    label: "Quadriceps",
    region: "legs",
    view: "front",
    svgElementIds: ["quads-left", "quads-right"],
    exercises: [
      { name: "Back Squat", difficulty: 4, equipment: "barbell" },
      { name: "Leg Press", difficulty: 2, equipment: "machine" },
      { name: "Bulgarian Split Squat", difficulty: 3, equipment: "dumbbell" },
    ],
    stretches: ["Couch stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "12-20 sets",
    aiContext: {
      primaryFunctions: ["Knee extension", "Squat drive"],
      commonIssues: ["Quad dominance", "Patellar tendonitis"],
    },
  },
  "adductors": {
    id: "adductors",
    label: "Adductors",
    region: "legs",
    view: "front",
    svgElementIds: ["adductors-left", "adductors-right"],
    exercises: [
      { name: "Adductor Machine", difficulty: 1, equipment: "machine" },
      { name: "Sumo Deadlift", difficulty: 4, equipment: "barbell" },
    ],
    stretches: ["Frog stretch", "Butterfly stretch"],
    recoveryTime: "48h",
    weeklyVolume: "6-12 sets",
    aiContext: {
      primaryFunctions: ["Hip adduction", "Stability"],
      commonIssues: ["Adductor strains", "Groin pulls"],
    },
  },
  "tibialis-anterior": {
    id: "tibialis-anterior",
    label: "Tibialis Anterior",
    region: "legs",
    view: "front",
    svgElementIds: ["tibialis-anterior-left", "tibialis-anterior-right"],
    exercises: [
      { name: "Toe Raise", difficulty: 1, equipment: "bodyweight" },
      { name: "Tibialis Raise", difficulty: 1, equipment: "dumbbell" },
    ],
    stretches: ["Ankle dorsiflexion stretch"],
    recoveryTime: "24h",
    weeklyVolume: "4-8 sets",
    aiContext: {
      primaryFunctions: ["Ankle dorsiflexion", "Shin support"],
      commonIssues: ["Shin splints", "Anterior compartment syndrome"],
    },
  },
  "hip-flexor": {
    id: "hip-flexor",
    label: "Hip Flexor",
    region: "legs",
    view: "front",
    svgElementIds: ["hip-flexor-left", "hip-flexor-right"],
    exercises: [
      { name: "Hanging Knee Raise", difficulty: 2, equipment: "bodyweight" },
      { name: "Cable Hip Flexion", difficulty: 2, equipment: "cable" },
    ],
    stretches: ["Kneeling hip flexor stretch"],
    recoveryTime: "24-48h",
    weeklyVolume: "6-10 sets",
    aiContext: {
      primaryFunctions: ["Hip flexion", "Core-pelvis connection"],
      commonIssues: ["Hip flexor tightness", "Sitting posture"],
    },
  },

  // ── Legs (back) ──
  "hamstrings": {
    id: "hamstrings",
    label: "Hamstrings",
    region: "legs",
    view: "back",
    svgElementIds: [
      "hamstrings-medial-left", "hamstrings-lateral-left",
      "hamstrings-medial-right", "hamstrings-lateral-right",
    ],
    exercises: [
      { name: "Romanian Deadlift", difficulty: 3, equipment: "barbell" },
      { name: "Leg Curl", difficulty: 2, equipment: "machine" },
    ],
    stretches: ["Seated hamstring stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Knee flexion", "Hip extension"],
      commonIssues: ["Strains", "Tightness"],
    },
  },
  "gluteus-medius": {
    id: "gluteus-medius",
    label: "Gluteus Medius",
    region: "legs",
    view: "back",
    svgElementIds: ["gluteus-medius-left", "gluteus-medius-right"],
    exercises: [
      { name: "Side-Lying Leg Raise", difficulty: 1, equipment: "bodyweight" },
      { name: "Banded Clamshell", difficulty: 1, equipment: "bodyweight" },
    ],
    stretches: ["Pigeon stretch"],
    recoveryTime: "48h",
    weeklyVolume: "8-12 sets",
    aiContext: {
      primaryFunctions: ["Hip abduction", "Pelvic stability"],
      commonIssues: ["Glute med weakness", "IT band tightness"],
    },
  },
  "gluteus-maximus": {
    id: "gluteus-maximus",
    label: "Gluteus Maximus",
    region: "legs",
    view: "back",
    svgElementIds: ["gluteus-maximus-left", "gluteus-maximus-right"],
    exercises: [
      { name: "Hip Thrust", difficulty: 3, equipment: "barbell" },
      { name: "Bulgarian Split Squat", difficulty: 3, equipment: "dumbbell" },
      { name: "Deadlift", difficulty: 5, equipment: "barbell" },
    ],
    stretches: ["Pigeon stretch"],
    recoveryTime: "48-72h",
    weeklyVolume: "12-18 sets",
    aiContext: {
      primaryFunctions: ["Hip extension", "Posterior power"],
      commonIssues: ["Glute amnesia", "Lower back strain"],
    },
  },
  "gastrocnemius": {
    id: "gastrocnemius",
    label: "Gastrocnemius",
    region: "legs",
    view: "back",
    svgElementIds: [
      "calves-gastroc-medial-left", "calves-gastroc-lateral-left",
      "calves-gastroc-medial-right", "calves-gastroc-lateral-right",
    ],
    exercises: [
      { name: "Standing Calf Raise", difficulty: 2, equipment: "machine" },
      { name: "Donkey Calf Raise", difficulty: 2, equipment: "machine" },
    ],
    stretches: ["Wall calf stretch (straight knee)"],
    recoveryTime: "48h",
    weeklyVolume: "10-16 sets",
    aiContext: {
      primaryFunctions: ["Plantar flexion", "Push-off power"],
      commonIssues: ["Calf strains", "Achilles tendonitis"],
    },
  },
  "soleus": {
    id: "soleus",
    label: "Soleus",
    region: "legs",
    view: "back",
    svgElementIds: ["calves-soleus-left", "calves-soleus-right"],
    exercises: [
      { name: "Seated Calf Raise", difficulty: 2, equipment: "machine" },
    ],
    stretches: ["Wall calf stretch (bent knee)"],
    recoveryTime: "48h",
    weeklyVolume: "8-14 sets",
    aiContext: {
      primaryFunctions: ["Plantar flexion", "Endurance posture"],
      commonIssues: ["Soleus tightness", "Deep calf pain"],
    },
  },
};

export const REGION_MUSCLES: Record<RegionId, string[]> = REGION_ORDER.reduce(
  (acc, region) => {
    acc[region] = Object.values(MUSCLES)
      .filter((m) => m.region === region)
      .map((m) => m.id);
    return acc;
  },
  {} as Record<RegionId, string[]>
);

export function getMuscle(id: string): MuscleEntry | undefined {
  return MUSCLES[id];
}

export function getRegion(id: string): RegionEntry | undefined {
  return REGIONS[id as RegionId];
}

export function musclesForRegion(region: RegionId): MuscleEntry[] {
  return REGION_MUSCLES[region].map((id) => MUSCLES[id]);
}

export function allMuscles(): MuscleEntry[] {
  return Object.values(MUSCLES);
}
