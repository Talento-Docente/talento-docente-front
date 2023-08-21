/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { EmploymentInterface } from '@/interfaces/employment.interface'

export function index(establishmentId: number | null, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/establishments/${establishmentId}/employments`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(establishmentId: number | null, employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/${employmentId}`,
    method: 'get'
  });
}

export function create(establishmentId: number | null, data: EmploymentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments`,
    method: 'post',
    data
  });
}

export function update(establishmentId: number | null, employmentId: number, data: EmploymentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/${employmentId}`,
    method: 'put',
    data
  });
}

export function destroy(establishmentId: number | null, employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/employments/${employmentId}`,
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
