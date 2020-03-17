import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getCaptcha() {
  return request('/api/notices');
}



export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
