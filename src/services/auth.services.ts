import { axios } from '@/utils/request';
import config from '@/config';
import type { SendRegisterInterface } from "@/interfaces/register.interface";

export function login({ email, password }: { email: string, password: string }) {
  return axios({
    url: `${config.urlApi}/auth/sign_in/`,
    method: 'post',
    data: { email, password }
  });
}

export function logout() {
  return axios({
    url: `${config.urlApi}/auth/sign_out/`,
    method: 'delete'
  });
}

export function profile() {
  return axios({
    url: `${config.urlApi}/auth/validate_token/`,
    method: 'get'
  });
}

export function recovery({ email }: { email: string }) {
  return axios({
    url: `${config.urlApi}/api/users/user/recovery/${email}/`,
    method: 'post'
  });
}

export function changePassword({ code, data }: { code: string, data: any }) {
  return axios({
    url: `${config.urlApi}/api/users/user/change_password/${code}/`,
    method: 'post',
    data
  });
}

export default {
  login,
  logout,
  profile,
  recovery,
  changePassword
};
