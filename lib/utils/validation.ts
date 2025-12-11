import { z } from "zod";

/**
 * Zod validation schemas for form inputs
 */

export const birthDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  dateOfBirth: z.string().refine(
    (date: string) => {
      const d = new Date(date);
      return d instanceof Date && !isNaN(d.getTime());
    },
    { message: "Invalid date" }
  ),
  timeOfBirth: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
  placeOfBirth: z.string().min(2, "Place name is required"),
  latitude: z.string().refine(
    (val: string) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    },
    { message: "Latitude must be between -90 and 90" }
  ),
  longitude: z.string().refine(
    (val: string) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    },
    { message: "Longitude must be between -180 and 180" }
  ),
  timezone: z.string().min(1, "Timezone is required"),
  gender: z.enum(["male", "female", "other"]),
});

export type BirthDetailsFormInput = z.infer<typeof birthDetailsSchema>;
