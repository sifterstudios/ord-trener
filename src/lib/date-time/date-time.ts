import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function toNaturalDate(date: string): string {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}
