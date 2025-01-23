import { Color, DoubleSide, MeshPhysicalMaterial } from 'three'
import './styles.css'

export const createChromaticMaterial = () => {
  const chromaticMaterial = new MeshPhysicalMaterial({
    color: new Color(1.0, 0.9, 0.8),
    emissive: new Color(0.1, 0.1, 0.1),
    roughness: 0.45,
    metalness: 0.01,
    clearcoat: 0.01,
    reflectivity: 0.0,
    sheen: 0.5,
    side: DoubleSide,
    specularIntensity: 1,
    name: 'MaterialName.chromaticMaterial'
  })

  return chromaticMaterial
}

const TestPlugin = ({ useThreeConetxt, appStore }) => {
  const handleOnClick = () => {
    const { meshes, threeObjects } = appStore.getState()
    const { camera, scene, gl, triggerInvalidate } = useThreeConetxt
    if (meshes) {
      meshes.forEach((mesh) => {
        mesh.material = createChromaticMaterial()
      })
    }
    threeObjects.triggerInvalidate()
  }
  return (
    <div className="testPlugin" onClick={handleOnClick}>
      Test Plugin
    </div>
  )
}

export default TestPlugin
