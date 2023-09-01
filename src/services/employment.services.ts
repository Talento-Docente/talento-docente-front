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

export function getPublicEmployments(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/employments/public`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(establishmentId: number | null, employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/${employmentId}`,
    method: 'get'
  });
}

export function getPublicEmployment(employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/employments/public/${employmentId}`,
    method: 'get'
  });
}

export function resume(establishmentId: number | null) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/get/resume`,
    method: 'get'
  });
}

export function getApplicants(establishmentId: number | null, employmentId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/${employmentId}/applicants`,
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

export function findOrCreatePostulation(establishmentId: number | null, employmentId: number, data: any) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/employments/${employmentId}/find_or_create`,
    method: 'post',
    data
  });
}

export default {
  index,
  show,
  create,
  update,
  destroy,
  resume,
  getApplicants,
  findOrCreatePostulation,
  getPublicEmployments,
  getPublicEmployment
};
