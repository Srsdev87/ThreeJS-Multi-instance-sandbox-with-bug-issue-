import { useContext } from 'react'
import { StoresContext } from './stores-context'

 const useStores = () => {
  const context = useContext(StoresContext)
  if (!context) {
    throw new Error('useStores must be used within a StoresProvider')
  }
  return context
}

export default useStores