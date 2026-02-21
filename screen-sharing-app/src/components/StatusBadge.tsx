import type { ScreenShareStatus } from '../hooks/useScreenShare'

type Props ={
  status:ScreenShareStatus
}

const config: Record<ScreenShareStatus, {label:string;color:string}>={
  idle: {label:'Ready', color:'bg-gray-100 text-gray-600'},
  requesting:{label:'Requesting...', color:'bg-yellow-100 text-yellow-700'},
  granted:{label:"Active", color:`bg-green-100 text-green-600`},
  cancelled:{label:'Cancelled', color:`bg-orange-100 text-orange-700`},
  denied:{label:'Permission Denied', color:`bg-red-100 text-red-700`},
  stopped:{label:'Sharing Stopped', color:`bg-gray-100 text-gray-600`},
  error:{label:'Error',color:`bg-red-100 text-red-700`}
}

export default function StatusBadge({status}:Props){
  const {label,color} = config[status]
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color}`}>{label}</span>
  )
}