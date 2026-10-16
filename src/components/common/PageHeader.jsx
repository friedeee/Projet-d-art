export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-laiton mb-3">{eyebrow}</p>
      <h1 className="font-display font-medium text-4xl md:text-5xl leading-tight mb-4">{title}</h1>
      {description && <p className="text-ivoire/55 max-w-xl leading-relaxed">{description}</p>}
      {children}
    </header>
  )
}
