const clean = (_str_) => (typeof _str_ === 'string' ? _str_.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '');

export const isValidRut = (_str) => {
  let str = _str;

  if (typeof str !== 'string') return false;

  str = clean(str).toUpperCase();
  let t = parseInt(str.slice(0, -1), 10);
  let m = 0;
  let s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m % 6))) % 11;
    m += 1;
    t = Math.floor(t / 10);
  }

  const v = s > 0 ? `${s - 1}` : 'K';
  return v === str.slice(-1);
};

const sanitizeRut = (_str_) => (typeof _str_ === 'string' ? _str_.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '');

export const formatRut = (_rut_) => {
  let result;
  if (_rut_) {
    const rut = sanitizeRut(_rut_);

    result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
    for (let i = 4; i < rut.length; i += 3) {
      result = `${rut.slice(-3 - i, -i)}.${result}`;
    }
  }
  return result;
};
