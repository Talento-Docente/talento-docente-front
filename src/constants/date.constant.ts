export const months = [
  { key: 1, value: 'Enero' },
  { key: 2, value: 'Febrero' },
  { key: 3, value: 'Marzo' },
  { key: 4, value: 'Abril' },
  { key: 5, value: 'Mayo' },
  { key: 6, value: 'Junio' },
  { key: 7, value: 'Julio' },
  { key: 8, value: 'Agosto' },
  { key: 9, value: 'Septiembre' },
  { key: 10, value: 'Octubre' },
  { key: 11, value: 'Noviembre' },
  { key: 12, value: 'Diciembre' },
];

export function getMonths(key = 'key', value = 'value') {
  const _months: { [x: string]: string | number }[] = [];
  months.forEach((month) => {
    _months.push({ [key]: month.key, [value]: month.value });
  });
  return _months;
}

export function getYears(key = 'key', value = 'value') {
  const _years: { [x: string]: string | number }[] = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year > currentYear - 3; year -= 1) {
    _years.push({ [key]: year, [value]: year });
  }
  return _years;
}

export default {
  months,
  getMonths,
  getYears
};
