import { useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [unsupported,setUnsupported] =useState(false);
  const navigate = useNavigate()

  const handleStart = () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setUnsupported(true)
      return
    }
    navigate('/screen-test')
  }

  return (
    <div >
      <div>
        <h1>Screen Share Test App</h1>
        <p>Test your browser's screen sharing capabilities</p>

        {unsupported && (
          <div>
            Your browser does not support screen sharing.
            Please use Chrome or Edge on a desktop device.
          </div>
        )}
        <Button onClick={handleStart} variant="primary">Start Screen Sharing</Button>
      </div>
    </div>
  )
}

export default Home