'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { birthDetailsSchema, type BirthDetailsFormInput } from '@/lib/utils/validation'
import { INDIAN_CITIES } from '@/lib/constants'
import type { Gender } from '@/lib/types'

interface BirthDetailsFormProps {
  onSubmit: (data: BirthDetailsFormInput) => Promise<void>
  isLoading?: boolean
}

export function BirthDetailsForm({ onSubmit, isLoading }: BirthDetailsFormProps) {
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
  
  const [errors, setErrors] = useState<Partial<Record<keyof BirthDetailsFormInput, string>>>({})
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
  
  const handleChange = (field: keyof BirthDetailsFormInput, value: string | Gender) => {
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
      const fieldErrors: Partial<Record<keyof BirthDetailsFormInput, string>> = {}
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
    <Card>
      <CardHeader>
        <CardTitle>Birth Details</CardTitle>
        <CardDescription>
          Enter your birth information to generate your personalized astrology report
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
            placeholder="Enter your full name"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              error={errors.dateOfBirth}
              required
              max={new Date().toISOString().split('T')[0]}
            />
            
            <Input
              label="Time of Birth"
              type="time"
              value={formData.timeOfBirth}
              onChange={(e) => handleChange('timeOfBirth', e.target.value)}
              error={errors.timeOfBirth}
              required
              helperText="24-hour format (HH:mm)"
            />
          </div>
          
          <Select
            label="Place of Birth"
            options={[{ value: '', label: 'Select a city' }, ...cityOptions]}
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            error={errors.placeOfBirth}
            required
          />
          
          {selectedCity && (
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Selected:</strong> {formData.placeOfBirth}
                <br />
                <strong>Coordinates:</strong> {formData.latitude}, {formData.longitude}
                <br />
                <strong>Timezone:</strong> {formData.timezone}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => handleChange('latitude', e.target.value)}
              error={errors.latitude}
              required
              disabled={!!selectedCity}
              helperText={selectedCity ? 'Auto-filled from city selection' : 'Enter latitude (-90 to 90)'}
            />
            
            <Input
              label="Longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => handleChange('longitude', e.target.value)}
              error={errors.longitude}
              required
              disabled={!!selectedCity}
              helperText={selectedCity ? 'Auto-filled from city selection' : 'Enter longitude (-180 to 180)'}
            />
          </div>
          
          <Select
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value as Gender)}
            error={errors.gender}
            required
          />
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              isLoading={isLoading} 
              size="lg"
              className="w-full sm:w-auto min-h-[52px]"
            >
              Generate Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

