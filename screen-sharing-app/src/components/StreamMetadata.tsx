import type { StreamMetadata as MetadataType } from "../hooks/useScreenShare";

type Props = {
  metadata: MetadataType | null
}

const surfaceLabel: Record<string,string>={
  browser:'Browser Tab',
  Window:'Application Window',
  monitor:'Entire Screen',
  unknown:'Unknown'
}

export default function StreamMetadata({metadata}:Props){
  if(!metadata) return null;

  const label = surfaceLabel[metadata.displaySurface] ?? metadata.displaySurface

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2 text-sm">
      <div className="flex items-center gap-2 text-green-700 font-medium">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pluse"/>
          Screen stream active
      </div>
      <div className="text-gray-700">
        Display type: <span className="font-medium">{label}</span>
      </div>
      <div className="text-gray-700">
        Resolution: <span>{metadata.width} x {metadata.height}</span>
      </div>
    </div>
  )
}

