'use client'

import React from 'react'
import { ColorPicker } from '@/components/ui/color-picker'
import { UploadCloud, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type TemplateKey = 'mono' | 'grayscale' | 'redhot' | 'oceanic' | 'sunset'

type Props = {
  className?: string
  onColor: (hex: string) => void
  onUpload: (file: File) => void
  onTemplate: (key: TemplateKey) => void
}

export default function TopBar({ className, onColor, onUpload, onTemplate }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [color, setColor] = React.useState('#7c3aed')
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className={cn('flex items-center gap-3 w-full', className)}>
      {/* Color picker (compact) */}
      <div className="flex items-center gap-2 p-2 rounded-xl border border-base-300 bg-base-100">
        <ColorPicker
          value={color}
          onChange={(hex) => {
            setColor(hex)
            onColor(hex)
          }}
          size="sm"
        />
        <span className="text-sm font-medium">Pick color</span>
      </div>

      {/* Upload image */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && onUpload(e.target.files[0])}
      />
      <button className="btn btn-outline btn-sm rounded-xl" onClick={() => inputRef.current?.click()}>
        <UploadCloud className="w-4 h-4" /> Upload image
      </button>

      {/* Prebuilt templates dropdown */}
      <div className="relative" ref={menuRef}>
        <button className="btn btn-ghost btn-sm rounded-xl" onClick={() => setOpen((v) => !v)}>
          Prebuilt <ChevronDown className="w-3 h-3 ml-1" />
        </button>
        <div
          className={cn(
            'absolute z-30 mt-2 w-56 rounded-xl border border-base-300 bg-base-100 shadow-xl p-1',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <ul className="menu menu-sm">
            <li><button onClick={() => onTemplate('mono')}>Monochrome</button></li>
            <li><button onClick={() => onTemplate('grayscale')}>Grayscale</button></li>
            <li><button onClick={() => onTemplate('redhot')}>Red Hot</button></li>
            <li><button onClick={() => onTemplate('oceanic')}>Oceanic</button></li>
            <li><button onClick={() => onTemplate('sunset')}>Sunset</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
