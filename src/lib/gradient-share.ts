import { compressToBase64, decompressFromBase64 } from 'lz-string'
import {
  GradientConfig,
  generateGradientCSS,
  createPresetGradients,
} from '@/lib/gradient-utils'

// Encode a GradientConfig into a compact URL-safe param
export function encodeGradientParam(gradient: GradientConfig): string {
  const json = JSON.stringify({
    t: gradient.type,
    d: gradient.direction,
    s: gradient.stops.map((s) => [s.color, s.position]) as [string, number][],
    n: gradient.name?.slice(0, 24) || 'g',
  })
  const b64 = compressToBase64(json)
  return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

export function decodeGradientParam(param?: string | null): GradientConfig | null {
  if (!param) return null
  // Support simple ids to reference built-in presets by id
  const presets = createPresetGradients()
  const preset = presets.find((p) => p.id === param)
  if (preset) return preset

  // Support simple shorthand: linear-<hex>-<hex>[-<hex>]
  const simple = /^([a-z]+)-([0-9a-fA-F]{3,8})(?:-([0-9a-fA-F]{3,8}))?(?:-([0-9a-fA-F]{3,8}))?$/.exec(param)
  if (simple) {
    const type = (simple[1] as GradientConfig['type']) || 'linear'
    const colors = [simple[2], simple[3], simple[4]].filter(Boolean) as string[]
    if (colors.length >= 2) {
      return {
        id: `g-simple-${Date.now()}`,
        name: 'Shared Gradient',
        type: type === 'radial' || type === 'conic' ? type : 'linear',
        direction: 135,
        stops: colors.map((hex, i, arr) => ({
          id: `stop-${i}-${Math.random().toString(36).slice(2, 7)}`,
          color: hex.startsWith('#') ? hex : `#${hex}`,
          position: (i / (arr.length - 1)) * 100,
        })),
        createdAt: new Date(),
      }
    }
  }

  try {
    let s = param.replaceAll('-', '+').replaceAll('_', '/')
    while (s.length % 4) s += '='
    const raw = decompressFromBase64(s)
    if (!raw) return null
    const obj = JSON.parse(raw) as {
      t: GradientConfig['type']
      d: GradientConfig['direction']
      s: [string, number][]
      n?: string
    }
    return {
      id: `g-${Date.now()}`,
      name: obj.n || 'Shared Gradient',
      type: obj.t,
      direction: obj.d,
      stops: obj.s.map(([color, position], i) => ({
        id: `stop-${i}-${Math.random().toString(36).slice(2, 7)}`,
        color,
        position,
      })),
      createdAt: new Date(),
    }
  } catch {
    return null
  }
}

// Tailwind arbitrary value class for a gradient
export function toTailwindBgClass(gradient: GradientConfig) {
  const css = generateGradientCSS(gradient)
  // Convert to bg-[linear-gradient(...)] with commas/spaces escaped as Tailwind expects
  // Replace spaces with underscores and commas with '_,' while keeping parentheses
  const safe = css.replace(/ /g, '_').replace(/,/g, ',_')
  return `bg-[${safe}]`
}

// Download as image (png or svg)
export async function downloadGradientImage(
  gradient: GradientConfig,
  opts: { format?: 'png' | 'svg'; width?: number; height?: number; filename?: string } = {}
) {
  const { format = 'png', width = 1600, height = 900 } = opts
  const name = (opts.filename || gradient.name || 'gradient')
    .toLowerCase()
    .replace(/\s+/g, '-')

  // Build SVG with rect filled by CSS gradient via foreignObject technique
  const css = generateGradientCSS(gradient)
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject x="0" y="0" width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;background:${css};"></div>
  </foreignObject>
</svg>`

  const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
  const svgUrl = URL.createObjectURL(svgBlob)

  if (format === 'svg') {
    triggerDownload(svgBlob, `${name}.svg`)
    URL.revokeObjectURL(svgUrl)
    return
  }

  // Rasterize to PNG
  await new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) triggerDownload(blob, `${name}.png`)
        URL.revokeObjectURL(svgUrl)
        resolve()
      })
    }
    img.src = svgUrl
  })
}

function triggerDownload(blob: Blob, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  }, 0)
}
