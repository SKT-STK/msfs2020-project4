import { useEffect, useState } from "react"

interface SVGProps {
  src: string
  color?: string
	className?: string
}

const Svg = ({ src, color, className }: SVGProps) => {
  const [modifiedSvg, setModifiedSvg] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(src)
        const svgText = await response.text()

				let modifiedSvgText = svgText.replace(/fill="(.*?)"/g, `fill="${color}"`)

        if (color === undefined) {
					modifiedSvgText = svgText
				}

        setModifiedSvg(modifiedSvgText)
      }
      catch (error) {
				console.error('Error fetching SVG:', error)
			}
    })()
  }, [src, color])

  const dataUrl = `data:image/svg+xml;base64,${btoa(modifiedSvg)}`

  return <img className={className} src={dataUrl} />
}
export default Svg
