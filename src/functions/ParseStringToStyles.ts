import { CSSProperties } from "react"

export const parseStyles = (styleString: string) => {
  const css = {} as CSSProperties
  styleString.split(';').forEach(style => {
    const [property, value] = style.split(':')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    property && (css[property.trim() as keyof CSSProperties] = value.trim())
  })
  return css
}
