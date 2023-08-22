/** Internal dependencies */
import config from '@/config';

/** Utils */
import { axios } from '@/utils/request';

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";

export function update(params: ProfileInterface) {
  return axios({
    url: `${config.urlApi}/api/users`,
    method: 'put',
    data: params
  });
}

export function updateEstablishment(establishmentId: number | null, params: EstablishmentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/users/update/establishment`,
    method: 'put',
    data: params
  });
}

export default {
  update,
  updateEstablishment
};
