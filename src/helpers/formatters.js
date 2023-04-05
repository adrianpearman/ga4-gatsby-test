import { DateTime } from 'luxon';

const canadianCurrencyFormat = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD'
});

const canadianCurrencyFormatNoCents = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function canadianCurrencyFormatter(number, includeCents = true) {
  return includeCents
    ? canadianCurrencyFormat.format(number)
    : canadianCurrencyFormatNoCents.format(number);
}

export const formatIsoDate = (isoDate, format) => DateTime.fromISO(isoDate).toFormat(format);

export const monthAndDay = (isoDate) => formatIsoDate(isoDate, 'LLLL d');
export const abbreviatedMonth = (isoDate) => formatIsoDate(isoDate, 'LLL');
export const abbreviatedMonthAndDay = (isoDate) => formatIsoDate(isoDate, 'LLL d');
export const dayOfTheMonth = (isoDate) => formatIsoDate(isoDate, 'dd');
export const weekDay = (isoDate) => formatIsoDate(isoDate, 'cccc');
export const year = (isoDate) => formatIsoDate(isoDate, 'yyyy');
export const longDate = (isoDate) => formatIsoDate(isoDate, 'cccc, LLLL d, yyyy');
export const standardDate = (isoDate) => formatIsoDate(isoDate, 'LLLL d, yyyy');

export const dateRange = (fromDate, toDate, formatter = (date) => date) =>
  `${formatter(fromDate)} - ${formatter(toDate)}`;
