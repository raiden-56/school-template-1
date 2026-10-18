import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'

type Tone = 'dark' | 'light'
const Ctx = createContext<{ tone: Tone; setTone: (t: Tone) => void }>({ tone: 'dark', setTone: () => {} })

export function HeaderToneProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>('dark')
  return <Ctx.Provider value={{ tone, setTone }}>{children}</Ctx.Provider>
}

export const useHeaderTone = () => useContext(Ctx).tone

/** Pages call this to tell the transparent header whether it sits on a dark or light hero. */
export function useSetHeaderTone(tone: Tone) {
  const { setTone } = useContext(Ctx)
  useLayoutEffect(() => setTone(tone), [tone, setTone])
}
