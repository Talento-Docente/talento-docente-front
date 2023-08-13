/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { AlternativeInterface } from '@/interfaces/alternative.interface'

export function index(testId: number, questionId: number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/tests/${testId}/questions/${questionId}/alternatives`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(testId: number, questionId: number, alternativeId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}/alternatives/${alternativeId}`,
    method: 'get'
  });
}

export function create(testId: number, questionId: number, data: AlternativeInterface) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}/alternatives`,
    method: 'post',
    data
  });
}

export function update(testId: number, questionId: number, alternativeId: number, data: AlternativeInterface) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}/alternatives/${alternativeId}`,
    method: 'put',
    data
  });
}

export function destroy(testId: number, questionId: number, alternativeId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}/alternatives/${alternativeId}`,
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
