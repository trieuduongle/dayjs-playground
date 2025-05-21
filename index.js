const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (UTCdate, formatString) => {
  return dayjs.tz(UTCdate, 'UTC').format(formatString);
};

const formatDateToMMDDYYYY = (UTCdate) => {
  return dayjs.tz(UTCdate, 'UTC').format('MM/DD/YYYY');
};

const formatDateToDDMMYYYY = (UTCdate) => {
  return dayjs.tz(UTCdate, 'UTC').format('DD/MM/YYYY');
};


const normalizeDate = (obj) => {
  const relativeDateString = obj.relativeDate;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (relativeDateString) {
    if (datePattern.test(relativeDateString)) {
      return formatDate(relativeDateString, 'MMMM D, YYYY');
    }
    return relativeDateString;
  }

  const { date } = obj;
  if (date) {
    return formatDate(date, 'MMMM D, YYYY');
  }

  return '';
};


const main = (showErrorOnly = true) => {
  const items = require('./sample-data.json');
  items.forEach(item => {
    try {
      const normalizedDate = normalizeDate(item);
      if(!showErrorOnly){
      console.log(item, '->',normalizedDate);
      }
    } catch (error) {
      console.error(error);
      console.error(item);
    }
  });
}

main(false);