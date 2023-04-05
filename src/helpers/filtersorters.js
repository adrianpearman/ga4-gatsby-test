import { DateTime } from 'luxon';

const getStartDateValue = (object) => object.startDate || object.date;

// ============= Filters ============= //
// Generic filter fn creator for when you need to explicitly set callback
export function getPastDateExcluder(dateValueCallback = getStartDateValue) {
  /*
    returns _a callback function_ to be used with `Array.filter()` which filters objects
    with a future date value as provided by the specified function
  */
  return (object) => DateTime.fromISO(dateValueCallback(object)) > DateTime.local();
}
export function getFutureDateExcluder(dateValueCallback = getStartDateValue) {
  return (object) => DateTime.fromISO(dateValueCallback(object)) < DateTime.local();
}

// For majority of use cases where the field is startDate
export const excludePastStartDates = getPastDateExcluder();
export const excludeFutureStartDates = getFutureDateExcluder();

// ============= Sorters ============= //
// Generic sorter fn creator for when you need to explicitly set callback
export function getDateAscComparer(dateValueCallback = getStartDateValue) {
  /*
    returns _a callback function_ to be used with `Array.sort()` which sorts objects
    by the date value as provided by the specified function
  */
  return (objectA, objectB) =>
    DateTime.fromISO(dateValueCallback(objectA)) > DateTime.fromISO(dateValueCallback(objectB))
      ? 1
      : -1;
}
export function getDateDescComparer(dateValueCallback = getStartDateValue) {
  return (objectA, objectB) =>
    DateTime.fromISO(dateValueCallback(objectA)) < DateTime.fromISO(dateValueCallback(objectB))
      ? 1
      : -1;
}

// For majority of use cases where the field is startDate
export const compareStartDatesAsc = getDateAscComparer();
export const compareStartDatesDesc = getDateDescComparer();
