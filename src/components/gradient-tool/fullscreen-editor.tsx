'use client'

import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { InteractiveGradientEditor } from '@/components/gradient-editor/interactive-gradient-editor'
import { GradientConfig } from '@/lib/gradient-utils'

type Props = {
  open: boolean
  gradient?: GradientConfig | null
  onOpenChange: (v: boolean) => void
}

export default function FullscreenEditor({ open, gradient, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(98vw,1200px)] h-[min(92vh,900px)] p-0 bg-base-100 border-base-300 rounded-3xl overflow-hidden" showCloseButton>
        <InteractiveGradientEditor className="h-full" initialGradient={gradient || undefined} />
      </DialogContent>
    </Dialog>
  )
}
