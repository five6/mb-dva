import request from '@/utils/request';
import { apiPrefix } from '@/utils/api.prefix';

export async function fetchTopics() {
  return request(`${apiPrefix}/topics`);
}

export async function createTopic(data) {
  return request(`${apiPrefix}/topics`, {
    method: 'POST',
    data,
  });
}


export async function fetchTopicReply(payload) {
  const {id, params} = payload;
  return request(`${apiPrefix}/topics/${id}/reply`, {
    method: 'GET',
    params,
  });
}

export async function createReply(payload) {
  const { id, reply } = payload;
  return request(`${apiPrefix}/topics/${id}/reply`, {
    method: 'POST',
    data: reply
  });
}

export async function deleteReply(id) {
  return request(`${apiPrefix}/topics/${id}/reply`, {
    method: 'DELETE'
  });
}

export async function deleteTopic(id) {
  return request(`${apiPrefix}/topics/${id}`, {
    method: 'DELETE'
  });
}



export async function fetchUserTopics(payload) {
  return request(`${apiPrefix}/topics/user`, {
    method: 'GET',
    params: payload,
    headers: {
      Accept: "application/json"
    },
  })
}

export async function fetchTopicType(payload) {
  return request(`${apiPrefix}/topic-type`, {
    method: 'GET',
    params: payload,
    headers: {
      Accept: "application/json"
    },
  })
}
