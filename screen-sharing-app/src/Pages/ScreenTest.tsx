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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Screen Test</h2>
          <StatusBadge status={status} />
        </div>

        {/* STEP 1 — Requesting (picker is open) */}
        {status === 'requesting' && (
          <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Waiting for you to select a screen...</p>
          </div>
        )}

        {/* STEP 1 — Idle / Cancelled / Denied / Error (show start button) */}
        {['idle', 'cancelled', 'denied', 'error'].includes(status) && (
          <div className="bg-white rounded-xl shadow p-6 mb-4">
            <p className="text-gray-600 mb-4">
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
              <p className="mt-3 text-orange-600 text-sm">
                You cancelled the screen picker. Click above to try again.
              </p>
            )}

            {status === 'denied' && (
              <p className="mt-3 text-red-600 text-sm">
                Permission was denied. Please allow screen sharing in your browser settings.
              </p>
            )}

            {status === 'error' && (
              <p className="mt-3 text-red-600 text-sm">
                Error: {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* STEP 2 — Granted: live preview + metadata + stop button */}
        {status === 'granted' && (
          <div className="bg-white rounded-xl shadow p-6 mb-4 space-y-4">
            <VideoPreview stream={stream} />
            <StreamMetadata metadata={metadata} />
            <Button onClick={stopSharing} variant="danger">
              Stop Sharing
            </Button>
          </div>
        )}

        {/* STEP 3 — Stopped: retry or go home */}
        {status === 'stopped' && (
          <div className="bg-white rounded-xl shadow p-6 mb-4">
            <p className="text-gray-700 font-medium mb-4">
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