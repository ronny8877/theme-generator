'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import GradientCard from './gradient-card'
import FullscreenEditor from './fullscreen-editor'
import { GradientConfig } from '@/lib/gradient-utils'
import { generateGradientsFromColors, TEMPLATE_COLORS } from '@/lib/gradient-generation'
import { decodeGradientParam, encodeGradientParam } from '@/lib/gradient-share'
import { Share2, Trash2, Plus, Palette, Shuffle } from 'lucide-react'
import { toast } from 'sonner'
import { extractColorsFromImage } from '@/lib/image-color-extraction'

export default function GradientExplorer() {
  const search = useSearchParams()
  
  // Create "Our gradients" from theme-based color arrays
  const [ourGradients] = React.useState<GradientConfig[]>(() => {
    const themeGradients: GradientConfig[] = []
    
    // Generate gradients from each theme's color array
    Object.entries(TEMPLATE_COLORS).forEach(([themeName, colors]) => {
      if (colors.length >= 2) {
        const generated = generateGradientsFromColors([...colors], { 
          liberty: 0.3, // modest creativity for theme consistency
          count: 4, // fewer per theme to avoid overwhelming
          types: ['linear', 'radial']
        })
        
        // Label gradients with theme name
        generated.forEach((g, index) => {
          g.name = `${themeName} ${index + 1}`
          g.id = `theme-${themeName}-${index}`
        })
        
        themeGradients.push(...generated)
      }
    })
    
    return themeGradients
  })
  
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<GradientConfig | null>(null)
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)
  const [palette, setPalette] = React.useState<string[]>([])
  const [generated, setGenerated] = React.useState<GradientConfig[]>([])
  const [tab, setTab] = React.useState<'our' | 'gen'>('our')
  
  // User input colors (up to 3)
  const [userColors, setUserColors] = React.useState<string[]>(['#6366f1', '#8b5cf6', '#06b6d4'])
  const [liberty, setLiberty] = React.useState(0.5)

  // Handle ?g= param to open editor immediately
  React.useEffect(() => {
    const g = search?.get('g')
    const decoded = decodeGradientParam(g)
    if (decoded) {
      setSelected(decoded)
      setOpen(true)
    }
  }, [search])

  const onOpen = (g: GradientConfig) => {
    setSelected(g)
    setOpen(true)
  }

  const generateFromUserColors = () => {
    if (userColors.length === 0) return
    
    const newGradients = generateGradientsFromColors(userColors, {
      liberty,
      count: 8,
      types: ['linear', 'radial', 'conic']
    })
    
    // Label with timestamp
    newGradients.forEach((g, index) => {
      g.name = `Generated ${index + 1}`
      g.id = `user-${Date.now()}-${index}`
    })
    
    setGenerated(prev => [...newGradients, ...prev])
    setTab('gen')
    
    if (newGradients[0]) onOpen(newGradients[0])
  }

  const shareSelected = () => {
    if (!selected) return
    const param = encodeGradientParam(selected)
    const url = `${window.location.origin}/gradient?g=${encodeURIComponent(param)}`
    navigator.clipboard.writeText(url).then(() => toast.success('Share link copied'))
  }

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...userColors]
    newColors[index] = color
    setUserColors(newColors)
  }

  const addColorInput = () => {
    if (userColors.length < 3) {
      setUserColors([...userColors, '#8b5cf6'])
    }
  }

  const removeColorInput = (index: number) => {
    if (userColors.length > 1) {
      const newColors = userColors.filter((_, i) => i !== index)
      setUserColors(newColors)
    }
  }

  const handleTopUpload = async (file: File) => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    try {
      const analysis = await extractColorsFromImage(file, 5, 6)
      const cols = analysis.dominantColors.slice(0, 4).map((c) => c.hex)
      setPalette(cols)
      
      // Use new generation algorithm
      const newGradients = generateGradientsFromColors(cols, {
        liberty: 0.4,
        count: 6,
        types: ['linear', 'radial']
      })
      
      newGradients.forEach((g, index) => {
        g.name = `Image ${index + 1}`
        g.id = `img-${Date.now()}-${index}`
      })
      
      setGenerated(prev => [...newGradients, ...prev])
      setTab('gen')
    } catch {
      toast.error('Could not extract colors')
    }
  }

  const generateFromPalette = () => {
    if (palette.length < 2) return
    
    const newGradients = generateGradientsFromColors(palette, {
      liberty: 0.6,
      count: 8,
      types: ['linear', 'radial', 'conic']
    })
    
    newGradients.forEach((g, index) => {
      g.name = `Palette ${index + 1}`
      g.id = `pal-${Date.now()}-${index}`
    })
    
    setGenerated(prev => [...newGradients, ...prev])
    setTab('gen')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-base-300 sticky top-0 z-20 bg-base-100/90 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Gradient Studio</h1>
            <p className="text-sm text-base-content/60">Generate from colors or images. Edit, share, export.</p>
          </div>
          {open && (
            <button className="btn btn-outline btn-sm rounded-xl" onClick={shareSelected}>
              <Share2 className="w-4 h-4" /> Share
            </button>
          )}
        </div>
      </div>

      {/* Color Input Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="rounded-2xl border border-base-300 p-6 bg-base-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5" />
            <h2 className="text-lg font-medium">Generate from Colors</h2>
          </div>
          
          {/* Color Inputs */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {userColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="w-12 h-12 rounded-xl border border-base-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="input input-sm input-bordered w-24 font-mono text-xs"
                  placeholder="#000000"
                />
                {userColors.length > 1 && (
                  <button 
                    onClick={() => removeColorInput(index)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            {userColors.length < 3 && (
              <button 
                onClick={addColorInput}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                <Plus className="w-4 h-4" /> Add Color
              </button>
            )}
          </div>
          
          {/* Liberty Slider */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Creativity Level: {liberty === 0 ? 'Strict' : liberty === 1 ? 'Creative' : 'Balanced'}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={liberty}
              onChange={(e) => setLiberty(parseFloat(e.target.value))}
              className="range range-primary"
            />
            <div className="flex justify-between text-xs text-base-content/60 mt-1">
              <span>Strict (use exact colors)</span>
              <span>Creative (generate harmonies)</span>
            </div>
          </div>
          
          {/* Generate Button */}
          <button 
            onClick={generateFromUserColors}
            className="btn btn-primary rounded-xl"
          >
            <Shuffle className="w-4 h-4" /> Generate Gradients
          </button>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="container mx-auto px-4 pb-6">
        <div className="rounded-2xl border border-base-300 p-6 bg-base-100 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Generate from Image</h2>
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleTopUpload(file)
            }}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          
          {/* Image + palette preview */}
          {imageUrl && (
            <div className="mt-4 rounded-xl border border-base-300 p-4 bg-base-50">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img src={imageUrl} alt="Uploaded" className="w-32 h-24 object-cover rounded-lg border border-base-300" />
                  <button 
                    className="btn btn-ghost btn-xs absolute -top-2 -right-2 bg-base-100 rounded-full" 
                    onClick={() => { setImageUrl(null); setPalette([]) }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Extracted Colors</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {palette.map((hex) => (
                      <div key={hex} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-base-300 bg-base-100">
                        <div className="w-4 h-4 rounded border" style={{ background: hex }} />
                        <span className="font-mono text-xs">{hex}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary btn-sm rounded-lg" onClick={generateFromPalette}>
                    Generate from Palette
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Our vs Generated */}
      <div className="container mx-auto px-4 pb-4">
        <div className="tabs tabs-boxed bg-base-200 inline-flex">
          <button 
            className={`tab ${tab==='our'?'tab-active':''}`} 
            onClick={()=>setTab('our')}
          >
            Our Gradients ({ourGradients.length})
          </button>
          <button 
            className={`tab ${tab==='gen'?'tab-active':''}`} 
            onClick={()=>setTab('gen')}
          >
            Generated ({generated.length})
          </button>
        </div>
      </div>

      {/* Grid lists */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-visible">
          {(tab === 'our' ? ourGradients : generated).map((g) => (
            <GradientCard key={g.id} gradient={g} onOpen={onOpen} />
          ))}
        </div>
        
        {/* Empty state */}
        {tab === 'gen' && generated.length === 0 && (
          <div className="text-center py-12">
            <div className="text-base-content/40 mb-4">
              <Palette className="w-12 h-12 mx-auto mb-2" />
              <p>No generated gradients yet</p>
              <p className="text-sm">Use the color inputs or upload an image to generate gradients</p>
            </div>
          </div>
        )}
      </div>

      <FullscreenEditor open={open} gradient={selected} onOpenChange={setOpen} />
    </div>
  )
}
