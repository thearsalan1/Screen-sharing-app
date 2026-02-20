type Props = {
  onClick: () => void
  disabled?:boolean
  loading?:boolean
  variant?:'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}


export default function Button({
  onClick,
  disabled=false,
  loading=false,
  variant='primary',
  children
}:Props){
  const base = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm'

  const variants = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger:    'bg-red-600 text-white hover:bg-red-700',
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}