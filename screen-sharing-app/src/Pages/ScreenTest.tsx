import { useNavigate } from 'react-router-dom'
import { useScreenShare } from '../hooks/useScreenShare'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import VideoPreview from '../components/VideoPreview'
import StreamMetadata from '../components/StreamMetadata'

export default function ScreenTest() {
  const navigate = useNavigate()
  const {
    status,
    stream,
    metadata,
    errorMsg,
    startSharing,
    stopSharing
  } = useScreenShare()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010163] to-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">

        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white  drop-shadow-lg">Screen Test</h2>
          <StatusBadge status={status} />
        </div>

        {status === 'requesting' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/80">Waiting for you to select a screen...</p>
          </div>
        )}

        {['idle', 'cancelled', 'denied', 'error'].includes(status) && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6">
            <p className="text-white/70 mb-4">
              Click below to begin the screen sharing test.
            </p>

            <Button
              onClick={startSharing}
              loading={status === 'requesting'}
              disabled={status === 'requesting'}
              variant="primary"
            >
              Start Screen Share
            </Button>

            {status === 'cancelled' && (
              <p className="mt-3 text-orange-400 text-sm">
                You cancelled the screen picker. Click above to try again.
              </p>
            )}

            {status === 'denied' && (
              <p className="mt-3 text-red-400 text-sm">
                Permission was denied. Please allow screen sharing in your browser settings.
              </p>
            )}

            {status === 'error' && (
              <p className="mt-3 text-red-400 text-sm">
                Error: {errorMsg}
              </p>
            )}
          </div>
        )}

        {status === 'granted' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 space-y-4">
            <VideoPreview stream={stream} />
            <StreamMetadata metadata={metadata} />
            <Button onClick={stopSharing} variant="danger">
              Stop Sharing
            </Button>
          </div>
        )}

        {status === 'stopped' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6">
            <p className="text-white font-medium mb-4">
              🛑 Screen sharing stopped.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={startSharing} variant="primary">
                Retry Screen Test
              </Button>
              <Button onClick={() => navigate('/')} variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}