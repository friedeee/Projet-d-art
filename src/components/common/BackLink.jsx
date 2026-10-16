import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({ to, children }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 text-sm text-ivoire/55 hover:text-laiton transition-colors mb-10">
      <ArrowLeft size={15} /> {children}
    </Link>
  )
}
