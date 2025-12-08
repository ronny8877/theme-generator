'use client'

import React from 'react'
import GradientExplorer from './gradient-tool/gradient-explorer'

interface EnhancedGradientToolProps {
  className?: string
}

export const EnhancedGradientTool: React.FC<EnhancedGradientToolProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <GradientExplorer />
    </div>
  )
}

export default EnhancedGradientTool
