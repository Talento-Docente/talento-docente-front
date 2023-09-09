/** Internal dependencies */
import config from '@/config';

/** Utils */
import { axios } from '@/utils/request';
import jsonParse from '@/utils/formDataHelper';

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";

export function update(params: ProfileInterface) {
  return axios({
    url: `${config.urlApi}/api/users`,
    method: 'put',
    data: params
  });
}

export function updateEstablishment(establishmentId: number | null, params: EstablishmentInterface) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/users/update/establishment`,
    method: 'put',
    data: params
  });
}

export function uploadFile(file: any, documentName: string) {
  const formData = jsonParse({ file })
  return axios({
    url: `${config.urlApi}/api/users/upload/${documentName}`,
    method: 'post',
    data: formData,
    timeout: 240000
  });
}

export function removeFile(documentName: string) {
  return axios({
    url: `${config.urlApi}/api/users/upload/${documentName}`,
    method: 'delete'
  });
}

export function removeEstablishmentFile(establishmentId: number, documentName: string) {
  return axios({
    url: `${config.urlApi}/api/establishments/${establishmentId}/users/upload/establishment/${documentName}`,
    method: 'delete'
  });
}

export default {
  update,
  updateEstablishment,
  uploadFile,
  removeFile,
  removeEstablishmentFile
};
