import { handleCopyToClipboard } from '@/lib/utils'
import { Copy } from 'lucide-react'

export default function ColorPreviewWithCopy({
	color,
	type,
}: {
	color: string
	type: 'HEX' | 'RGB' | 'HSL' | 'OKLCH'
}) {
	return (
		<div
			className="card w-full  bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
			onClick={() => handleCopyToClipboard(color)}
		>
			<div className="card-body rounded-box bg-primary text-primary-content">
				<h4 className="font-semibold text-lg flex items-center justify-between">
					{type}
					<Copy className="h-4 w-4 opacity-50 hover:opacity-100" />
				</h4>
				<div className="font-mono text-xl text-primary-content">
					{color.toUpperCase()}
				</div>
				<div className="text-sm text-primary-content/70">
					{type === 'HEX' && 'Hexadecimal'}
					{type === 'RGB' && 'Red Green Blue'}
					{type === 'HSL' && 'Hue Saturation Lightness'}
					{type === 'OKLCH' && 'Oklch Color Space'}
				</div>
			</div>
		</div>
	)
}
