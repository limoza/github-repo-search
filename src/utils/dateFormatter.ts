/** Formats an ISO 8601 datetime string as `yyyy/mm/dd hh:mm:ss` in local time. */
export function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');

  return `${y}/${m}/${day} ${h}:${min}:${s}`;
}
