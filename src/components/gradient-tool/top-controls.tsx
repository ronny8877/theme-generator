'use client'

import React from 'react'
import { EnhancedColorInput } from '@/components/color-lab/enhanced-color-input'
import { extractColorsFromImage } from '@/lib/image-color-extraction'
import {
  GradientConfig,
  createGradientStop,
  generateRandomGradient,
} from '@/lib/gradient-utils'
import { Sparkles, UploadCloud, Palette } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@nanostores/react'
import { $activeTheme } from '@/store/nano-store'

type Props = {
  onGenerate: (list: GradientConfig[], reason?: string) => void
}

export default function TopControls({ onGenerate }: Props) {
  const theme = useStore($activeTheme)
  const [c1, setC1] = React.useState('#7c3aed')
  const [c2, setC2] = React.useState('#06b6d4')
  const [mode, setMode] = React.useState<'duo' | 'mono'>('duo')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const buildFromColors = () => {
    const out: GradientConfig[] = []
    const mk = (name: string, dir: number, stops: [string, number][]) => ({
      id: `${name}-${dir}-${Date.now()}`,
      name,
      type: 'linear' as const,
      direction: dir,
      stops: stops.map(([color, pos]) => createGradientStop(color, pos)),
      createdAt: new Date(),
    })
    if (mode === 'mono') {
      out.push(
        mk('Monochrome soft', 45, [[c1, 0], [c1 + '80', 100]]),
        mk('Monochrome hard', 135, [[c1, 0], [c1, 50], [c1 + '00', 100]])
      )
    } else {
      out.push(
        mk('Primary → Secondary', 45, [[c1, 0], [c2, 100]]),
        mk('Crossfade', 135, [[c1, 0], [c2, 50], [c1, 100]]),
        mk('Accent band', 90, [[c1, 0], [c2, 50], [c1, 100]])
      )
    }
    onGenerate(out, 'colors')
  }

  const buildFromTheme = () => {
    const p = theme.colors['--color-primary']
    const s = theme.colors['--color-secondary']
    const a = theme.colors['--color-accent']
    const out: GradientConfig[] = [
      {
        id: `theme-ps-${Date.now()}`,
        name: 'Theme Primary → Secondary',
        type: 'linear',
        direction: 135,
        stops: [createGradientStop(p, 0), createGradientStop(s, 100)],
        createdAt: new Date(),
      },
      {
        id: `theme-pa-${Date.now()}`,
        name: 'Theme Primary → Accent',
        type: 'linear',
        direction: 45,
        stops: [createGradientStop(p, 0), createGradientStop(a, 100)],
        createdAt: new Date(),
      },
      {
        id: `theme-tri-${Date.now()}`,
        name: 'Theme Tri-blend',
        type: 'linear',
        direction: 90,
        stops: [
          createGradientStop(p, 0),
          createGradientStop(a, 50),
          createGradientStop(s, 100),
        ],
        createdAt: new Date(),
      },
    ]
    onGenerate(out, 'theme')
  }

  const onUpload = async (f: File) => {
    try {
      const analysis = await extractColorsFromImage(f, 6, 6)
      const colors = analysis.dominantColors.map((c) => c.hex)
      const list: GradientConfig[] = []
      for (let i = 0; i < colors.length - 1; i++) {
        list.push({
          id: `img-${i}-${Date.now()}`,
          name: `From image ${i + 1}`,
          type: 'linear',
          direction: 135,
          stops: [createGradientStop(colors[i], 0), createGradientStop(colors[i + 1], 100)],
          createdAt: new Date(),
        })
      }
      if (list.length === 0) list.push(generateRandomGradient('linear'))
      onGenerate(list, 'image')
      toast.success('Generated gradients from image')
    } catch {
      toast.error('Failed to extract colors')
    }
  }

  return (
    <div className="card border border-base-300 shadow-sm bg-base-100">
      <div className="card-body p-4 gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="font-medium">Play with colors</div>
          <div className="tabs tabs-boxed bg-base-200">
            <button className={`tab tab-sm ${mode==='duo'?'tab-active':''}`} onClick={()=>setMode('duo')}>Duo</button>
            <button className={`tab tab-sm ${mode==='mono'?'tab-active':''}`} onClick={()=>setMode('mono')}>Mono</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <EnhancedColorInput value={c1} onChange={setC1} size="sm" />
          {mode === 'duo' && <EnhancedColorInput value={c2} onChange={setC2} size="sm" />}
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary btn-sm" onClick={buildFromColors}>
            <Sparkles className="w-4 h-4" /> Generate from colors
          </button>
          <button className="btn btn-ghost btn-sm" onClick={buildFromTheme}>
            <Palette className="w-4 h-4" /> From theme
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
          />
          <button className="btn btn-outline btn-sm" onClick={() => inputRef.current?.click()}>
            <UploadCloud className="w-4 h-4" /> Upload image
          </button>
        </div>
      </div>
    </div>
  )
}
