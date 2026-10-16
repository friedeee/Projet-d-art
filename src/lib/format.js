const FCFA = new Intl.NumberFormat('fr-FR')

/** 35000 → « 35 000 FCFA » ; null → « Sur devis ». */
export function formatPrice(amount) {
  return amount == null ? 'Sur devis' : `${FCFA.format(amount)} FCFA`
}
