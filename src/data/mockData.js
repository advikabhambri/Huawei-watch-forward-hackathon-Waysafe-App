export const accessibilityProfiles = [
  {
    id: "vision",
    title: "Vision Impaired",
    icon: "eye",
    accent: "#1D4ED8",
    description: "High-contrast layouts, strong vibration, and voice-friendly support.",
    supportMessages: ["Voice guidance enabled", "Strong vibration active"],
  },
  {
    id: "hearing",
    title: "Hearing Impaired",
    icon: "ear-hearing",
    accent: "#F97316",
    description: "Visual emergency cues with bold contrast and instant on-screen status.",
    supportMessages: ["Visual alert mode enabled", "High-contrast screen active"],
  },
  {
    id: "speech",
    title: "Speech Impaired",
    icon: "message-text-outline",
    accent: "#B42318",
    description: "Fast one-tap help with minimized interaction during emergencies.",
    supportMessages: ["One-tap SOS ready", "Caregiver messaging streamlined"],
  },
  {
    id: "mobility",
    title: "Mobility Support",
    icon: "wheelchair-accessibility",
    accent: "#0F766E",
    description: "Accessible route support with larger touch targets and safe path guidance.",
    supportMessages: ["Accessible route recommended", "Low-effort navigation enabled"],
  },
  {
    id: "cognitive",
    title: "Cognitive / Elderly Support",
    icon: "account-heart-outline",
    accent: "#7C3AED",
    description: "Step-by-step emergency prompts with calm, easy-to-follow guidance.",
    supportMessages: ["Step-by-step guidance enabled", "Simple instructions on screen"],
  },
];

export const emergencyContacts = [
  {
    id: "contact-1",
    name: "Aisha Khan",
    phone: "+1 555 010 1122",
    relation: "Primary Caregiver",
    primary: true,
  },
  {
    id: "contact-2",
    name: "Daniel Rivera",
    phone: "+1 555 010 8833",
    relation: "Family Member",
    primary: false,
  },
];

export const alertHistory = [
  {
    id: "alert-1",
    type: "Fire Alert",
    timestamp: "2026-04-12T09:10:00Z",
    status: "Resolved",
  },
  {
    id: "alert-2",
    type: "Gas Leak Alert",
    timestamp: "2026-04-10T15:25:00Z",
    status: "Pending",
  },
  {
    id: "alert-3",
    type: "SOS Request",
    timestamp: "2026-04-08T18:42:00Z",
    status: "Resolved",
  },
];

export const caregiverStatus = {
  name: "Aisha Khan",
  availability: "Online",
  responseTime: "Avg. response in 2 min",
  note: "Primary caregiver is reachable and watching live status.",
};

export const quickActions = [
  { label: "Trigger Fire Alert", type: "Fire Alert", icon: "fire" },
  { label: "Trigger Gas Leak Alert", type: "Gas Leak Alert", icon: "gas-cylinder" },
  { label: "Trigger Evacuation Alert", type: "Evacuation Alert", icon: "exit-run" },
  { label: "Send SOS", type: "SOS Request", icon: "alert-decagram" },
];