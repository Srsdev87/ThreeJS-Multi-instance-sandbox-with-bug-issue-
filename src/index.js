import { createRoot } from 'react-dom/client'
import { useRef } from 'react'
import './styles.css'
import App from './App'

const MultiAppContainer = () => {
  const wrapper1Ref = useRef(null)
  const wrapper2Ref = useRef(null)

  return (
    <div className="multi-app-container" style={{ display: 'flex' }}>
      <div className="app-wrapper" ref={wrapper1Ref}>
        <App eventSourceRef={wrapper1Ref} uniqueKey="app-1" />
      </div>
      <div className="app-wrapper" ref={wrapper2Ref}>
        <App eventSourceRef={wrapper2Ref} uniqueKey="app-2" />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<MultiAppContainer />)
