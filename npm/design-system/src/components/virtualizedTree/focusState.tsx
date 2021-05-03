import React, { createContext, Dispatch, RefObject, useContext, useMemo, useRef, useState } from 'react'

type FocusDispatch = [RefObject<string | undefined>, Dispatch<string | undefined>]

const FocusStateDataContext = createContext<string | undefined>(undefined)
const FocusStateDispatchContext = createContext<FocusDispatch>(undefined as any)

export const FocusStateContext: React.FC = ({ children }) => {
  const [focusState, setFocusState] = useState<string>()
  const focusRef = useRef<string | undefined>()

  const focusDispatch = useMemo((): FocusDispatch => ([focusRef, (value: string | undefined) => {
    focusRef.current = value
    setFocusState(value)
  }]), [])

  return (
    <FocusStateDispatchContext.Provider value={focusDispatch}>
      <FocusStateDataContext.Provider value={focusState}>
        {children}
      </FocusStateDataContext.Provider>
    </FocusStateDispatchContext.Provider>
  )
}

export const useFocusState = () => useContext(FocusStateDataContext)

export const useFocusDispatch = () => useContext(FocusStateDispatchContext)