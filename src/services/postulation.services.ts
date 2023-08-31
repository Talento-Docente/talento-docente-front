/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { PostulationInterface } from '@/interfaces/postulation.interface'


export function index(establishmentId: number | null, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  let url = urlWithParams(`${config.urlApi}/api/establishments/${establishmentId}/postulations`, { page, page_size: pageSize, search_by: searchBy })
  if (establishmentId === null) {
    url = urlWithParams(`${config.urlApi}/api/postulations`, { page, page_size: pageSize, search_by: searchBy })
  }
  return axios({
    url,
    method: 'get'
  });
}

export function show(establishmentId: number | null, postulationId: number) {
  let url = `${config.urlApi}/api/establishments/${establishmentId}/postulations/${postulationId}`
  if (establishmentId === null) {
    url = `${config.urlApi}/api/postulations/${postulationId}`
  }
  return axios({
    url,
    method: 'get'
  });
}

export function create(establishmentId: number | null, data: PostulationInterface) {
  let url = `${config.urlApi}/api/establishments/${establishmentId}/postulations`
  if (establishmentId === null) {
    url = `${config.urlApi}/api/postulations`
  }
  return axios({
    url,
    method: 'post',
    data
  });
}


export function update(establishmentId: number | null, postulationId: number, data: PostulationInterface) {
  let url = `${config.urlApi}/api/establishments/${establishmentId}/postulations/${postulationId}`
  if (establishmentId === null) {
    url = `${config.urlApi}/api/postulations/${postulationId}`
  }
  return axios({
    url,
    method: 'put',
    data
  });
}


export function destroy(establishmentId: number | null, postulationId: number) {
  let url = `${config.urlApi}/api/establishments/${establishmentId}/postulations/${postulationId}`
  if (establishmentId === null) {
    url = `${config.urlApi}/api/postulations/${postulationId}`
  }
  return axios({
    url,
    method: 'delete'
  });
}

export function getActivities(establishmentId: number | null, postulationId: number) {
  let url = `${config.urlApi}/api/establishments/${establishmentId}/postulations/${postulationId}/activities`
  if (establishmentId === null) {
    url = `${config.urlApi}/api/postulations/${postulationId}/activities`
  }
  return axios({
    url,
    method: 'get'
  });
}

export default {
  index,
  show,
  create,
  update,
  destroy,
  getActivities
};
