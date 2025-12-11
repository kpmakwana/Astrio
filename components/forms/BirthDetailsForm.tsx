"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CustomDatePicker } from "@/components/ui/DatePicker";
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
      setErrors(fieldErrors);
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
    <Card className="shadow-xl border border-gray-200 bg-white">
      <CardHeader className="text-center pb-6 sm:pb-8 pt-6 sm:pt-8">
        <div className="mb-4">
          <span className="text-5xl sm:text-6xl">✨</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Birth Details
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Enter your birth information to generate your personalized astrology report
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Full Name */}
          <div>
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              required
              placeholder="Enter your full name"
              className="text-base"
            />
          </div>

          {/* Date and Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <CustomDatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => handleChange("dateOfBirth", date)}
              error={errors.dateOfBirth}
              required
              maxDate={new Date()}
              placeholder="Select your birth date"
            />

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Time of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={(e) => handleChange("timeOfBirth", e.target.value)}
                  className={`
                    w-full px-4 py-3 sm:py-2.5 rounded-lg border transition-colors text-base
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    ${
                      errors.timeOfBirth
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }
                    touch-manipulation
                    [&::-webkit-calendar-picker-indicator]:absolute
                    [&::-webkit-calendar-picker-indicator]:right-3
                    [&::-webkit-calendar-picker-indicator]:w-5
                    [&::-webkit-calendar-picker-indicator]:h-5
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:opacity-60
                    [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                  `}
                  aria-invalid={errors.timeOfBirth ? "true" : "false"}
                />
                {!formData.timeOfBirth && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {errors.timeOfBirth && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.timeOfBirth}
                </p>
              )}
              {!errors.timeOfBirth && (
                <p className="mt-1.5 text-sm text-gray-500">
                  24-hour format (HH:mm)
                </p>
              )}
            </div>
          </div>

          {/* Place of Birth */}
          <div>
            <Select
              label="Place of Birth"
              options={[{ value: "", label: "Select a city" }, ...cityOptions]}
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              error={errors.placeOfBirth}
              required
            />
            {selectedCity && (
              <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900">
                      {formData.placeOfBirth}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Coordinates and timezone automatically set
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gender */}
          <div>
            <Select
              label="Gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value as Gender)}
              error={errors.gender}
              required
            />
          </div>

          {/* Hidden fields for lat/long (auto-filled) */}
          <input type="hidden" name="latitude" value={formData.latitude} />
          <input type="hidden" name="longitude" value={formData.longitude} />
          <input type="hidden" name="timezone" value={formData.timezone} />

          {/* Submit Button */}
          <div className="pt-6 sm:pt-8 border-t border-gray-100 mt-6 sm:mt-8">
            <Button
              type="submit"
              isLoading={isLoading}
              size="lg"
              className="w-full min-h-[56px] text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-primary-600 hover:bg-primary-700"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Your Report...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  Generate Your Report
                </span>
              )}
            </Button>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
              Your personalized astrology report will be ready in seconds
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
