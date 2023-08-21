/** Internal dependencies */
import config from '@/config';

/** Utils */
import { axios } from '@/utils/request';

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";

export function update(params: ProfileInterface) {
  return axios({
    url: `${config.urlApi}/api/users`,
    method: 'put',
    data: params
  });
}

export default {
  update
};
