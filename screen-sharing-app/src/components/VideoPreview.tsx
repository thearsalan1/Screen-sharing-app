import { useEffect,useRef } from "react";

type Props= {
  stream: MediaStream | null
}

export default function VideoPreview({stream}:Props){
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(()=>{
    if(videoRef.current){
      videoRef.current.srcObject = stream
    }
  },[stream])

  return (
    <div className={stream? 'block' : 'hidden'}>
      <video 
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full rounded-lg border border-gray-200 shadow-sm"  
      />
    </div>
  )
}