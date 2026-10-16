export default function ListingGrid({ children }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}