/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { EmploymentInterface } from '@/interfaces/employment.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/employments`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/employments/${employmentId}`,
    method: 'get'
  });
}

export function create(data: EmploymentInterface) {
  return axios({
    url: `${config.urlApi}/api/employments`,
    method: 'post',
    data
  });
}

export function update(employmentId: number, data: EmploymentInterface) {
  return axios({
    url: `${config.urlApi}/api/employments/${employmentId}`,
    method: 'put',
    data
  });
}

export function destroy(employmentId: number) {
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
