import { useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [unsupported, setUnsupported] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setUnsupported(true)
      return
    }
    navigate("/screen-test")
  }

  return (
    <div className="bg-gradient-to-br from-[#010163] to-black min-h-screen w-full flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl 
                      w-full max-w-3xl flex flex-col items-center justify-evenly p-10 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white animate-pulse [animation-duration:5s]">
  Screen Share Test App
</h1>

        <p className="text-white/70 text-center text-base md:text-lg">
          Test your browser's screen sharing capabilities
        </p>

        {unsupported && (
          <div className="text-red-300 text-center text-sm md:text-base">
            Your browser does not support screen sharing. <br />
            Please use Chrome or Edge on a desktop device.
          </div>
        )}

        <Button onClick={handleStart} variant="primary">
          Start Screen Sharing
        </Button>
      </div>
    </div>
  )
}

export default Home