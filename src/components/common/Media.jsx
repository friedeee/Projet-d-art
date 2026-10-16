// Photo, ou visuel de remplacement sobre quand l'élément n'a pas encore d'image.
export default function Media({ src, alt, icon: Icon, iconSize = 28, className = '', eager = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        className={`w-full h-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(184,147,74,0.16),transparent_65%)]"
    >
      {Icon && <Icon size={iconSize} strokeWidth={1.25} className="text-laiton/70" />}
    </div>
  )
}
