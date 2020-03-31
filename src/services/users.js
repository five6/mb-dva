import request from '@/utils/request';
import { apiPrefix } from '@/utils/api.prefix';
import { getToken } from '@/services/authorityService';



export async function login(data) {
  return request(`${apiPrefix}/users/signin`, {
    method: 'POST',
    data,
  });
}

export async function register(data) {
  return request(`${apiPrefix}/users/signup`, {
    method: 'POST',
    data,
  });
}

export async function queryUsers() {
  return request(`${apiPrefix}/users`, {
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}

export async function queryCurrentUser(id) {
  return request(`${apiPrefix}/users/profile`, {
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}

export async function queryNotices(id) {
  return request(`${apiPrefix}/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}

export async function logout() {
  return request(`${apiPrefix}/users/logout`, {
    method: 'PUT',
    data: getToken(),
  });
}

export async function getFakeCaptcha() {
  return request(`${apiPrefix}/users/captcha?_t=${new Date().getTime()}`, {
    responseType: 'blob',
    getResponse: true
  });
}

export async function uploadFile(form) {
  return request(`/api/v1/files`, {
    method: 'POST',
    data: form,
  });
}