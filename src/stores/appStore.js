import create from 'zustand'
import { createContext } from 'react'

export const StoresContext = createContext(null)

const createAppStore = () => {
  return create((set, get) => ({
    threeObjects: {},
    projection: 'Perspective',
    top: 'Back',
    middle: 'Top',
    bottom: 'Right',
    meshes: {},
    setPanelView: (which, view) => set({ [which]: view }),
    setProjection: (projection) => set({ projection }),
    setMeshes: (meshes) => set({ meshes }),
    setThreeObjects: (threeObjects) => set({ threeObjects })
  }))
}

export { createAppStore }
