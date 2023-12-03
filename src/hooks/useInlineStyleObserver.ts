import { parseStyles } from "@/functions/ParseStringToStyles";
import { CSSProperties, RefObject, useCallback, useEffect } from "react";

export const useInlineStyleObserver = (ref: RefObject<Element>, callback: (newValue: string) => void, attribute: string) => {
  const memoizedCallback = useCallback(callback, [callback]);
 
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(mutationsList => {
        for(const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const target = mutation.target as Element
            const css = parseStyles(target.getAttribute('style')!)
            if (css[attribute as keyof CSSProperties]) {
              const styleProp = parseStyles(target.getAttribute('style')!)
              const strToPass = styleProp[attribute as keyof CSSProperties]!.toString()
              memoizedCallback(strToPass)
            }
          }
        }
      })
      const options = {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
        subtree: true,
      }
      observer.observe(ref.current, options)
      return () => observer.disconnect()
    }
  }, [memoizedCallback, attribute, ref])
}
