import {useState,useEffect,useRef} from 'react'

export type ScreenShareStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'cancelled'
  | 'denied'
  | 'stopped'
  | 'error'

  export type StreamMetadata = {
    width: number
    height: number
    displaySurface: number
}

export const useScreenShare= ()=>{
  const [status,setStatus] = useState<ScreenShareStatus>('idle')
  const [stream,setStream] = useState<MediaStream | null>(null)
  const [metadata,setMetadata]= useState<StreamMetadata | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const streamRef = useRef<MediaStream | null>(null)

  const cleanup = () =>{
    if(streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.onended = null
        track.stop()
      })
      streamRef.current = null
    }
    setStream(null)
    setMetadata(null)
  }

  const startSharing = async () =>{
    setStatus('requesting')
    setErrorMsg('')

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video:{frameRate:{ideal:30}},
        audio:false
      })
      const track = mediaStream.getVideoTracks()[0]
      const settings = track.getSettings()

      setMetadata({
        width: settings.width ?? 0,
        height: settings.height ?? 0,
        displaySurface: (settings as any).displaySurface ?? 'unknown'
      })

      track.onended = () => {
        cleanup()
        setStatus('stopped')
      }

      streamRef.current = mediaStream
      setStream(mediaStream)
      setStatus('granted')
    } catch (error: any) {
      if(error.name == 'NotAllowedError') {
        if(
          error.message.toLowerCase().includes('denied') || error.messagae.toLowerCase().includes('blocked')
        ){
          setStatus('denied')
        }else{
          setStatus('cancelled')
        }
    }else if(error.name === 'NotFoundError'){
      setStatus('error')
      setErrorMsg('No screen found to share')
    }else if(error.name === 'NotReadableError'){
      setStatus('error')
      setErrorMsg('Screen could not be read. Try again')
  }else{
    setStatus('error')
    setErrorMsg(error.message || 'An unexpected error occurred. Please try again')
  }
}
}

const stopSharing = () =>{
  cleanup()
  setStatus('stopped')
}

useEffect(()=>{
  return () =>{
    cleanup();
  }
},[])

return {
  status,
  stream,
  metadata,
  errorMsg,
  startSharing,
  stopSharing
}
}
