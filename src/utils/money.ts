const moneyFormatter = new Intl.NumberFormat('ar-EG', {
  style: 'currency',
  currency: 'EGP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatMoney = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return moneyFormatter.format(0);
  }
  return moneyFormatter.format(amount);
};
export const uid = () =>
  `${Date.now()}_${Math.random().toString(16).substring(2)}`;
