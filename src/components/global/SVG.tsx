import { useEffect, useState } from "react"

interface SVGProps {
  src: string
  color?: string | ((hover: boolean ) => string)
	className?: string
}

const SVG = ({ src, color, className }: SVGProps) => {
  const [modifiedSvg, setModifiedSvg] = useState<string>('');
	const [colorToSet, setColorToSet] = useState<string>('')

	useEffect(() => {
		if (color && typeof color === 'function') {
			setColorToSet(color(false))
		}
	}, [color])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(src)
        const svgText = await response.text()

				let modifiedSvgText = svgText.replace(
					/fill="(.*?)"/g,
					`fill="${color !== undefined
						? (typeof color === 'string' ? color : colorToSet)
						: undefined}"`
				)

        if (color === undefined) {
					modifiedSvgText = svgText
				}

        setModifiedSvg(modifiedSvgText)
      }
      catch (error) {
				console.error('Error fetching SVG:', error)
			}
    })()
  }, [src, color, colorToSet])

  const dataUrl = `data:image/svg+xml;base64,${btoa(modifiedSvg)}`

  return <img
		className={className}
		src={dataUrl}
		onMouseOver={() => {
			if (color && typeof color === 'function') {
				setColorToSet(color(true))
			}
		}}
		onMouseLeave={() => {
			if (color && typeof color === 'function') {
				setColorToSet(color(false))
			}
		}}
	/>
}
// eslint-disable-next-line react-refresh/only-export-components
export default SVG
