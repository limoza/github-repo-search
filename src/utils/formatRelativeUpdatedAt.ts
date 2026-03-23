export const formatRelativeUpdatedAt = (
  updatedAt: string,
  now = Date.now(),
): string => {
  const updatedTime = new Date(updatedAt).getTime();
  const diffMs = updatedTime - now;

  const rtf = new Intl.RelativeTimeFormat('ja', { numeric: 'auto' });

  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, 'minute');
  }

  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hour');
  }

  return rtf.format(diffDays, 'day');
};
