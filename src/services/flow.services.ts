/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { FlowInterface } from '@/interfaces/flow.interface'


export function index(establishmentId: number | null, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/establishments/${establishmentId}/flows`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(establishmentId: number | null, flowId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/flows/${flowId}`,
    method: 'get'
  });
}

export function create(establishmentId: number | null, data: FlowInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/flows`,
    method: 'post',
    data
  });
}


export function update(establishmentId: number | null, flowId: number, data: FlowInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/flows/${flowId}`,
    method: 'put',
    data
  });
}


export function destroy(establishmentId: number | null, flowId: number) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/flows/${flowId}`,
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
