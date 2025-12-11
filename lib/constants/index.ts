/**
 * Application-wide constants
 */

import type { Planet, ZodiacSign } from "../types";

export const ZODIAC_SIGNS: Record<
  ZodiacSign,
  { name: string; symbol: string; element: string }
> = {
  aries: { name: "Aries", symbol: "♈", element: "Fire" },
  taurus: { name: "Taurus", symbol: "♉", element: "Earth" },
  gemini: { name: "Gemini", symbol: "♊", element: "Air" },
  cancer: { name: "Cancer", symbol: "♋", element: "Water" },
  leo: { name: "Leo", symbol: "♌", element: "Fire" },
  virgo: { name: "Virgo", symbol: "♍", element: "Earth" },
  libra: { name: "Libra", symbol: "♎", element: "Air" },
  scorpio: { name: "Scorpio", symbol: "♏", element: "Water" },
  sagittarius: { name: "Sagittarius", symbol: "♐", element: "Fire" },
  capricorn: { name: "Capricorn", symbol: "♑", element: "Earth" },
  aquarius: { name: "Aquarius", symbol: "♒", element: "Air" },
  pisces: { name: "Pisces", symbol: "♓", element: "Water" },
};

export const PLANETS: Record<
  Planet,
  { name: string; symbol: string; isRetrograde: boolean }
> = {
  sun: { name: "Sun", symbol: "☉", isRetrograde: false },
  moon: { name: "Moon", symbol: "☽", isRetrograde: false },
  mercury: { name: "Mercury", symbol: "☿", isRetrograde: false },
  venus: { name: "Venus", symbol: "♀", isRetrograde: false },
  mars: { name: "Mars", symbol: "♂", isRetrograde: false },
  jupiter: { name: "Jupiter", symbol: "♃", isRetrograde: false },
  saturn: { name: "Saturn", symbol: "♄", isRetrograde: false },
  rahu: { name: "Rahu", symbol: "☊", isRetrograde: true },
  ketu: { name: "Ketu", symbol: "☋", isRetrograde: true },
};

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshta",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

export const DASHA_ORDER: Planet[] = [
  "ketu",
  "venus",
  "sun",
  "moon",
  "mars",
  "rahu",
  "jupiter",
  "saturn",
  "mercury",
];

export const DASHA_DURATIONS: Record<Planet, number> = {
  ketu: 7,
  venus: 20,
  sun: 6,
  moon: 10,
  mars: 7,
  rahu: 18,
  jupiter: 16,
  saturn: 19,
  mercury: 17,
};

export const HOUSE_NAMES: Record<number, string> = {
  1: "Ascendant (Lagna)",
  2: "Wealth (Dhana)",
  3: "Siblings (Sahaja)",
  4: "Mother & Home (Matri)",
  5: "Children (Putra)",
  6: "Health & Enemies (Ari)",
  7: "Marriage (Kalatra)",
  8: "Longevity (Ayush)",
  9: "Fortune (Bhagya)",
  10: "Career (Karma)",
  11: "Gains (Labha)",
  12: "Losses (Vyaya)",
};

export const INDIAN_CITIES: Record<
  string,
  { lat: number; lon: number; tz: string }
> = {
  Mumbai: { lat: 19.076, lon: 72.8777, tz: "Asia/Kolkata" },
  Delhi: { lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  Bangalore: { lat: 12.9716, lon: 77.5946, tz: "Asia/Kolkata" },
  Kolkata: { lat: 22.5726, lon: 88.3639, tz: "Asia/Kolkata" },
  Chennai: { lat: 13.0827, lon: 80.2707, tz: "Asia/Kolkata" },
  Hyderabad: { lat: 17.385, lon: 78.4867, tz: "Asia/Kolkata" },
  Pune: { lat: 18.5204, lon: 73.8567, tz: "Asia/Kolkata" },
  Ahmedabad: { lat: 23.0225, lon: 72.5714, tz: "Asia/Kolkata" },
  Jaipur: { lat: 26.9124, lon: 75.7873, tz: "Asia/Kolkata" },
  Lucknow: { lat: 26.8467, lon: 80.9462, tz: "Asia/Kolkata" },
};
