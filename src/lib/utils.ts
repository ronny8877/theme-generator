/* eslint-disable @typescript-eslint/no-unused-expressions */
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function handleCopyToClipboard(text: string) {
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard api method'
		navigator.clipboard.writeText(text)
		return toast.success('Copied to clipboard')
	} else {
		// text area method
		const textArea = document.createElement('textarea')
		textArea.value = text
		// make the textarea out of viewport
		textArea.style.position = 'absolute'
		textArea.style.left = '-999999px'
		textArea.style.top = '-999999px'
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		return new Promise<void>((res, rej) => {
			// here the magic happens
			document.execCommand('copy') ? res() : rej()
			textArea.remove()
		})
	}
}
