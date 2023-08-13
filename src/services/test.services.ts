/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { TestInterface } from '@/interfaces/test.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/tests`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(testId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}`,
    method: 'get'
  });
}

export function create(data: TestInterface) {
  return axios({
    url: `${config.urlApi}/api/tests`,
    method: 'post',
    data
  });
}

export function update(testId: number, data: TestInterface) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}`,
    method: 'put',
    data
  });
}

export function destroy(testId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}`,
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
