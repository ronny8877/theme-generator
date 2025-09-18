'use client'

import React from 'react'
import { Copy, MoreHorizontal, Check, Download, Wrench, Edit3 } from 'lucide-react'
import { GradientConfig, generateGradientCSS } from '@/lib/gradient-utils'
import { toTailwindBgClass, downloadGradientImage, encodeGradientParam } from '@/lib/gradient-share'
import { toast } from 'sonner'

type Props = {
  gradient: GradientConfig
  onOpen: (g: GradientConfig) => void
}

export default function GradientCard({ gradient, onOpen }: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [copied, setCopied] = React.useState<null | 'css' | 'tw'>(null)
  const [isHovered, setIsHovered] = React.useState(false)
  const css = generateGradientCSS(gradient)

  const copy = async (text: string, kind: 'css' | 'tw') => {
    await navigator.clipboard.writeText(text)
    setCopied(kind)
    setTimeout(() => setCopied(null), 1200)
    toast.success('Copied')
  }

  const handleClick = () => {
    onOpen(gradient)
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Gradient Display */}
      <div 
        className="relative w-full h-32 cursor-pointer"
        style={{ background: css }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Open ${gradient.name}`}
      >
        {/* Hover Overlay */}
        <div className={`
          absolute inset-0 
          bg-black/40 backdrop-blur-[1px]
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}>
          <div className="
            flex items-center gap-2 
            px-4 py-2 
            bg-white/20 backdrop-blur-md
            border border-white/30
            rounded-lg
            text-white
            transform transition-all duration-200
            hover:bg-white/30 hover:scale-105
          ">
            <Edit3 className="w-4 h-4" />
            <span className="text-sm font-medium">Click to Edit</span>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="truncate">
          <div className="text-sm font-medium truncate">{gradient.name}</div>
          <div className="text-xs text-base-content/60 capitalize">
            {gradient.type} • {gradient.stops.length} stops
          </div>
        </div>
        <div className="relative z-10">
          <button
            className="btn btn-ghost btn-sm opacity-60 group-hover:opacity-100 transition-opacity"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 top-8 z-20 w-56 rounded-xl border border-base-300 bg-base-100 shadow-xl transition-all duration-200 ${
              menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <ul className="menu menu-sm">
              <li>
                <button onClick={() => { onOpen(gradient); setMenuOpen(false) }}>
                  <Wrench className="w-3 h-3" /> Open in editor
                </button>
              </li>
              <li>
                <button onClick={() => copy(`background: ${css};`, 'css')}>
                  {copied === 'css' ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy CSS
                </button>
              </li>
              <li>
                <button onClick={() => copy(toTailwindBgClass(gradient), 'tw')}>
                  {copied === 'tw' ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy Tailwind class
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const p = encodeGradientParam(gradient)
                    const url = `${window.location.origin}/gradient?g=${encodeURIComponent(p)}`
                    navigator.clipboard.writeText(url)
                    toast.success('Share link copied')
                    setMenuOpen(false)
                  }}
                >
                  <Copy className="w-3 h-3" /> Copy share link
                </button>
              </li>
              <li>
                <button onClick={() => { downloadGradientImage(gradient); setMenuOpen(false) }}>
                  <Download className="w-3 h-3" /> Download image
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}
