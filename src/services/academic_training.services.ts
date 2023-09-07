/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { AcademicTrainingInterface } from '@/interfaces/academic_training.interface'

export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/academic_trainings`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(workExperienceId: number) {
  return axios({
    url: `${config.urlApi}/api/academic_trainings/${workExperienceId}`,
    method: 'get'
  });
}

export function create(data: AcademicTrainingInterface) {
  return axios({
    url: `${config.urlApi}/api/academic_trainings`,
    method: 'post',
    data
  });
}

export function update(workExperienceId: number, data: AcademicTrainingInterface) {
  return axios({
    url: `${config.urlApi}/api/academic_trainings/${workExperienceId}`,
    method: 'put',
    data
  });
}

export function destroy(workExperienceId: number) {
  return axios({
    url: `${config.urlApi}/api/academic_trainings/${workExperienceId}`,
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
