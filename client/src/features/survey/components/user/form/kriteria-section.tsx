'use client'

import { useEffect, useRef, useState } from 'react'
import { isEqual } from 'lodash'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormGroup } from '@/components/umum/form/form-group'
import { Plus, X } from 'lucide-react'

interface Kriteria {
  region?: string[]
  status?: string[]
  usia?: number[]
  jenis_kelamin?: string
}

interface KriteriaSectionProps {
  kriteria: Kriteria
  onChange: (updated: Kriteria) => void
  disabled?: boolean
}

export function KriteriaSection({ kriteria, onChange, disabled = false }: KriteriaSectionProps) {
  const [region, setRegion] = useState<string[]>(kriteria.region || [])
  const [regionInput, setRegionInput] = useState('')

  const [status, setStatus] = useState<string[]>(kriteria.status || [])
  const [statusInput, setStatusInput] = useState('')

  const [ageMin, setAgeMin] = useState<number | undefined>(kriteria.usia?.[0])
  const [ageMax, setAgeMax] = useState<number | undefined>(kriteria.usia?.[kriteria.usia.length - 1])
  const [jenis_kelamin, setJenisKelamin] = useState<string | undefined>(kriteria.jenis_kelamin)

  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    let usia: number[] | undefined = undefined
    if (typeof ageMin === 'number' && typeof ageMax === 'number' && ageMin <= ageMax) {
      usia = Array.from({ length: ageMax - ageMin + 1 }, (_, i) => ageMin + i)
    }

    const next: Kriteria = { region, status, usia, jenis_kelamin }

    if (!isEqual(next, kriteria)) {
      onChange(next)
    }
  }, [region, status, ageMin, ageMax, jenis_kelamin])

  const handleAdd = (value: string, setter: (val: string[]) => void, current: string[], reset: () => void) => {
    const trimmed = value.trim()
    if (!trimmed || current.includes(trimmed)) return
    setter([...current, trimmed])
    reset()
  }

  const handleRemove = (index: number, setter: (val: string[]) => void, current: string[]) => {
    setter(current.filter((_, i) => i !== index))
  }

  const handleAgeInput = (value: string, setter: (n: number | undefined) => void) => {
    const number = parseInt(value, 10)
    if (value === '') setter(undefined)
    else if (!isNaN(number) && number >= 1 && number <= 100) setter(number)
  }

  return (
    <fieldset className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <FormGroup label="Region Domisili" htmlFor="region-input">
        <div className="flex gap-2">
          <Input
            id="region-input"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
            className="w-48 sm:text-sm text-xs"
            placeholder="Tambah region"
            disabled={disabled}
          />
          <Button
            type="button"
            variant="outline"
            className="text-[#232323] hover:opacity-80"
            onClick={() =>
              handleAdd(regionInput, setRegion, region, () => setRegionInput(''))
            }
            disabled={disabled}
          >
            <Plus />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {region.map((item, index) => (
            <span
              key={index}
              className="border rounded px-2 py-1 sm:text-sm text-xs flex items-center"
            >
              {item}
              {!disabled && (
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemove(index, setRegion, region)}
                >
                  <X />
                </button>
              )}
            </span>
          ))}
        </div>
      </FormGroup>

      <FormGroup label="Status Latar Belakang" htmlFor="status-input">
        <div className="flex gap-2">
          <Input
            id="status-input"
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
            className="w-48 sm:text-sm text-xs"
            placeholder="Tambah status"
            disabled={disabled}
          />
          <Button
            type="button"
            variant="outline"
            className="text-[#232323] hover:opacity-80"
            onClick={() =>
              handleAdd(statusInput, setStatus, status, () => setStatusInput(''))
            }
            disabled={disabled}
          >
            <Plus />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {status.map((item, index) => (
            <span
              key={index}
              className="border rounded px-2 py-1 sm:text-sm text-xs flex items-center"
            >
              {item}
              {!disabled && (
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemove(index, setStatus, status)}
                >
                  <X />
                </button>
              )}
            </span>
          ))}
        </div>
      </FormGroup>

      <FormGroup label="Umur (rentang usia)" htmlFor="umur-min">
        <div className="flex gap-4 items-center ">
          <Input
            id="umur-min"
            type="number"
            placeholder="Min"
            className="w-20 sm:text-sm text-xs"
            min={1}
            max={100}
            value={ageMin ?? ''}
            onChange={(e) => handleAgeInput(e.target.value, setAgeMin)}
            disabled={disabled}
          />
          <span className="text-xl">–</span>
          <Input
            type="number"
            placeholder="Max"
            className="w-20 sm:text-sm text-xs"
            min={1}
            max={100}
            value={ageMax ?? ''}
            onChange={(e) => handleAgeInput(e.target.value, setAgeMax)}
            disabled={disabled}
          />
        </div>
        {ageMin && ageMax && ageMin > ageMax && (
          <p className="text-sm text-red-500 mt-1">
            Umur minimum tidak boleh lebih besar dari maksimum.
          </p>
        )}
      </FormGroup>

      <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
        <select
          id="jenis_kelamin"
          className="border bg-none rounded px-2 py-1 sm:text-sm text-xs"
          value={jenis_kelamin ?? ''}
          onChange={(e) => setJenisKelamin(e.target.value || undefined)}
          disabled={disabled}
        >
          <option className="text-[#232323]" value="">
            Semua
          </option>
          <option className="text-[#232323]" value="laki-laki">
            Laki-laki
          </option>
          <option className="text-[#232323]" value="perempuan">
            Perempuan
          </option>
        </select>
      </FormGroup>
    </fieldset>
  )
}
