function cleanRut(rut) {
  return rut.replace(/[^0-9kK]+/g, '').toLowerCase();
}

function formatRut(rut) {
  if (rut.length > 1) {
    // eslint-disable-next-line no-param-reassign
    rut = `${rut.slice(0, -1)}-${rut.slice(-1)}`;
    if (rut.length > 5) {
      if (rut.length > 8) {
        return `${rut.slice(0, -8)}.${rut.slice(-8, -5)}.${rut.slice(-5)}`;
      }
      return `${rut.slice(0, -5)}.${rut.slice(-5)}`;
    }
  }
  return rut;
}

export function validateRut(rut) {
  const numberRut = cleanRut(rut).slice(0, -1);
  if (numberRut.length > 6) {
    const auxArray = [3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;

    for (let i = numberRut.length - 1; i >= 0; i -= 1) {
      // eslint-disable-next-line radix
      sum += parseInt(numberRut[i]) * auxArray[i];
    }
    // eslint-disable-next-line no-mixed-operators
    switch (11 - sum % 11) {
    case 11:
      return rut.slice(-1) === 0;
    case 10:
      return rut.slice(-1) === 'k';
    default:
      // eslint-disable-next-line no-mixed-operators
      return rut.slice(-1) === (11 - sum % 11);
    }
  }
  return false;
}

export function checkRut(rutCompleto) {
  let _rutCompleto = rutCompleto;
  if (rutCompleto.indexOf('-') <= -1) {
    _rutCompleto = `${rutCompleto.slice(0, -1)}-${rutCompleto.slice(-1)}`;
  }
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(_rutCompleto)) {
    return false;
  }
  const tmp = _rutCompleto.split('-');
  let digv = tmp[1];
  const rut = tmp[0];
  if (digv === 'K') digv = 'k';

  return (`${getDigit(rut)}` === `${digv}`);
}

export function getDigit(DT) {
  let M = 0;
  let S = 1;
  let T = DT;
  for (; T; T = Math.floor(T / 10)) {
    // eslint-disable-next-line no-mixed-operators,no-plusplus
    S = (S + T % 10 * (9 - M++ % 6)) % 11;
  }
  return S ? S - 1 : 'k';
}

export function rutFilter(value) {
  return formatRut(cleanRut(value));
}

export const rutDirective = {

  bind(el, binding, vnode) {
    const _self = binding.def.data;

    // eslint-disable-next-line no-plusplus
    for (let i = vnode.data.directives.length - 1; i >= 0; i--) {
      if (vnode.data.directives[i].name === 'model') {
        _self.vueModel = vnode.data.directives[i].expression;
        break;
      }
    }
  },

  update(el, binding, vnode) {
    const _self = binding.def.data;

    if (_self.validateRut) {
      // eslint-disable-next-line no-param-reassign
      el.value = formatRut(cleanRut(el.value));
      _self.inputValue = el.value;

      if (validateRut(el.value)) {
        // eslint-disable-next-line no-param-reassign
        vnode.context[_self.vueModel] = cleanRut(el.value);
        _self.validateRut = false;
      } else {
        // eslint-disable-next-line no-param-reassign
        vnode.context[_self.vueModel] = null;
        _self.validateRut = false;
      }
    } else {
      _self.validateRut = true;
      // eslint-disable-next-line no-param-reassign
      el.value = _self.inputValue;
    }
  },

  data: {
    vueModel: '',
    inputValue: '',
    validateRut: true
  }
};

/**
 * @default Se agrega guion medio a rut
 * @param rut
 * @returns {string}
 */
export function addMiddleDash(rut) {
  return `${rut.slice(0, -1)}-${rut.slice(-1)}`;
}

export function removeDotsAndDashesFromRut(value) {
  return value && value.length ? value.replace(/[. ,:-]+/g, '').toLowerCase() : '';
}
