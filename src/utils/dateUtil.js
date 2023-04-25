export const DAY_IN_MILLISENDS = 24 * 60 * 60 * 1000;
export const DAY_IN_NORMAL_YEAR = 365;
export const DAY_IN_LEAP_YEAR = 366;
export const MONTHS_IN_YEAR = 12;

export const formatDate = (date) => {
  let month = date.getMonth(); // add 1 because getMonth() returns a zero-based index
  if(month < 10) {
    month = '0' + month.toString();
  }
  let day = date.getDate();
  if(day < 10) {
    day = '0' + day.toString();
  }
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export const adjustDate = (date, monthsToDeduct, expectedDate) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let newMonth = month - monthsToDeduct;
  let newYear = year;
  if(newMonth <= 0) {
    newMonth = (MONTHS_IN_YEAR - Math.abs(newMonth))
    newYear -= 1;
  }

  let newDate = new Date(newYear, newMonth - 1, expectedDate);
  //Account for months with less days while coupon date is on the last day of the month
  if(expectedDate !== newDate.getDate()) {
    const firstDayOfCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - DAY_IN_MILLISENDS);
    newDate = lastDayOfPreviousMonth;
  }
  return newDate;
}