export const formatDateRange = (startDate, endDate) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });

  let years = endYear - startYear;
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const formattedDateRange = `${startMonth} ${startYear} to ${endMonth} ${endYear} (${years} years ${months} months)`;

  return formattedDateRange;
};
