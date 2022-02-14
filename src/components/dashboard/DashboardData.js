function currentDate() {
  const currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  const minDate = `${year}-${month}-01`;
  let maxDate = "";

  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    maxDate = `${year}-${month}-31`;
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    maxDate = `${year}-${month}-30`;
  } else if (month === 2) {
    if (year % 4 === 0) {
      maxDate = `${year}-${month}-29`;
    } else {
      maxDate = `${year}-${month}-28`;
    }
  }

  return [maxDate, minDate, month, year, day];
}

export { currentDate };
