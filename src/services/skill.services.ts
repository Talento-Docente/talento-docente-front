/** External dependencies */

/** Internal dependencies */
/** Constants */
import config from '@/config'

/** Utils */
import { axios } from '@/utils/request'

/** Interfaces */
import type { MySkillInterface } from '@/interfaces/skill.interface'


export function index() {
  return axios({
    url: `${config.urlApi}/api/skills`,
    method: 'get'
  });
}


export function create(data: MySkillInterface) {
  return axios({
    url: `${config.urlApi}/api/skills`,
    method: 'post',
    data
  });
}



export default {
  index,
  create,
};
