import { useEffect, useState } from "react"

interface SVGProps {
    src: string
    color?: string
}

const SVG = ({ src, color }: SVGProps) => {
    const [modifiedSvg, setModifiedSvg] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(src)
                const svgText = await response.text()

                const modifiedSvgText = svgText.replace(/fill="(.*?)"/g, `fill="${color}"`)

                setModifiedSvg(modifiedSvgText)
                if (color === undefined) setModifiedSvg(svgText)
            }
            catch (error) {
                console.error('Error fetching SVG:', error)
            }
        })()
    }, [src, color])

    const dataUrl = `data:image/svg+xml;base64,${btoa(modifiedSvg)}`

    return (
        <img src={dataUrl} />
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export default SVG
