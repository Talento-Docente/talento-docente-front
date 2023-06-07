function jsonParse(object: any, form: any | null = null, namespace: any | null = null) {
  const formData = form || new FormData();
  let formKey;

  for (const property in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(property)) {
      if (namespace && object instanceof Array) {
        formKey = `${namespace}[]`;
      } else if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File) && object[property] != null) {
        jsonParse(object[property], formData, formKey);
      } else if (object[property] !== undefined) {
        formData.append(formKey, object[property]);
      }
    }
  }

  return formData;
}

export default jsonParse;
