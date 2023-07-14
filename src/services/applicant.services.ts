/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'
import jsonParse from '@/utils/formDataHelper'

/** Interfaces */
import type { ApplicantInterface } from '@/interfaces/applicant.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/applicants`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(applicantId: number) {
  return axios({
    url: `${config.urlApi}/api/applicants/${applicantId}`,
    method: 'get'
  });
}

export function create(data: ApplicantInterface) {
  const valuesFormData = jsonParse(data);
  return axios({
    url: `${config.urlApi}/api/applicants`,
    method: 'post',
    data: valuesFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 900000
  });
}

export function update(applicantId: number, data: ApplicantInterface) {
  const valuesFormData = jsonParse(data);
  return axios({
    url: `${config.urlApi}/api/applicants/${applicantId}`,
    method: 'put',
    data: valuesFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 500000
  });
}

export function destroy(applicantId: number) {
  return axios({
    url: `${config.urlApi}/api/applicants/${applicantId}`,
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
