/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { WorkExperienceInterface } from '@/interfaces/work_experience.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/work_experiences`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(workExperienceId: number) {
  return axios({
    url: `${config.urlApi}/api/work_experiences/${workExperienceId}`,
    method: 'get'
  });
}

export function create(data: WorkExperienceInterface) {
  return axios({
    url: `${config.urlApi}/api/work_experiences`,
    method: 'post',
    data
  });
}

export function update(workExperienceId: number, data: WorkExperienceInterface) {
  return axios({
    url: `${config.urlApi}/api/work_experiences/${workExperienceId}`,
    method: 'put',
    data
  });
}

export function destroy(workExperienceId: number) {
  return axios({
    url: `${config.urlApi}/api/work_experiences/${workExperienceId}`,
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
