function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function toDateGroup(date: Date) {
  const today = startOfDay(new Date()).getTime();
  const comparedDate = startOfDay(date).getTime();
  const diffDays = Math.round((today - comparedDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'النهارده';
  if (diffDays === 1) return 'امبارح';
  return 'قبل كدا';
}

export function formatTimeLabel(date: Date) {
  return date.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function resolveTxDate(date?: string | null): Date {
  const raw = date ?? null;

  const d = raw
    ? new Date(raw) // handles ISO string/number
    : null;

  return d && !isNaN(d.getTime()) ? d : new Date();
}
export const isSameMonth = (isoDate: string, now = new Date()) => {
  const d = new Date(isoDate);
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
};
export const isSameWeek = (isoDate: string, now = new Date()) => {
  const d = new Date(isoDate).getTime();
  const n = now.getTime();
  return n - d <= 7 * 24 * 60 * 60 * 1000;
};
export const isSameYear = (isoDate: string, now = new Date()) => {
  const d = new Date(isoDate);
  return d.getFullYear() === now.getFullYear();
};
