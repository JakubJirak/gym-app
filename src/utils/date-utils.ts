export function toLocalISODateString(date: Date | undefined): string {
  if (date === undefined) return "";
  const tzOff = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - tzOff);
  return localDate.toISOString().slice(0, 10);
}
