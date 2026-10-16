// Section de page intérieure : dégage l'espace sous la barre de navigation fixe.
export default function Page({ children, className = '' }) {
  return <section className={`container-page pt-32 md:pt-40 ${className}`}>{children}</section>
}
