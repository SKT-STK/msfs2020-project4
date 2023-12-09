import SettingEntry from "@/components/app/settings/SettingEntry"
import { ReactNode, useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import * as convert from 'color-convert'

interface SettingsEntryDropdownMenuWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (string | null), setProp: ((prop: string | null) => void)
  }
  children: JSX.IntrinsicElements['p'][]
}

const ActionColor = '#FF5F15'

const SettingsEntryDropdownMenuWrapper = ({ text, hoverText, useStoreProps, children }: SettingsEntryDropdownMenuWrapperProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [option, setOption] = useState<string>((children[0]['props' as keyof typeof children[0]]
    .children as string)
    .replace(/ /g, '')
    .toLowerCase())
  const useStorePropsRef = useRef<SettingsEntryDropdownMenuWrapperProps['useStoreProps']>(useStoreProps)
  const selectRef = useRef<HTMLSelectElement>(null)
  
  const generateOptions: () => ReactNode[] = () => {
    return children.map((child, index) => (
      <option
        key={index}
        value={(child['props' as keyof typeof child].children as string).replace(/ /g, '').toLowerCase()}
      >
        { child as unknown as ReactNode }
      </option>
    ))
  }

  useEffect(() => {
    useStorePropsRef.current.setProp(option)
    selectRef.current?.blur()
  }, [option])

  useEffect(() => {
    if (useStoreProps.prop === null) return
    setOption(useStoreProps.prop)
  }, [useStoreProps.prop])
  
  return (
    <SettingEntry
      text={text}
      hoverText={[hoverText, undefined, undefined]}
    >
      <motion.select
        ref={selectRef}
        className='outline-none rounded-lg border-2 border-transparent min-w-[20%] text-right'
        value={option}
        onChange={e => setOption(e.target.value)}
        whileFocus={{
          borderColor: ActionColor
        }}
        whileHover={!isFocused? {
          borderColor: 'hsl(' + (convert.hex.hsl(ActionColor)[0])
            + ',' + (convert.hex.hsl(ActionColor)[1] / 1.2)
            + ',' + (convert.hex.hsl(ActionColor)[2] * 1.2) + ')'
        } : {}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        { ...generateOptions() }
      </motion.select>
    </SettingEntry>
  )
}
export default SettingsEntryDropdownMenuWrapper
