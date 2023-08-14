/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'
import urlWithParams from '@/utils/uriHelper'

/** Interfaces */
import type { StageInterface } from '@/interfaces/stage.interface'


export function index(flowId:number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
  return axios({
    url: urlWithParams(`${config.urlApi}/api/${flowId}/stages`, { page, page_size: pageSize, search_by: searchBy }),
    method: 'get'
  });
}

export function show(flowId:number, stageId: number) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}/stages/${stageId}`,
    method: 'get'
  });
}

export function create(flowId:number ,data: StageInterface) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}/stages`,
    method: 'post',
    data
  });
}


export function update(flowId:number ,stageId: number, data: StageInterface) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}/stages/${stageId}`,
    method: 'put',
    data
  });
}


export function destroy( flowId:number, stageId: number) {
  return axios({
    url: `${config.urlApi}/api/flows/${flowId}/stages/${stageId}`,
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
