import { motion } from "framer-motion"

interface TransitionProps {
  children: JSX.Element
}

const Transition = ({ children }: TransitionProps) => {
  return (<>
    { children }
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#0F0F0F',
        transformOrigin: 'bottom'
      }}
      initial={{
        scaleY: 0
      }}
      animate={{
        scaleY: 0
      }}
      exit={{
        scaleY: 1
      }}
      transition={{
        duration: 1,
        ease: [.22, 1, .36, 1]
      }}
    />
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#0F0F0F',
        transformOrigin: 'top'
      }}
      initial={{
        scaleY: 1
      }}
      animate={{
        scaleY: 0
      }}
      exit={{
        scaleY: 0
      }}
      transition={{
        duration: 1,
        ease: [.22, 1, .36, 1]
      }}
    />
  </>)
}
export default Transition
