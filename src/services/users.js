import request from '../../utils/request';

export async function queryUsers() {
  return request(`${API_PREFIX}/users`, {
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}

export async function queryCurrentUser(id) {
  return request(`${API_PREFIX}/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: "application/json"
    },
  })
}
