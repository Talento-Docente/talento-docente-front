/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { TestInterface } from '@/interfaces/test.interface'

export function index(establishmentId: number | null, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/establishments/${establishmentId}/tests`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(establishmentId: number | null, testId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/tests/${testId}`,
    method: 'get'
  });
}

export function create(establishmentId: number | null, data: TestInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/tests`,
    method: 'post',
    data
  });
}

export function update(establishmentId: number | null, testId: number, data: TestInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/tests/${testId}`,
    method: 'put',
    data
  });
}

export function destroy(establishmentId: number | null, testId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/tests/${testId}`,
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
