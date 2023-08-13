/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { FlowInterface } from '@/interfaces/flow.interface'


export function index(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/flows`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(flowId: number) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}`,
    method: 'get'
  });
}

export function create(data: FlowInterface) {
  return axios({
    url: `${config.urlApi}/api/flows`,
    method: 'post',
    data
  });
}


export function update(flowId: number, data: FlowInterface) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}`,
    method: 'put',
    data
  });
}


export function destroy(flowId: number) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}`,
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
