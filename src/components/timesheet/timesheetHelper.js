export const monthsList = [
  { option: "January", value: "1" },
  { option: "February", value: "2" },
  { option: "March", value: "3" },
  { option: "April", value: "4" },
  { option: "May", value: "5" },
  { option: "June", value: "6" },
  { option: "July", value: "7" },
  { option: "August", value: "8" },
  { option: "September", value: "9" },
  { option: "October", value: "10" },
  { option: "November", value: "11" },
  { option: "December", value: "12" },
];

export const yearsList = [
  { option: "2024", value: 2024 },
  { option: "2025", value: 2025 },
  { option: "2026", value: 2026 },
  { option: "2027", value: 2027 },
  { option: "2028", value: 2028 },
  { option: "2029", value: 2029 },
  { option: "2030", value: 2030 },
  { option: "2031", value: 2031 },
  { option: "2032", value: 2032 },
  { option: "2033", value: 2033 },
  { option: "2034", value: 2034 },
  { option: "2035", value: 2035 },
];

export const getMonthName = (month) => {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("en-GB", { month: "long" });
};

export const getAllDaysInMonth = (month, year) => {
  const date = new Date(year, month - 1, 1);
  const days = [];
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };

  let weekDaysCounter = 0;

  while (date.getMonth() === month - 1) {
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replace(",", "");
    days.push({ day: formattedDate, numberOfHoursWorked: "", expense: "", ovetime: "", isWeeklytotal: false });


    weekDaysCounter++;
    if (date.getDay() === 0) {
      days.push({ day: "Weekly Total", numberOfHoursWorked: "", expense: "", ovetime: "", isWeeklytotal: true, isReadOnly: true });
      weekDaysCounter = 0;
    }

    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const convertDateToSubmit = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
