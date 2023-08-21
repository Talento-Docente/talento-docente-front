import { axios } from "@/utils/request";
import config from "@/config";
import urlWithParams from '@/utils/uriHelper'
import type { SendRegisterInterface } from "@/interfaces/register.interface";

export function validateUserEmail(email: string) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/onboarding/validate_user_email`, { email }),
    method: "get"
  });
}

export function validateUserDni(dni: string) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/onboarding/validate_user_dni`, { dni }),
    method: "get"
  });
}

export function validateEstablishmentDni(dni: string) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/onboarding/validate_establishment_dni`, { dni }),
    method: "get"
  });
}

export function register(params: SendRegisterInterface) {
  return axios({
    url: `${config.urlApi}/api/onboarding`,
    method: "post",
    data: params
  });
}

export default {
  validateUserEmail,
  validateUserDni,
  validateEstablishmentDni,
  register
};
