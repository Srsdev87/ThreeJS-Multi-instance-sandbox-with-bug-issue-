import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, View, Center, OrbitControls } from '@react-three/drei'
import TestPlugin from './test-plugin'
import ImperativeComponent from './imperative-component'
import StoresProvider from './store-context-provider/stores-provider'
import useStores from './store-context-provider/use-stores'

function AppContent({ eventSourceRef, uniqueKey }) {
  const [impCompLoaded, setImpCompLoaded] = useState(false)
  const impCompRef = useRef(null)

  const onImpMount = useCallback(() => {
    setImpCompLoaded(true)
  }, [])

  const { appStore } = useStores()

  return (
    <div className="container">
      {/** A single canvas, it will only render when things move or change, and otherwise stay idle ... */}

      <Canvas shadows frameloop="demand" className="canvas" eventSource={eventSourceRef.current}>
        {/** Each view tracks one of the divs above and creates a sandboxed environment that behaves
             as if it were a normal everyday canvas, <View> will figure out the gl.scissor stuff alone. */}
        <View.Port />
        <ImperativeComponent ref={impCompRef} onImpMount={onImpMount} uniqueKey={uniqueKey} />
      </Canvas>

      <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene background="aquamarine"></Scene>
        <OrbitControls makeDefault />
      </View>

      {impCompRef.current && impCompLoaded && <TestPlugin useThreeConetxt={impCompRef.current} appStore={appStore}></TestPlugin>}
    </div>
  )
}

function Scene({ background = 'white', children, ...props }) {
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bricks/model.gltf')
  const meshRefs = useRef([])
  const { appStore } = useStores()

  const ref = (el) => {
    if (el) {
      meshRefs.current.push(el)
    }
  }

  useEffect(() => {
    if (Object.keys(meshRefs.current).length > 0) {
      appStore.getState().setMeshes(meshRefs.current)
    }
  }, [meshRefs])

  return (
    <>
      <color attach="background" args={[background]} />
      <ambientLight />
      <directionalLight position={[10, 10, -15]} castShadow shadow-bias={-0.0001} shadow-mapSize={1024} />
      <group
        matrixAutoUpdate={false}
        // Why onUpdate and not just matrix={matrix} ?
        // This is an implementation detail, overwriting (most) transform objects isn't possible in Threejs
        // because they are defined read-only. Therefore Fiber will always call .copy() if you pass
        // an object, for instance matrix={new THREE.Matrix4()} or position={new THREE.Vector3()}
        // In this rare case we do not want it to copy the matrix, but refer to it.
        {...props}>
        <Center>
          <mesh ref={ref} castShadow geometry={nodes.bricks.geometry} material={materials['Stone.014']} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="goldenrod" roughness={0} metalness={1} />
          </mesh>
        </Center>
        {children}
      </group>
    </>
  )
}

const App = ({ eventSourceRef, uniqueKey }) => {
  return (
    <StoresProvider>
      <AppContent eventSourceRef={eventSourceRef} uniqueKey={uniqueKey} />
    </StoresProvider>
  )
}

export default App
