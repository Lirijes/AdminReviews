const YEAR_IN_MILLIS = 3.15576e10;
const MONTH_IN_MILLIS = 2.6298e9;
const WEEK_IN_MILLIS = 6.048e8;
const DAY_IN_MILLIS = 8.64e7;
const HOUR_IN_MILLIS = 3.6e6;
const MIN_IN_MILLIS = 6e4;
const SEC_IN_MILLIS = 1e3;

export const timeFromNow = (date, formatter) => {
  const diff = date - new Date();
  const absoluteDiff = Math.abs(diff);

  if (absoluteDiff > YEAR_IN_MILLIS)
    return formatter.format(Math.trunc(diff / YEAR_IN_MILLIS), 'year');
  if (absoluteDiff > MONTH_IN_MILLIS)
    return formatter.format(Math.trunc(diff / MONTH_IN_MILLIS), 'month');
  if (absoluteDiff > WEEK_IN_MILLIS)
    return formatter.format(Math.trunc(diff / WEEK_IN_MILLIS), 'week');
  if (absoluteDiff > DAY_IN_MILLIS)
    return formatter.format(Math.trunc(diff / DAY_IN_MILLIS), 'day');
  if (absoluteDiff > HOUR_IN_MILLIS)
    return formatter.format(Math.trunc((diff % DAY_IN_MILLIS) / HOUR_IN_MILLIS), 'hour');
  if (absoluteDiff > MIN_IN_MILLIS)
    return formatter.format(Math.trunc((diff % HOUR_IN_MILLIS) / MIN_IN_MILLIS), 'minute');

  return formatter.format(Math.trunc((diff % MIN_IN_MILLIS) / SEC_IN_MILLIS), 'second');
};

export function formatDateStringToLocalizedDate(
  dateString,
  locale = 'en-US',
  options = { year: 'numeric', month: 'long', day: 'numeric' },
) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
}
