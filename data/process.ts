export type visualTypes = "upload" | "timeline" | "feedback" | "delivery";
export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  visualType: visualTypes;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Drop Your Footage",
    description:
      "Upload your raw clips using WeTransfer, Google Drive, Dropbox, or any platform that works for you.",
    visualType: "upload",
  },
  {
    number: "02",
    title: "We Do Our Magic",
    description:
      "Your footage is transformed into a polished, story-driven video with cinematic visuals, immersive sound design, and editing that keeps viewers engaged.",
    visualType: "timeline",
  },
  {
    number: "03",
    title: "Feedback? Easy",
    description:
      "Need adjustments? Streamlined revisions ensure your vision is met.",
    visualType: "feedback",
  },
  {
    number: "04",
    title: "Upload & Grow",
    description:
      "I deliver your final video in ready-to-upload YouTube format.",
    visualType: "delivery",
  },
];
