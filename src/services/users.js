import request from '@/utils/request';
import { apiPrefix } from '@/utils/api.prefix';


export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
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
  return request(`${apiPrefix}/users/${id}`, {
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

