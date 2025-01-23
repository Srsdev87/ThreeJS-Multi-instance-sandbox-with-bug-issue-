import { useThree } from '@react-three/fiber'
import React, { useMemo } from 'react'
import { forwardRef, Fragment, useImperativeHandle } from 'react'
import useStores from './store-context-provider/use-stores'

const ImperativeComponent = forwardRef((props, ref) => {
  const { onImpMount, uniqueKey } = props

  const { appStore } = useStores()

  // state and store
  const useThreeConetxt = useThree()
  const { gl, scene, camera, invalidate } = useThreeConetxt

  appStore.getState().setThreeObjects({
    triggerInvalidate: invalidate
  })

  const memoizedInvalidate = useMemo(() => {
    return () => {
      if (camera) {
        gl.render(scene, camera)
      } else {
        console.warn(`ImperativeComponent: No camera found for ${uniqueKey}`)
      }
    }
  }, [gl, scene, uniqueKey])

  useImperativeHandle(ref, () => ({
    ...useThreeConetxt,
    triggerInvalidate: memoizedInvalidate
  }))

  onImpMount()

  return <Fragment />
})

export default ImperativeComponent
