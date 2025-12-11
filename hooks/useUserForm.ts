'use client'

import { useState } from 'react'
import type { BirthDetailsFormInput } from '@/lib/utils/validation'

interface UseUserFormReturn {
  formData: BirthDetailsFormInput
  updateField: <K extends keyof BirthDetailsFormInput>(
    field: K,
    value: BirthDetailsFormInput[K]
  ) => void
  resetForm: () => void
}

const initialFormData: BirthDetailsFormInput = {
  name: '',
  dateOfBirth: '',
  timeOfBirth: '',
  placeOfBirth: '',
  latitude: '',
  longitude: '',
  timezone: 'Asia/Kolkata',
  gender: 'male',
}

/**
 * Custom hook for managing birth details form state
 */
export function useUserForm(): UseUserFormReturn {
  const [formData, setFormData] = useState<BirthDetailsFormInput>(initialFormData)
  
  const updateField = <K extends keyof BirthDetailsFormInput>(
    field: K,
    value: BirthDetailsFormInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  
  const resetForm = () => {
    setFormData(initialFormData)
  }
  
  return {
    formData,
    updateField,
    resetForm,
  }
}

