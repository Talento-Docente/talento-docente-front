/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { EstablishmentInterface } from '@/interfaces/establishment.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/establishments`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(establishmentId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}`,
    method: 'get'
  });
}

export function create(data: EstablishmentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments`,
    method: 'post',
    data
  });
}

export function update(establishmentId: number, data: EstablishmentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}`,
    method: 'put',
    data
  });
}

export function destroy(establishmentId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}`,
    method: 'delete'
  });
}

export default {
  index,
  show,
  create,
  update,
  destroy
};
