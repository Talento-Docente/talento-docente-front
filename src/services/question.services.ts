/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { QuestionInterface } from '@/interfaces/question.interface'

export function index(testId: number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/tests/${testId}/questions`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(testId: number, questionId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}`,
    method: 'get'
  });
}

export function create(testId: number, data: QuestionInterface) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions`,
    method: 'post',
    data
  });
}

export function update(testId: number, questionId: number, data: QuestionInterface) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}`,
    method: 'put',
    data
  });
}

export function destroy(testId: number, questionId: number) {
  return axios({
    url: `${config.urlApi}/api/tests/${testId}/questions/${questionId}`,
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
