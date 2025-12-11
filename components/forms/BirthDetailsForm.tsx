"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { DateInput } from "@/components/ui/DateInput";
import { TimePicker } from "@/components/ui/TimePicker";
import { Autocomplete } from "@/components/ui/Autocomplete";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  birthDetailsSchema,
  type BirthDetailsFormInput,
} from "@/lib/utils/validation";
import { INDIAN_CITIES } from "@/lib/constants";
import type { Gender } from "@/lib/types";

interface BirthDetailsFormProps {
  onSubmit: (data: BirthDetailsFormInput) => Promise<void>;
  isLoading?: boolean;
}

export function BirthDetailsForm({
  onSubmit,
  isLoading,
}: BirthDetailsFormProps) {
  const [formData, setFormData] = useState<BirthDetailsFormInput>({
    name: "",
    email: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    latitude: "",
    longitude: "",
    timezone: "Asia/Kolkata",
    gender: "male",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BirthDetailsFormInput, string>>
  >({});
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    if (cityName && INDIAN_CITIES[cityName]) {
      const city = INDIAN_CITIES[cityName];
      setFormData((prev) => ({
        ...prev,
        placeOfBirth: cityName,
        latitude: city.lat.toString(),
        longitude: city.lon.toString(),
        timezone: city.tz,
      }));
      setErrors((prev) => ({
        ...prev,
        placeOfBirth: undefined,
        latitude: undefined,
        longitude: undefined,
        timezone: undefined,
      }));
    }
  };

  const handleChange = (
    field: keyof BirthDetailsFormInput,
    value: string | Gender
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const result = birthDetailsSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BirthDetailsFormInput, string>> =
        {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof BirthDetailsFormInput;
        fieldErrors[field] = error.message;
      });

      // capture first field with error to scroll to it
      const firstField = result.error.errors[0]?.path[0] as
        | keyof BirthDetailsFormInput
        | undefined;

      setErrors(fieldErrors);

      if (firstField) {
        // allow the DOM to update then scroll to and focus the offending control
        setTimeout(() => {
          const id = String(firstField);
          let el: HTMLElement | null = document.getElementById(id);

          if (!el) {
            el = document.querySelector(`[name="${id}"]`) as HTMLElement | null;
          }

          if (el) {
            const focusable = (el as HTMLElement).querySelector
              ? (el as HTMLElement).querySelector(
                  "input,select,textarea,button"
                )
              : null;
            const toFocus = el as HTMLElement as HTMLElement;

            if (focusable) {
              (focusable as HTMLElement).focus({ preventScroll: true });
            } else {
              try {
                toFocus.focus?.({ preventScroll: true } as any);
              } catch (e) {}
            }

            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 50);
      }

      return;
    }

    setErrors({});
    await onSubmit(result.data);
  };

  const cityOptions = Object.keys(INDIAN_CITIES).map((city) => ({
    value: city,
    label: city,
  }));

  const genderOptions: Array<{ value: Gender; label: string }> = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <Card className="shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardHeader className="text-center pb-6 pt-6 border-b border-gray-100 dark:border-gray-700">
        <div className="mb-2">
          <span className="text-4xl">✨</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Birth Details
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2">
          Enter your birth information to generate your astrology report
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <Input
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            required
            placeholder="Enter your full name"
          />

          {/* Email */}
          <Input
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            placeholder="your.email@example.com"
            helperText="Optional - to receive your full report"
          />

          {/* Date of Birth */}
          <DateInput
            id="dateOfBirth"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            error={errors.dateOfBirth}
            required
            max={new Date().toISOString().split("T")[0]}
          />

          {/* Time of Birth */}
          <TimePicker
            id="timeOfBirth"
            label="Time of Birth"
            value={formData.timeOfBirth}
            onChange={(e) => handleChange("timeOfBirth", e.target.value)}
            error={errors.timeOfBirth}
            required
            helperText="Enter in 24-hour format"
          />

          {/* Place of Birth */}
          <div>
            <Autocomplete
              id="placeOfBirth"
              label="Place of Birth"
              options={cityOptions}
              onOptionSelect={handleCityChange}
              error={errors.placeOfBirth}
              required
              placeholder="Type to search city..."
            />
            {selectedCity && INDIAN_CITIES[selectedCity] && (
              <div className="mt-2 px-3 py-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300">
                  <svg
                    className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {INDIAN_CITIES[selectedCity].lat.toFixed(4)}°N,{" "}
                    {INDIAN_CITIES[selectedCity].lon.toFixed(4)}°E
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Gender */}
          <RadioGroup
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={(value) => handleChange("gender", value as Gender)}
            name="gender"
            error={errors.gender}
            required
          />

          {/* Hidden fields for lat/long (auto-filled) */}
          <input type="hidden" name="latitude" value={formData.latitude} />
          <input type="hidden" name="longitude" value={formData.longitude} />
          <input type="hidden" name="timezone" value={formData.timezone} />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              isLoading={isLoading}
              size="lg"
              className="w-full min-h-[50px] sm:min-h-[52px] text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isLoading ? "Generating..." : "Generate Your Report"}
            </Button>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
              Your report will be ready in seconds
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
