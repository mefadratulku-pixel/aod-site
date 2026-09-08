export interface CourseModule {
  number: string;
  title: string;
  duration: string;
  lessons: string[];
}

export interface Course {
  id: string;
  badge: "ON GOING" | "PUBLISHED";
  title: string;
  tagline: string;
  instructor: string;
  instructorRole: string;
  originalPrice: string;
  salePrice: string;
  image: string;
  rating: number;
  reviewsCount: number;
  studentsCount: string;
  level: string;
  language: string;
  description: string;
  learnings: string[];
  modules: CourseModule[];
}

export const COURSES: Record<string, Course> = {
  "vol-4": {
    id: "vol-4",
    badge: "ON GOING",
    title: "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0",
    tagline: "Learn To Think. Build Your Creative Process. Master Advanced Photo Manipulation.",
    instructor: "Fatiqul Ferdush Asif",
    instructorRole: "Founder & Creative Director, Art of Design",
    originalPrice: "৳15,000",
    salePrice: "৳6,000",
    image: "/images/course_1.jpg",
    rating: 4.9,
    reviewsCount: 384,
    studentsCount: "1,250+",
    level: "Intermediate to Advanced",
    language: "Bengali & English terms",
    description:
      "A flagship comprehensive masterclass engineered for graphic designers, digital artists, and creative directors in Bangladesh. Break beyond surface aesthetics into the deep visual logic, complex lighting deconstruction, and commercial photo manipulation secrets used by top global agencies.",
    learnings: [
      "Deconstruct lighting scenarios, specular reflections, and ambient shadows",
      "Advanced extraction, feathering, and hair masking techniques in Photoshop",
      "Realistic depth-of-field, lens dispersion, and atmospheric fog synthesis",
      "Color harmonization using Curves, Selective Color, and LUT color grading",
      "Storytelling and commercial art direction from scratch",
      "Industry client presentation standards and high-ticket portfolio packaging",
    ],
    modules: [
      {
        number: "01",
        title: "Visual Logic & Artistic Deconstruction",
        duration: "2h 45m",
        lessons: [
          "Understanding Perspective, Horizon Line & Focal Length",
          "Anatomy of Light: Key Light, Fill Light & Bounce Reflections",
          "Color Theory & Perceptual Contrast in Manipulation",
        ],
      },
      {
        number: "02",
        title: "Advanced Extraction & Plate Preparation",
        duration: "3h 15m",
        lessons: [
          "Complex Pen Tool Paths and Vector Masking Workflows",
          "Calculations & Channels for Hair and Transparent Alpha Masks",
          "Clean-up, Skin Retouching & Perspective Warping",
        ],
      },
      {
        number: "03",
        title: "Photorealistic Lighting & Atmospheric Painting",
        duration: "4h 00m",
        lessons: [
          "Hand-Painting Rim Lights & Subsurface Scattering",
          "Cast Shadows vs Contact Shadows: Mathematical Accuracy",
          "Generating Volumetric Light Beams & Particle Dust",
        ],
      },
      {
        number: "04",
        title: "Color Grading & Final Polish for Production",
        duration: "2h 30m",
        lessons: [
          "Harmonizing Assets with Dual-Tone Gradient Maps",
          "Camera Raw High-Pass Texturing and Micro-Contrast",
          "Exporting for Billboard Print vs Digital Display",
        ],
      },
    ],
  },
  "creativity-reset": {
    id: "creativity-reset",
    badge: "PUBLISHED",
    title: "CREATIVITY RESET 1.0 - WORKSHOP",
    tagline: "For Designers Who Feel Stuck. Disrupt Routine. Explore Creative Chaos.",
    instructor: "Fatiqul Ferdush Asif",
    instructorRole: "Creative Director, AOD Creative Community",
    originalPrice: "৳15,000",
    salePrice: "৳6,000",
    image: "/images/course_2.png",
    rating: 4.8,
    reviewsCount: 290,
    studentsCount: "980+",
    level: "All Skill Levels",
    language: "Bengali",
    description:
      "Are your designs feeling repetitive and uninspired? Creativity Reset 1.0 is a psychological and practical creative reboot. Dissect design stagnation, explore brutalist layouts, Swiss minimalism, and unlock rapid ideation methodologies.",
    learnings: [
      "Overcoming creative block and visual fatigue",
      "Experimental typography & expressive grid systems",
      "Tactile texture generation and physical scanning techniques",
      "Concept development in less than 30 minutes",
      "Building a signature design voice that stands out",
    ],
    modules: [
      {
        number: "01",
        title: "Diagnosing Creative Stagnation",
        duration: "2h 00m",
        lessons: [
          "Why Designers Get Stuck in Aesthetic Loops",
          "Breaking the Algorithm: Looking Beyond Pinterest & Behance",
          "The 100-Sketch Exercise for Uninhibited Ideation",
        ],
      },
      {
        number: "02",
        title: "Anti-Design & Radical Typographic Layouts",
        duration: "3h 10m",
        lessons: [
          "Deconstructed Swiss Typography & Bauhaus Rules",
          "Distortion, Scanner Glitches & Mixed Media Art",
          "Asymmetrical Balance and Visual Tension",
        ],
      },
      {
        number: "03",
        title: "Commercializing the Avant-Garde",
        duration: "2h 20m",
        lessons: [
          "Pitching Experimental Concepts to Conservative Clients",
          "Building an Irresistible Case Study",
        ],
      },
    ],
  },
  "survive-ai": {
    id: "survive-ai",
    badge: "PUBLISHED",
    title: "SURVIVE THE AI ERA - WORKSHOP",
    tagline: "Design What You See Is More Than You Think. Human Experience & Thinking.",
    instructor: "Fatiqul Ferdush Asif",
    instructorRole: "Principal Designer, Art of Design",
    originalPrice: "৳15,000",
    salePrice: "৳6,000",
    image: "/images/course_3.jpg",
    rating: 5.0,
    reviewsCount: 420,
    studentsCount: "1,500+",
    level: "All Levels",
    language: "Bengali & English terms",
    description:
      "Design is not just decoration. It is cognitive empathy, semiotics, and commercial psychology. Discover how top global designers craft visual solutions that trigger human emotions, build lasting loyalty, and outlast automated AI tools.",
    learnings: [
      "The semiotics of shapes, colors, and layout hierarchies",
      "Human emotional triggers in commercial brand campaigns",
      "Typography as visual voice and tone",
      "Converting visual design into measurable business impact",
      "How to articulate design decisions with confidence to clients",
    ],
    modules: [
      {
        number: "01",
        title: "Foundations of Visual Semiotics",
        duration: "2h 30m",
        lessons: [
          "Symbolism & Cultural Associations of Visual Elements",
          "The Psychology of Color in Asian & Western Markets",
          "Hierarchy, Gestalt Principles & Cognitive Load",
        ],
      },
      {
        number: "02",
        title: "Empathy-Driven Art Direction",
        duration: "3h 00m",
        lessons: [
          "Audience Persona Mapping for Visual Creatives",
          "Translating Abstract Emotions into Tangible Layouts",
          "Case Studies: High-End Fashion, Tech & Cultural Brands",
        ],
      },
      {
        number: "03",
        title: "Execution & Commercial Pitching",
        duration: "2h 15m",
        lessons: [
          "Defending Design Decisions to Non-Designers",
          "Pricing Strategy based on Value rather than Hours",
        ],
      },
    ],
  },
};
