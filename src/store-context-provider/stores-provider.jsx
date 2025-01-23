import React, { useMemo } from 'react'
import { StoresContext } from './stores-context'
import { createAppStore } from '../stores/appStore'

const StoresProvider = ({ children }) => {
  const appStore = useMemo(() => createAppStore(), [])

  const stores = useMemo(
    () => ({
      appStore
    }),
    [appStore]
  )

  return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
}

export default StoresProvider
