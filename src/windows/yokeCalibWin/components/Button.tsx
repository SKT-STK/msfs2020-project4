import { CSSProperties, ComponentPropsWithoutRef } from "react"
import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends Omit<ComponentPropsWithoutRef<ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>>, 'type' | 'style'> {
  style?: CSSProperties
}

const Button = ({ style, ...props }: ButtonProps) => {
  return (
    <motion.button
      type='button'
      style={{
        position: 'fixed',
        backgroundColor: 'transparent',
        border: '3px solid white',
        borderRadius: '6px',
        outline: 'none',
        cursor: 'pointer',
        ...style
      }}
      { ...props }
    />
  )
}
export default Button
