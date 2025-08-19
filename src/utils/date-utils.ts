import { format } from "date-fns";
import { cs } from "date-fns/locale";

export function toLocalISODateString(date: Date | undefined): string {
  if (date === undefined) return "";
  const tzOff = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - tzOff);
  return localDate.toISOString().slice(0, 10);
}

export function formatDate(date: Date | null, formatString: string) {
  if (date) {
    return format(date, formatString, { locale: cs });
  }
  return "neplatne datum";
}
