export const toEnglishDigits = (input: string) =>
  input.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export const normalizeAmountInput = (raw: string) => {
  // convert Arabic-Indic digits -> English digits
  let s = toEnglishDigits(raw);

  // keep only digits and dot
  s = s.replace(/[^\d.]/g, '');

  // allow only one dot
  const parts = s.split('.');
  if (parts.length > 2) {
    s = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  // prevent empty / dot-only
  if (s === '' || s === '.') return '0';

  // limit decimals to 2
  const [i, d] = s.split('.');
  const intPart = i === '' ? '0' : String(Number(i)); // removes leading zeros
  if (d == null) return intPart;

  return `${intPart}.${d.slice(0, 2)}`;
};

export const amountToNumber = (amount: string) => {
  const n = Number(amount);
  return Number.isFinite(n) ? n : 0;
};
