'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CustomDatePicker } from '@/components/ui/DatePicker'
import { TimePicker } from '@/components/ui/TimePicker'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/Card'
import {
  birthDetailsSchema,
  type BirthDetailsFormInput,
} from '@/lib/utils/validation'
import { INDIAN_CITIES } from '@/lib/constants'
import type { Gender } from '@/lib/types'

interface BirthDetailsFormProps {
  onSubmit: (data: BirthDetailsFormInput) => Promise<void>
  isLoading?: boolean
}

export function BirthDetailsForm({
  onSubmit,
  isLoading,
}: BirthDetailsFormProps) {
  const [formData, setFormData] = useState<BirthDetailsFormInput>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    latitude: '',
    longitude: '',
    timezone: 'Asia/Kolkata',
    gender: 'male',
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof BirthDetailsFormInput, string>>
  >({})
  const [selectedCity, setSelectedCity] = useState<string>('')

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName)
    if (cityName && INDIAN_CITIES[cityName]) {
      const city = INDIAN_CITIES[cityName]
      setFormData((prev) => ({
        ...prev,
        placeOfBirth: cityName,
        latitude: city.lat.toString(),
        longitude: city.lon.toString(),
        timezone: city.tz,
      }))
      setErrors((prev) => ({
        ...prev,
        placeOfBirth: undefined,
        latitude: undefined,
        longitude: undefined,
        timezone: undefined,
      }))
    }
  }

  const handleChange = (
    field: keyof BirthDetailsFormInput,
    value: string | Gender
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const result = birthDetailsSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BirthDetailsFormInput, string>> =
        {}
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof BirthDetailsFormInput
        fieldErrors[field] = error.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    await onSubmit(result.data)
  }

  const cityOptions = Object.keys(INDIAN_CITIES).map((city) => ({
    value: city,
    label: city,
  }))

  const genderOptions: Array<{ value: Gender; label: string }> = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ]

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
            placeholder="Enter your full name"
          />

          {/* Date and Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <CustomDatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => handleChange('dateOfBirth', date)}
              error={errors.dateOfBirth}
              required
              maxDate={new Date()}
              placeholder="Select your birth date"
            />

            <TimePicker
              label="Time of Birth"
              value={formData.timeOfBirth}
              onChange={(e) => handleChange('timeOfBirth', e.target.value)}
              error={errors.timeOfBirth}
              required
              helperText="24-hour format (HH:mm)"
            />
          </div>

          {/* Place of Birth */}
          <Select
            label="Place of Birth"
            options={[{ value: '', label: 'Select a city' }, ...cityOptions]}
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            error={errors.placeOfBirth}
            required
          />

          {/* City Selection Feedback */}
          {selectedCity && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
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
                  <p className="text-sm font-semibold text-blue-900">
                    {formData.placeOfBirth}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Coordinates and timezone automatically configured
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Gender */}
          <Select
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value as Gender)}
            error={errors.gender}
            required
          />

          {/* Hidden fields for lat/long (auto-filled) */}
          <input type="hidden" name="latitude" value={formData.latitude} />
          <input type="hidden" name="longitude" value={formData.longitude} />
          <input type="hidden" name="timezone" value={formData.timezone} />

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <Button
              type="submit"
              isLoading={isLoading}
              size="lg"
              className="w-full min-h-[56px] text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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
  )
}
