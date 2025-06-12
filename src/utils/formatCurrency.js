export function formatCurrency(number) {
  const formatter = new Intl.NumberFormat("ar", {
    currency: "EGP",
    minimumFractionDigits: 2,
    style:"currency"
  });
  return formatter.format(number);
}
