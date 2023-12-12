import { useEffect, useState, ComponentProps } from "react"

interface SVGProps extends ComponentProps<"img"> {
  src: string
  color?: string
}

const Svg = ({ src, color, ...props }: SVGProps) => {
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

  return <img src={dataUrl} { ...props } />
}
export default Svg
